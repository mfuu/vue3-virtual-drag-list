import {
  h,
  ref,
  isRef,
  watch,
  computed,
  nextTick,
  onMounted,
  onActivated,
  onUnmounted,
  onDeactivated,
  onBeforeMount,
  defineComponent,
} from 'vue';
import Dnd from 'sortable-dnd';
import { Items } from './slots';
import { VirtualProps } from './props';
import {
  Range,
  Virtual,
  Sortable,
  throttle,
  getDataKey,
  SortableAttrs,
  VirtualAttrs,
} from './core';

const getList = (source) => {
  return isRef(source) ? source.value : source;
};

const VirtualDragList = defineComponent({
  props: VirtualProps,
  emits: ['update:dataSource', 'update:modelValue', 'top', 'bottom', 'drag', 'drop', 'add', 'remove'],
  setup(props, { emit, slots, expose }) {
    const range = ref<Range>({ start: 0, end: props.keeps, front: 0, behind: 0 });

    const rootRef = ref<HTMLElement | null>(null);
    const groupRef = ref<HTMLElement | null>(null);

    const viewlist = ref<any[]>([]);
    const uniqueKeys = ref<any[]>([]);

    const isHorizontal = computed(() => props.direction !== 'vertical');
    const itemSizeKey = computed(() => props.direction !== 'vertical' ? 'offsetWidth' : 'offsetHeight');

    const virtualAttributes = computed(() => {
      return VirtualAttrs.reduce((res, key) => {
        res[key] = props[key];
        return res;
      }, {});
    });

    const sortableAttributes = computed(() => {
      return SortableAttrs.reduce((res, key) => {
        res[key] = this[key];
        return res;
      }, {});
    });

    let lastLength: number = 0;
    let sortable: Sortable;
    let virtual: Virtual;

    // git item size by data-key
    function getSize(key: string | number) {
      return virtual.getSize(key);
    }

    // Get the current scroll height
    function getOffset() {
      return virtual.getOffset();
    }

    // Get client viewport size
    function getClientSize() {
      return virtual.getClientSize();
    }

    // Get all scroll size
    function getScrollSize() {
      return virtual.getScrollSize();
    }

    function scrollToKey(key: number | string) {
      const index = uniqueKeys.value.indexOf(key);
      if (index > -1) {
        virtual.scrollToIndex(index);
      }
    }

    // Scroll to the specified offset
    function scrollToOffset(offset: number) {
      virtual.scrollToOffset(offset);
    }

    // Scroll to the specified index position
    function scrollToIndex(index: number) {
      virtual.scrollToIndex(index);
    }

    // Scroll to top of list
    function scrollToTop() {
      scrollToOffset(0);
    }

    // Scroll to bottom of list
    function scrollToBottom() {
      virtual.scrollToBottom();
    }

    expose({
      getSize,
      getOffset,
      getClientSize,
      getScrollSize,
      scrollToTop,
      scrollToBottom,
      scrollToKey,
      scrollToIndex,
      scrollToOffset,
    });

    watch(
      () => [props.dataSource, props.modelValue],
      () => {
        onUpdate();
      },
      {
        deep: true,
      }
    );

    watch(
      () => virtualAttributes,
      (newVal, oldVal) => {
        if (!virtual) return;
        for (let key in newVal) {
          if (newVal[key] != oldVal[key]) {
            virtual.option(key as any, newVal[key]);
          }
        }
      }
    );

    watch(
      () => sortableAttributes,
      (newVal, oldVal) => {
        if (!virtual) return;
        for (let key in newVal) {
          if (newVal[key] != oldVal[key]) {
            sortable.option(key as any, newVal[key]);
          }
        }
      }
    );

    // init range
    onBeforeMount(() => {
      initVirtual();
      onUpdate();
    });

    // set back offset when awake from keep-alive
    onActivated(() => {
      virtual && scrollToOffset(virtual.offset);

      virtual.addScrollEventListener();
    });

    onDeactivated(() => {
      virtual.removeScrollEventListener();
    });

    onMounted(() => {
      virtual.option('wrapper', groupRef.value as any);

      if (!props.scroller) {
        virtual.option('scroller', rootRef.value as any);
      }
    });

    onUnmounted(() => {
      sortable && sortable.destroy();
      virtual.removeScrollEventListener();
    });

    const onUpdate = () => {
      const list = getList(props.modelValue || props.dataSource);
      if (!list) return;

      const oldList = [...viewlist.value];

      viewlist.value = list;
      updateUniqueKeys();
      updateRange(oldList, list);

      if (!sortable) {
        nextTick(() => initSortable());
      } else {
        sortable.option('list', list);
      }

      // if auto scroll to the last offset
      if (lastLength && props.keepOffset) {
        const index = list.length - lastLength;
        if (index > 0) {
          scrollToIndex(index);
        }
        lastLength = 0;
      }
    };

    const updateUniqueKeys = () => {
      uniqueKeys.value = viewlist.value.map((item) => getDataKey(item, props.dataKey));
      virtual.option('uniqueKeys', uniqueKeys.value);
    };

    const initVirtual = () => {
      virtual = new Virtual({
        size: props.size,
        keeps: props.keeps,
        buffer: Math.round(props.keeps / 3),
        scroller: props.scroller as any,
        direction: props.direction,
        uniqueKeys: uniqueKeys.value,
        debounceTime: props.debounceTime,
        throttleTime: props.throttleTime,
        onScroll: (params) => {
          lastLength = 0;
          if (!!viewlist.value.length && params.top) {
            handleToTop();
          } else if (params.bottom) {
            handleToBottom();
          }
        },
        onUpdate: (newRange) => {
          if (Dnd.dragged && sortable && newRange.start !== range.value.start) {
            sortable.reRendered = true;
          }
          range.value = newRange;
        },
      });
    };

    const initSortable = () => {
      sortable = new Sortable(groupRef.value as any, {
        list: viewlist.value,
        ...props,
        onDrag: (params) => {
          emit('drag', params);
        },
        onAdd: (params) => {
          emit('add', params);
        },
        onRemove: (params) => {
          emit('remove', params);
        },
        onDrop: (params) => {
          if (params.changed) {
            emit('update:dataSource', params.list);
            emit('update:modelValue', params.list);
          }
          emit('drop', params);
        },
      });
    };

    const updateRange = (oldList, newList) => {
      let newRange = { ...range.value };
      if (
        newList.length > oldList.length &&
        newRange.end === oldList.length - 1 &&
        scrolledToBottom()
      ) {
        newRange.end++;
        newRange.start = Math.max(0, newRange.end - props.keeps);
      }
      virtual.updateRange(newRange);
    };

    const scrolledToBottom = () => {
      const offset = getOffset();
      const clientSize = getClientSize();
      const scrollSize = getScrollSize();
      return offset + clientSize + 1 >= scrollSize;
    };

    const handleToTop = throttle(() => {
      emit('top');
      lastLength = viewlist.value.length;
    }, 50);

    const handleToBottom = throttle(() => {
      emit('bottom');
    }, 50);

    const onItemResized = (size: number, key) => {
      const renders = virtual.sizes.size;
      virtual.onItemResized(key, size);
      if (renders === 0) {
        updateRange(viewlist.value, viewlist.value);
      }
    };

    const getItemStyle = (dataKey: any) => {
      const fromKey = Dnd.dragged?.dataset.key;
      if (dataKey == fromKey) {
        return { display: 'none' };
      }
      return {};
    };

    const renderItems = () => {
      const renders: any[] = [];
      const { start, end } = range.value;

      for (let index = start; index <= end; index++) {
        const record = viewlist.value[index];
        if (record) {
          const dataKey = getDataKey(record, props.dataKey);
          const itemStyle = { ...props.itemStyle, ...getItemStyle(dataKey) };
          renders.push(
            slots.item
              ? h(
                  Items,
                  {
                    key: dataKey,
                    tag: props.itemTag,
                    class: props.itemClass,
                    style: itemStyle,
                    dataKey: dataKey,
                    sizeKey: itemSizeKey.value,
                    onResize: onItemResized,
                  },
                  {
                    default: () => slots.item?.({ record, index, dataKey }),
                  }
                )
              : null
          );
        }
      }
      return renders;
    };

    return () => {
      const { front, behind } = range.value;
      const { rootTag, wrapTag, scroller, wrapClass, wrapStyle } = props;
      const padding = isHorizontal.value ? `0px ${behind}px 0px ${front}px` : `${front}px 0px ${behind}px`;

      return h(
        rootTag,
        {
          ref: rootRef,
          style: !scroller && { overflow: isHorizontal.value ? 'auto hidden' : 'hidden auto' },
        },
        {
          default: () => [
            slots.header?.(),
            h(
              wrapTag,
              {
                ref: groupRef,
                class: wrapClass,
                style: { ...wrapStyle, padding },
              },
              {
                default: () => renderItems(),
              }
            ),
            slots.footer?.(),
          ],
        }
      );
    };
  },
});

export default VirtualDragList;

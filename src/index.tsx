import {
  h,
  ref,
  Ref,
  isRef,
  watch,
  computed,
  onUpdated,
  onMounted,
  onActivated,
  onUnmounted,
  onDeactivated,
  onBeforeMount,
  defineComponent,
} from 'vue';
import Dnd from 'sortable-dnd';
import { VirtualProps, SlotsProps } from './props';
import {
  Range,
  Virtual,
  Sortable,
  throttle,
  getDataKey,
  SortableAttrs,
  VirtualAttrs,
} from './core';

const useObserver = (props: any, aRef: Ref<HTMLElement | null>, emit: any) => {
  let observer: ResizeObserver | null = null;

  const getCurrentSize = () => {
    return aRef.value ? aRef.value[props.sizeKey] : 0;
  };

  const onSizeChange = () => {
    emit('resize', getCurrentSize(), props.dataKey);
  };

  onMounted(() => {
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        onSizeChange();
      });
      aRef.value && observer.observe(aRef.value);
    }
  });

  onUpdated(() => {
    onSizeChange();
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
  });
};

const Items = defineComponent({
  name: 'VirtualDraglistItems',
  props: SlotsProps,
  emits: ['resize'],
  setup(props, { emit, slots }) {
    const elRef = ref<HTMLElement | null>(null);
    useObserver(props, elRef, emit);

    return () => {
      const { tag: Tag, dataKey } = props;

      return h(
        Tag,
        {
          ref: elRef,
          key: dataKey,
          'data-key': dataKey,
          class: 'virtual-dnd-list-item',
        },
        { default: () => slots.default?.() }
      );
    };
  },
});

const getList = (source) => {
  return isRef(source) ? source.value : source;
};

const VirtualDragList = defineComponent({
  props: VirtualProps,
  emits: [
    'update:dataSource',
    'update:modelValue',
    'top',
    'bottom',
    'drag',
    'drop',
    'add',
    'remove',
  ],
  setup(props, { emit, slots, expose }) {
    const rangeRef = ref<Range>({ start: 0, end: props.keeps - 1, front: 0, behind: 0 });

    const rootRef = ref<HTMLElement | null>(null);
    const wrapRef = ref<HTMLElement | null>(null);
    const listRef = ref<any[]>([]);

    const isHorizontal = computed(() => props.direction !== 'vertical');

    const virtualAttributes = computed(() => {
      return VirtualAttrs.reduce((res, key) => {
        res[key] = props[key];
        return res;
      }, {});
    });

    const sortableAttributes = computed(() => {
      return SortableAttrs.reduce((res, key) => {
        res[key] = props[key];
        return res;
      }, {});
    });

    let virtual: Virtual;
    let sortable: Sortable;
    let uniqueKeys: any[] = [];
    let lastLength: number = 0;

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
      const index = uniqueKeys.indexOf(key);
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

    watch(virtualAttributes, (newVal, oldVal) => {
      if (!virtual) return;
      for (let key in newVal) {
        if (newVal[key] != oldVal[key]) {
          virtual.option(key as any, newVal[key]);
        }
      }
    });

    watch(sortableAttributes, (newVal, oldVal) => {
      if (!sortable) return;
      for (let key in newVal) {
        if (newVal[key] != oldVal[key]) {
          sortable.option(key as any, newVal[key]);
        }
      }
    });

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
      initSortable();
      virtual.option('wrapper', wrapRef.value as any);

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

      const oldList = [...listRef.value];

      listRef.value = list;
      updateUniqueKeys();
      updateRange(oldList, list);

      sortable?.option('list', list);

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
      uniqueKeys = listRef.value.map((item) => getDataKey(item, props.dataKey));
      virtual.option('uniqueKeys', uniqueKeys);
    };

    const initVirtual = () => {
      virtual = new Virtual({
        size: props.size,
        keeps: props.keeps,
        buffer: Math.round(props.keeps / 3),
        scroller: props.scroller as any,
        direction: props.direction,
        uniqueKeys: uniqueKeys,
        debounceTime: props.debounceTime,
        throttleTime: props.throttleTime,
        onScroll: (event) => {
          lastLength = 0;
          if (!!listRef.value.length && event.top) {
            handleToTop();
          } else if (event.bottom) {
            handleToBottom();
          }
        },
        onUpdate: (newRange) => {
          if (Dnd.dragged && sortable && newRange.start !== rangeRef.value.start) {
            sortable.reRendered = true;
          }
          rangeRef.value = newRange;
        },
      });
    };

    const initSortable = () => {
      sortable = new Sortable(rootRef.value as any, {
        ...sortableAttributes.value,
        list: listRef.value,
        dataKey: props.dataKey,
        onDrag: (event) => {
          if (!props.sortable) {
            virtual.enableScroll(false);
          }
          emit('drag', event);
        },
        onAdd: (event) => {
          emit('add', event);
        },
        onRemove: (event) => {
          emit('remove', event);
        },
        onDrop: (event) => {
          if (!props.sortable) {
            virtual.enableScroll(true);
          }
          if (event.changed) {
            emit('update:dataSource', event.list);
            emit('update:modelValue', event.list);
          }
          emit('drop', event);
        },
      });
    };

    const updateRange = (oldList, newList) => {
      let newRange = { ...rangeRef.value };
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
      lastLength = listRef.value.length;
    }, 50);

    const handleToBottom = throttle(() => {
      emit('bottom');
    }, 50);

    const onItemResized = (size: number, key) => {
      const sizes = virtual.sizes.size;
      const renders = Math.min(props.keeps, listRef.value.length);
      virtual.onItemResized(key, size);

      if (sizes === renders - 1) {
        updateRange(listRef.value, listRef.value);
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
      const { start, end } = rangeRef.value;

      for (let index = start; index <= end; index++) {
        const record = listRef.value[index];
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
                    sizeKey: props.direction === 'vertical' ? 'offsetHeight' : 'offsetWidth',
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
      const { front, behind } = rangeRef.value;
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
                ref: wrapRef,
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

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
import { throttle, getDataKey } from './utils';
import Sortable, { attributes as SortableAttrs } from './Plugins/Sortable';
import Virtual, { Range, attributes as VirtualAttrs } from './Plugins/Virtual';
import { Slots, Items } from './slots';
import { VirtualProps } from './props';

const getList = (source) => {
  return isRef(source) ? source.value : source;
};

const VirtualDragList = defineComponent({
  props: VirtualProps,
  emits: ['update:dataSource', 'top', 'bottom', 'drag', 'drop', 'add', 'remove'],
  setup(props, { emit, slots, expose }) {
    const range = ref<Range>(Object.create(null));

    const rootRef = ref<HTMLElement | null>(null);
    const groupRef = ref<HTMLElement | null>(null);

    const viewlist = ref<any[]>([]);
    const uniqueKeys = ref<any[]>([]);

    const isHorizontal = props.direction !== 'vertical';

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

    let lastLength: any = null;
    let timer: any = null;
    let start: number = 0;

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
      scrollToIndex,
      scrollToOffset,
    });

    watch(
      () => props.dataSource,
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
            virtual.updateOptions(key, newVal[key]);
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
            sortable.setValue(key, newVal[key]);
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
      virtual.updateOptions('wrapper', groupRef.value);
      
      if (!props.scroller) {
        virtual.updateOptions('scroller', rootRef.value);
      }
    });

    onUnmounted(() => {
      sortable && sortable.destroy();
      virtual.removeScrollEventListener();
    });

    const onUpdate = () => {
      const list = getList(props.dataSource);
      if (!list) return;

      const oldList = [...viewlist.value];

      viewlist.value = list;
      updateUniqueKeys();

      if (virtual.sizes.size) {
        updateRange(oldList, list);
      } else {
        clearTimeout(timer);
        timer = setTimeout(() => virtual.updateRange(), 17);
      }

      if (!sortable) {
        nextTick(() => initSortable());
      } else {
        sortable.setValue('list', list);
      }

      // if auto scroll to the last offset
      if (lastLength && props.keepOffset) {
        const index = Math.abs(list.length - lastLength);
        scrollToIndex(index);
        lastLength = null;
      }
    };

    const updateUniqueKeys = () => {
      uniqueKeys.value = viewlist.value.map((item) => getDataKey(item, props.dataKey));
      virtual.updateOptions('uniqueKeys', uniqueKeys.value);
    };

    const initVirtual = () => {
      virtual = new Virtual({
        size: props.size,
        keeps: props.keeps,
        buffer: Math.round(props.keeps / 3),
        scroller: props.scroller,
        direction: props.direction,
        uniqueKeys: uniqueKeys.value,
        debounceTime: props.debounceTime,
        throttleTime: props.throttleTime,
        onScroll: (params) => {
          if (!!viewlist.value.length && params.top) {
            handleToTop();
          } else if (params.bottom) {
            handleToBottom();
          }
        },
        onUpdate: (newRange) => {
          range.value = newRange;
        },
      });
    };

    const initSortable = () => {
      sortable = new Sortable(
        {
          container: groupRef.value,
          list: viewlist.value,
          emit,
          ...props,
        },
        () => {
          start = range.value.start;
        },
        ({ list }: { list: any[] }) => {
          if (list.length === viewlist.value.length && start < range.value.start) {
            range.value.front += Dnd.clone?.[isHorizontal ? 'offsetWidth' : 'offsetHeight'] || 0;
            start = range.value.start;
          }

          viewlist.value = list;
          updateUniqueKeys();
          emit('update:dataSource', list);
        }
      );
    };

    const updateRange = (oldList, newList) => {
      let newRange = { ...range.value };
      if (newRange.start > 0) {
        const index = newList.indexOf(oldList[newRange.start]);
        if (index > -1) {
          newRange.start = index;
          newRange.end = index + props.keeps - 1;
        }
      }
      if (
        newList.length > oldList.length &&
        newRange.end === oldList.length - 1 &&
        scrolledToBottom()
      ) {
        newRange.end++;
        newRange.start = Math.max(0, newRange.end - props.keeps + 1);
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
    });

    const handleToBottom = throttle(() => {
      emit('bottom');
    });

    const onItemResized = (size: number, key) => {
      virtual.handleItemSizeChange(key, size);
    };

    const onSlotsResized = (size: number, key) => {
      virtual.handleSlotSizeChange(key, size);
    };

    const getItemStyle = (dataKey: any) => {
      const fromKey = Dnd.dragged?.dataset.key;
      if (dataKey == fromKey) {
        return { display: 'none' };
      }
      return {};
    };

    const renderSlots = (key, TagName) => {
      const slot = slots[key];
      return slot
        ? h(
            Slots,
            {
              key: key,
              tag: TagName,
              dataKey: key,
              event: 'resize',
              onResize: onSlotsResized,
            },
            { default: () => slot?.() }
          )
        : null;
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
                    event: 'resize',
                    dataKey: dataKey,
                    isHorizontal: isHorizontal,
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
      const pageMode = virtual.useWindowScroll;
      const { rootTag, wrapTag, wrapClass, headerTag, footerTag } = props;
      const { front, behind } = range.value;
      const wrapStyle = {
        ...props.wrapStyle,
        padding: isHorizontal ? `0px ${behind}px 0px ${front}px` : `${front}px 0px ${behind}px`,
      };

      return h(
        rootTag,
        {
          ref: rootRef,
          style: !pageMode && { overflow: isHorizontal ? 'auto hidden' : 'hidden auto' },
        },
        {
          default: () => [
            renderSlots('header', headerTag),
            h(
              wrapTag,
              {
                ref: groupRef,
                class: wrapClass,
                style: wrapStyle,
              },
              {
                default: () => renderItems(),
              }
            ),
            renderSlots('footer', footerTag),
          ],
        }
      );
    };
  },
});

export default VirtualDragList;

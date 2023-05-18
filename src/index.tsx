import {
  h,
  ref,
  isRef,
  watch,
  nextTick,
  onActivated,
  onUnmounted,
  onBeforeMount,
  defineComponent,
} from 'vue';
import { debounce, throttle, getDataKey } from './utils';
import Sortable from './Plugins/Sortable';
import Virtual, { Range } from './Plugins/Virtual';
import { Store } from './Plugins/Storage';
import { Slots, Items } from './slots';
import { VirtualProps } from './props';

const getList = (source) => {
  return isRef(source) ? source.value : source;
};

const VirtualDragList = defineComponent({
  props: VirtualProps,
  emits: [
    'update:dataSource',
    'top',
    'bottom',
    'drag',
    'drop',
    'add',
    'remove',
  ],
  setup(props, { emit, slots, expose }) {
    const range = ref<Range>(Object.create(null));

    const rootRef = ref<HTMLElement | null>(null);
    const groupRef = ref<HTMLElement | null>(null);
    const lastRef = ref<HTMLElement | null>(null);

    const viewlist = ref<any[]>([]);
    const uniqueKeys = ref<any[]>([]);

    let lastItem: any = null;

    const isHorizontal = props.direction !== 'vertical';
    const scrollSizeKey = isHorizontal ? 'scrollWidth' : 'scrollHeight';
    const scrollDirectionKey = isHorizontal ? 'scrollLeft' : 'scrollTop';
    const offsetSizeKey = isHorizontal ? 'offsetLeft' : 'offsetTop';
    const clientSizeKey = isHorizontal ? 'clientWidth' : 'clientHeight';

    let sortable: Sortable;
    let virtual: Virtual;

    /**
     * reset component
     */
    function reset() {
      scrollToTop();
      init(props.dataSource);
    }
    /**
     * git item size by data-key
     */
    function getSize(key: string | number) {
      return virtual.sizes.get(key);
    }
    /**
     * Get the current scroll height
     */
    function getOffset() {
      return rootRef.value ? Math.ceil(rootRef.value[scrollDirectionKey]) : 0;
    }
    /**
     * Scroll to top of list
     */
    function scrollToTop() {
      if (rootRef.value) rootRef.value[scrollDirectionKey] = 0;
    }
    /**
     * Scroll to bottom of list
     */
    function scrollToBottom() {
      if (lastRef.value) {
        const bottom = lastRef.value[offsetSizeKey];
        scrollToOffset(bottom);

        // The first scroll height may change, if the bottom is not reached, execute the scroll method again
        setTimeout(() => {
          if (!rootRef.value) return;
          const offset = getOffset();
          const clientSize = Math.ceil(rootRef.value[clientSizeKey]);
          const scrollSize = Math.ceil(rootRef.value[scrollSizeKey]);
          if (offset + clientSize < scrollSize) scrollToBottom();
        }, 5);
      }
    }
    /**
     * Scroll to the specified index position
     */
    function scrollToIndex(index: number) {
      if (index >= viewlist.value.length - 1) {
        scrollToBottom();
      } else {
        const indexOffset = virtual.getOffsetByIndex(index);
        if (indexOffset === undefined) return;
        scrollToOffset(indexOffset);

        setTimeout(() => {
          const offset = getOffset();
          const indexOffset = virtual.getOffsetByIndex(index);
          if (offset !== indexOffset) scrollToIndex(index);
        }, 5);
      }
    }
    /**
     * Scroll to the specified offset
     */
    function scrollToOffset(offset: number) {
      if (rootRef.value) rootRef.value[scrollDirectionKey] = offset;
    }

    const init = (source) => {
      const list = getList(source);
      if (!list) return;

      viewlist.value = [...list];
      updateUniqueKeys();

      console.log(virtual);

      virtual.updateUniqueKeys(uniqueKeys.value);
      virtual.updateSizes(uniqueKeys.value);
      nextTick(() => virtual.updateRange());

      if (!sortable) {
        nextTick(() => initSortable());
      } else {
        sortable.setValue('list', [...list]);
      }

      // if auto scroll to the last offset
      if (lastItem && props.keepOffset) {
        const index = getItemIndex(lastItem);
        scrollToIndex(index);
        lastItem = null;
      }
    };

    const updateUniqueKeys = () => {
      uniqueKeys.value = viewlist.value.map((item) =>
        getDataKey(item, props.dataKey)
      );
    };

    const initVirtual = () => {
      virtual = new Virtual(
        {
          size: props.size,
          keeps: props.keeps,
          uniqueKeys: uniqueKeys.value,
        },
        (newRange: Range) => {
          range.value = newRange;
          if (!sortable) return;
          const state = Store.getStore();
          const { start, end } = range.value;
          const { index } = state.from;
          if (index > -1 && !(index >= start && index <= end)) {
            sortable.rangeChanged = true;
          }
        }
      );
    };

    const initSortable = () => {
      sortable = new Sortable(
        {
          container: groupRef.value,
          list: viewlist.value,
          emit,
          ...props,
        },
        ({ list, changed }: { list: any[]; changed: boolean }) => {
          if (!changed) return;
          // recalculate the range once when scrolling down
          if (
            sortable.rangeChanged &&
            virtual.direction &&
            range.value.start > 0
          ) {
            const index = list.indexOf(viewlist.value[range.value.start]);
            if (index > -1) {
              range.value.start = index;
              range.value.end = index + props.keeps - 1;
            }
          }
          viewlist.value = [...list];
          updateUniqueKeys();
          virtual.updateUniqueKeys(uniqueKeys.value);
          emit('update:dataSource', [...list]);
        }
      );
    };

    const handleScroll = debounce(() => {
      if (!rootRef.value) return;
      const offset = getOffset();
      const clientSize = Math.ceil(rootRef.value[clientSizeKey]);
      const scrollSize = Math.ceil(rootRef.value[scrollSizeKey]);

      if (
        !virtual ||
        !scrollSize ||
        offset < 0 ||
        offset + clientSize > scrollSize + 1
      ) {
        return;
      }

      virtual.handleScroll(offset);

      if (virtual.isFront()) {
        if (!!viewlist.value.length && offset <= 0) handleToTop();
      } else if (virtual.isBehind()) {
        if (clientSize + offset >= scrollSize) handleToBottom();
      }
    }, props.delay);

    const handleToTop = throttle(() => {
      emit('top');
      lastItem = viewlist.value[0];
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

    const getItemIndex = (item: any) => {
      return viewlist.value.findIndex((el) => {
        return getDataKey(item, props.dataKey) == getDataKey(el, props.dataKey);
      });
    };

    const getItemStyle = (dataKey: any) => {
      if (!sortable) return {};
      const state = Store.getStore();
      const fromKey = state.from.key;
      if (sortable.rangeChanged && dataKey == fromKey) {
        return { display: 'none' };
      }
      return {};
    };

    watch(
      () => props.dataSource,
      (newVal: any[]) => {
        init(newVal);
      },
      {
        deep: true,
      }
    );

    watch(
      () => props.disabled,
      (newVal: boolean) => {
        sortable && sortable.setValue('disabled', newVal);
      },
      {
        immediate: true,
      }
    );

    // init range
    onBeforeMount(() => {
      initVirtual();
      init(props.dataSource);
    });

    // set back offset when awake from keep-alive
    onActivated(() => {
      virtual && scrollToOffset(virtual.offset);
    });

    onUnmounted(() => {
      sortable && sortable.destroy();
    });

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
      const { start, end } = range.value;
      return viewlist.value.slice(start, end + 1).map((item) => {
        const index = getItemIndex(item);
        const dataKey = getDataKey(item, props.dataKey);
        const itemStyle = {
          ...props.itemStyle,
          ...getItemStyle(dataKey),
        };

        return slots.item
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
                default: () => slots.item?.({ record: item, index, dataKey }),
              }
            )
          : null;
      });
    };

    expose({
      reset,
      getSize,
      getOffset,
      scrollToTop,
      scrollToBottom,
      scrollToIndex,
      scrollToOffset,
    });

    return () => {
      const { rootTag: RootTag, wrapTag: WrapTag } = props;
      const { front, behind } = range.value;
      const wrapStyle = {
        ...props.wrapStyle,
        padding: isHorizontal
          ? `0px ${behind}px 0px ${front}px`
          : `${front}px 0px ${behind}px`,
      };

      return h(
        RootTag,
        {
          ref: rootRef,
          style: { overflow: isHorizontal ? 'auto hidden' : 'hidden auto' },
          onScroll: handleScroll,
        },
        {
          default: () => [
            renderSlots('header', props.headerTag),
            h(
              WrapTag,
              {
                ref: groupRef,
                role: 'group',
                class: props.wrapClass,
                style: wrapStyle,
              },
              {
                default: () => renderItems(),
              }
            ),
            renderSlots('footer', props.footerTag),

            // last el
            h('div', {
              ref: lastRef,
              style: {
                width: isHorizontal ? '0px' : '100%',
                height: isHorizontal ? '100%' : '0px',
              },
            }),
          ],
        }
      );
    };
  },
});

export default VirtualDragList;

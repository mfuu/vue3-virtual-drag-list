import {
  h,
  ref,
  isRef,
  watch,
  nextTick,
  onMounted,
  onActivated,
  onUnmounted,
  onDeactivated,
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
  emits: ['update:dataSource', 'top', 'bottom', 'drag', 'drop', 'add', 'remove'],
  setup(props, { emit, slots, expose }) {
    const range = ref<Range>(Object.create(null));

    const rootRef = ref<HTMLElement | null>(null);
    const groupRef = ref<HTMLElement | null>(null);
    const bottomRef = ref<HTMLElement | null>(null);

    const viewlist = ref<any[]>([]);
    const uniqueKeys = ref<any[]>([]);

    const isHorizontal = props.direction !== 'vertical';
    const scrollSizeKey = isHorizontal ? 'scrollWidth' : 'scrollHeight';
    const scrollDirectionKey = isHorizontal ? 'scrollLeft' : 'scrollTop';
    const offsetSizeKey = isHorizontal ? 'offsetLeft' : 'offsetTop';
    const clientSizeKey = isHorizontal ? 'clientWidth' : 'clientHeight';

    let lastLength: any = null;
    let timer: any = null;

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
      if (props.pageMode) {
        return document.documentElement[scrollDirectionKey] || document.body[scrollDirectionKey];
      } else {
        const root = rootRef.value;
        return root ? Math.ceil(root[scrollDirectionKey]) : 0;
      }
    }

    /**
     * Get client viewport size
     */
    function getClientSize() {
      if (props.pageMode) {
        return document.documentElement[clientSizeKey] || document.body[clientSizeKey];
      } else {
        const root = rootRef.value;
        return root ? Math.ceil(root[clientSizeKey]) : 0;
      }
    }

    /**
     * Get all scroll size
     */
    function getScrollSize() {
      if (props.pageMode) {
        return document.documentElement[scrollSizeKey] || document.body[scrollSizeKey];
      } else {
        const root = rootRef.value;
        return root ? Math.ceil(root[scrollSizeKey]) : 0;
      }
    }

    /**
     * Scroll to the specified offset
     */
    function scrollToOffset(offset: number) {
      if (props.pageMode) {
        document.body[scrollDirectionKey] = offset;
        document.documentElement[scrollDirectionKey] = offset;
      } else {
        if (rootRef.value) {
          rootRef.value[scrollDirectionKey] = offset;
        }
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
        scrollToOffset(indexOffset);
      }
    }

    /**
     * Scroll to top of list
     */
    function scrollToTop() {
      scrollToOffset(0);
    }

    /**
     * Scroll to bottom of list
     */
    function scrollToBottom() {
      if (bottomRef.value) {
        const offset = bottomRef.value[offsetSizeKey];
        scrollToOffset(offset);

        setTimeout(() => {
          if (!scrolledToBottom()) scrollToBottom();
        }, 5);
      }
    }

    expose({
      reset,
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

      if (props.pageMode) {
        addPageModeScrollListener();
      }
    });

    onDeactivated(() => {
      if (props.pageMode) {
        removePageModeScrollListener();
      }
    });

    onMounted(() => {
      if (props.pageMode) {
        updatePageModeFront();
        addPageModeScrollListener();
      }
    });

    onUnmounted(() => {
      sortable && sortable.destroy();
    });

    const addPageModeScrollListener = () => {
      document.addEventListener('scroll', handleScroll, { passive: false });
    };

    const removePageModeScrollListener = () => {
      document.removeEventListener('scroll', handleScroll);
    };

    // when using page mode we need update slot header size manually
    // taking root offset relative to the browser as slot header size
    const updatePageModeFront = () => {
      const root = rootRef.value;
      if (root) {
        const rect = root.getBoundingClientRect();
        const { defaultView } = root.ownerDocument;
        const offsetFront = isHorizontal
          ? rect.left + defaultView!.pageXOffset
          : rect.top + defaultView!.pageYOffset;
        virtual.handleSlotSizeChange('header', offsetFront);
      }
    };

    const init = (source) => {
      const list = getList(source);
      if (!list) return;

      viewlist.value = [...list];
      updateUniqueKeys();

      if (virtual.sizes.size) {
        virtual.updateRange();
      } else {
        clearTimeout(timer);
        timer = setTimeout(() => virtual.updateRange(), 17);
      }

      if (!sortable) {
        nextTick(() => initSortable());
      } else {
        sortable.setValue('list', [...list]);
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
      virtual = new Virtual(
        {
          size: props.size,
          keeps: props.keeps,
          uniqueKeys: uniqueKeys.value,
          buffer: Math.round(props.keeps / 3),
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

          if (list.length !== viewlist.value.length) {
            updateRangeOnDrop(list);
          }

          viewlist.value = [...list];
          updateUniqueKeys();
          emit('update:dataSource', [...list]);
        }
      );
    };

    const updateRangeOnDrop = (list) => {
      let newRange = { ...range.value };
      if (newRange.start > 0) {
        const index = list.indexOf(viewlist.value[newRange.start]);
        if (index > -1) {
          newRange.start = index;
          newRange.end = index + props.keeps - 1;
        }
      }
      if (
        list.length > viewlist.value.length &&
        newRange.end === viewlist.value.length - 1 &&
        scrolledToBottom()
      ) {
        newRange.end++;
        newRange.start = Math.max(0, newRange.end - props.keeps + 1);
      }
      virtual.handleUpdate(newRange.start, newRange.end);
    };

    const handleScroll = debounce(() => {
      const offset = getOffset();
      const clientSize = getClientSize();
      const scrollSize = getScrollSize();

      // iOS scroll-spring-back behavior will make direction mistake
      if (offset < 0 || offset + clientSize > scrollSize + 1 || !scrollSize) {
        return;
      }

      virtual.handleScroll(offset);

      if (virtual.isFront() && !!viewlist.value.length && offset <= 0) {
        handleToTop();
      } else if (virtual.isBehind() && clientSize + offset >= scrollSize) {
        handleToBottom();
      }
    }, props.delay);

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
      if (!sortable) return {};
      const state = Store.getStore();
      const fromKey = state.from.key;
      if (sortable.rangeChanged && dataKey == fromKey) {
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
      const { rootTag, wrapTag, wrapClass, headerTag, footerTag, pageMode } = props;
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
          onScroll: !pageMode && handleScroll,
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

            // last el
            h('div', {
              ref: bottomRef,
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

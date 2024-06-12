import {
  h,
  ref,
  isRef,
  watch,
  computed,
  onMounted,
  onActivated,
  onUnmounted,
  onDeactivated,
  onBeforeMount,
  defineComponent,
} from 'vue';
import {
  Range,
  Virtual,
  Sortable,
  throttle,
  getDataKey,
  SortableAttrs,
  VirtualAttrs,
} from './core';
import { VirtualProps } from './props';
import Item from './item';

const getList = (source) => {
  return isRef(source) ? source.value : source;
};

const VirtualList = defineComponent({
  props: VirtualProps,
  emits: ['update:dataSource', 'update:modelValue', 'top', 'bottom', 'drag', 'drop', 'rangeChange'],
  setup(props, { emit, slots, expose }) {
    const rangeRef = ref<Range>({ start: 0, end: props.keeps - 1, front: 0, behind: 0 });

    const rootRef = ref<HTMLElement | null>(null);
    const wrapRef = ref<HTMLElement | null>(null);
    const listRef = ref<any[]>([]);
    const dragging = ref<any>();
    const lastList = ref<any[]>([]);

    const horizontal = computed(() => props.direction !== 'vertical');

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

    function getSize(key: string | number) {
      return virtual.getSize(key);
    }

    function getOffset() {
      return virtual.getOffset();
    }

    function getClientSize() {
      return virtual.getClientSize();
    }

    function getScrollSize() {
      return virtual.getScrollSize();
    }

    function scrollToKey(key: number | string) {
      const index = uniqueKeys.indexOf(key);
      if (index > -1) {
        virtual.scrollToIndex(index);
      }
    }

    function scrollToOffset(offset: number) {
      virtual.scrollToOffset(offset);
    }

    function scrollToIndex(index: number) {
      virtual.scrollToIndex(index);
    }

    function scrollToTop() {
      scrollToOffset(0);
    }

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

    onBeforeMount(() => {
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
      installVirtual();
      installSortable();
    });

    onUnmounted(() => {
      sortable?.destroy();
      virtual?.removeScrollEventListener();
    });

    const onUpdate = () => {
      const list = getList(props.modelValue || props.dataSource);
      if (!list) return;

      listRef.value = list;
      updateUniqueKeys();
      updateRange(lastList.value, list);

      sortable?.option('list', list);

      // if auto scroll to the last offset
      if (lastLength && props.keepOffset) {
        const index = list.length - lastLength;
        if (index > 0) {
          scrollToIndex(index);
        }
        lastLength = 0;
      }

      lastList.value = [...listRef.value];
    };

    const updateUniqueKeys = () => {
      uniqueKeys = listRef.value.map((item) => getDataKey(item, props.dataKey));
      virtual?.option('uniqueKeys', uniqueKeys);
      sortable?.option('uniqueKeys', uniqueKeys);
    };

    const installVirtual = () => {
      virtual = new Virtual({
        ...virtualAttributes.value,
        buffer: Math.round(props.keeps / 3),
        wrapper: wrapRef.value as any,
        scroller: props.scroller || (rootRef.value as any),
        uniqueKeys: uniqueKeys,
        onScroll: (event) => {
          lastLength = 0;
          if (!!listRef.value.length && event.top) {
            handleToTop();
          } else if (event.bottom) {
            handleToBottom();
          }
        },
        onUpdate: (range) => {
          const rangeChanged = range.start !== rangeRef.value.start;
          if (dragging.value && rangeChanged) {
            sortable && (sortable.reRendered = true);
          }
          rangeRef.value = range;
          rangeChanged && emit('rangeChange', range);
        },
      });
    };

    const installSortable = () => {
      sortable = new Sortable(rootRef.value as any, {
        ...sortableAttributes.value,
        list: listRef.value,
        uniqueKeys: uniqueKeys,
        onDrag: (event) => {
          dragging.value = event.key;
          if (!props.sortable) {
            virtual.enableScroll(false);
            sortable.option('autoScroll', false);
          }
          emit('drag', event);
        },
        onDrop: (event) => {
          dragging.value = '';
          virtual.enableScroll(true);
          sortable.option('autoScroll', props.autoScroll);

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
      virtual?.updateRange(newRange);
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

    const renderSpacer = (offset) => {
      if (props.tableMode) {
        const tdStyle = { padding: 0, margin: 0, border: 0, height: `${offset}px` };

        return h('tr', {}, [h('td', { style: tdStyle })]);
      }
      return null;
    };

    const renderItems = () => {
      const renders: any[] = [];
      const { start, end, front, behind } = rangeRef.value;
      const sizeKey = horizontal.value ? 'offsetWidth' : 'offsetHeight';

      renders.push(renderSpacer(front));

      for (let index = start; index <= end; index++) {
        const record = listRef.value[index];
        if (record) {
          const dataKey = getDataKey(record, props.dataKey);
          renders.push(
            slots.item
              ? h(
                  Item,
                  {
                    key: dataKey,
                    class: props.itemClass,
                    style: dataKey == dragging.value && { display: 'none' },
                    dataKey: dataKey,
                    sizeKey: sizeKey,
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

      renders.push(renderSpacer(behind));

      return renders;
    };

    return () => {
      const { front, behind } = rangeRef.value;
      const { tableMode, rootTag, wrapTag, scroller, wrapClass, wrapStyle } = props;

      const padding = horizontal.value ? `0 ${behind}px 0 ${front}px` : `${front}px 0 ${behind}px`;
      const overflow = horizontal.value ? 'auto hidden' : 'hidden auto';

      const container = tableMode ? 'table' : rootTag;
      const wrapper = tableMode ? 'tbody' : wrapTag;

      return h(
        container,
        {
          ref: rootRef,
          style: !scroller && !tableMode && { overflow },
        },
        {
          default: () => [
            slots.header?.(),
            h(
              wrapper,
              {
                ref: wrapRef,
                class: wrapClass,
                style: { ...wrapStyle, padding: !tableMode && padding },
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

export default VirtualList;

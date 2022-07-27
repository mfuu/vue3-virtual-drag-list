import { defineComponent, watch, ref, reactive, nextTick, PropType, h, onActivated, onUnmounted, onMounted, onBeforeMount } from 'vue';
import { debounce, throttle } from './utils';
import Sortable, { DragState } from './sortable';
import Virtual, { Range } from './virtual';
import { Slots, Items } from './children';

type Direction = 'vertical' | 'horizontal'

const VirtualDragList = defineComponent({
  props: {
    dataSource: {
      type: Array,
      default: () => {
        return []
      }
    },
    dataKey: {
      type: String,
      required: true
    },
    direction: {
      type: String as PropType<Direction>,
      default: 'vertical'
    },
    keeps: {
      type: Number,
      default: 30
    },
    size: {
      type: Number
    },
    delay: {
      type: Number,
      default: 10
    },
    rootTag: {
      type: String,
      default: 'div'
    },
    wrapTag: {
      type: String,
      default: 'div'
    },
    wrapClass: {
      type: String,
      default: ''
    },
    wrapStyle: {
      type: Object
    },
    headerTag: {
      type: String,
      default: 'div'
    },
    footerTag: {
      type: String,
      default: 'div'
    },
    itemTag: {
      type: String,
      default: 'div'
    },
    itemStyle: {
      type: Object
    },
    itemClass: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    draggable: {
      type: [Function, String]
    },
    dragging: {
      type: Function
    },
    ghostClass: {
      type: String,
      default: ''
    },
    ghostStyle: {
      type: Object,
      default: () => {
        return {}
      }
    },
    chosenClass: {
      type: String,
      default: ''
    },
    animation: {
      type: Number,
      default: 150
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    scrollStep: {
      type: Number,
      default: 5
    },
    scrollThreshold: {
      type: Number,
      default: 15
    },
    keepOffset: {
      type: Boolean,
      default: false
    }
  },
  emits: ['top', 'bottom', 'ondragstart', 'ondragend'],
  setup(props, { emit, slots }) {
    const range = ref<Range>(new Range);
    const dragState = ref<DragState>(new DragState);

    const rootRef = ref<HTMLElement | null>(null);
    const groupRef = ref<HTMLElement | null>(null);
    const lastRef = ref<HTMLElement | null>(null)

    const viewlist = ref<any[]>([]);
    const uniqueKeys = ref<any[]>([]);

    let lastItem: any = null;

    // --------------------------- usefull values ------------------------------
    const isHorizontal = props.direction !== 'vertical'
    const scrollSizeKey = isHorizontal ? 'scrollWidth' : 'scrollHeight'
    const scrollDirectionKey = isHorizontal ? 'scrollLeft' : 'scrollTop'
    const offsetSizeKey = isHorizontal ? 'offsetLeft' : 'offsetTop'
    const clientSizeKey = isHorizontal ? 'clientWidth' : 'clientHeight'

    let sortable: Sortable;
    let virtual: Virtual;

    // --------------------------- emit functions ------------------------------
    /**
     * reset component
     */
    function reset() {
      scrollToTop()
      init(props.dataSource)
    }
    /**
     * git item size by data-key
     */
    function getSize(key: string | number) {
      return virtual.sizes.get(key)
    }
    /**
     * Get the current scroll height
     */
    function getOffset() {
      return rootRef.value ? Math.ceil(rootRef.value[scrollDirectionKey]) : 0
    }
    /**
     * Scroll to top of list
     */
    function scrollToTop() {
      if (rootRef.value) rootRef.value[scrollDirectionKey] = 0
    }
    /**
     * Scroll to bottom of list
     */
    function scrollToBottom() {
      if (lastRef.value) {
        const bottom = lastRef.value[offsetSizeKey]
        scrollToOffset(bottom)

        // The first scroll height may change, if the bottom is not reached, execute the scroll method again
        setTimeout(() => {
          if (!rootRef.value) return
          const offset = getOffset()
          const clientSize = Math.ceil(rootRef.value[clientSizeKey])
          const scrollSize = Math.ceil(rootRef.value[scrollSizeKey])
          if (offset + clientSize < scrollSize) scrollToBottom()
        }, 5)
      }
    }
    /**
     * Scroll to the specified index position
     */
    function scrollToIndex(index: number) {
      if (index >= viewlist.value.length - 1) {
        scrollToBottom()
      } else {
        const indexOffset = virtual.getOffsetByIndex(index)
        if (indexOffset === undefined) return
        scrollToOffset(indexOffset)

        setTimeout(() => {
          const offset = getOffset()
          const indexOffset = virtual.getOffsetByIndex(index)
          if (offset !== indexOffset) scrollToIndex(index)
        }, 5)
      }
    }
    /**
     * Scroll to the specified offset
     */
    function scrollToOffset(offset: number) {
      if (rootRef.value) rootRef.value[scrollDirectionKey] = offset
    }

    // --------------------------- private mehtods ------------------------------
    const init = (list: any[]) => {
      viewlist.value = list
      updateUniqueKeys()

      if (virtual) {
        virtual.updateUniqueKeys(uniqueKeys.value)
        virtual.updateSizes(uniqueKeys.value)
        virtual.updateRange()
      }

      if (sortable) sortable.set('dataSource', [...list])
      else nextTick(() => initSortable())

      // if auto scroll to the last offset
      if (lastItem && props.keepOffset) {
        const index = getItemIndex(lastItem)
        scrollToIndex(index)
        lastItem = null
      }
    }

    const updateUniqueKeys = () => {
      uniqueKeys.value = viewlist.value.map(item => getDataKey(item))
    }

    const initVirtual = () => {
      virtual = new Virtual(
        {
          size: props.size,
          keeps: props.keeps,
          uniqueKeys: uniqueKeys.value,
          isHorizontal: isHorizontal
        },
        (newRange: Range) => {
          if (dragState.value.to.key === undefined) range.value = newRange
          const { start, end } = range.value
          const { index } = dragState.value.from
          if (index > -1 && !(index >= start && index <= end)) {
            if (sortable) sortable.rangeIsChanged = true
          }
        }
      )
    }

    // --------------------------- sortable ------------------------------
    const initSortable = () => {
      sortable = new Sortable(
        {
          scrollEl: groupRef.value,
          dataSource: viewlist.value,
          getKey: getDataKey,

          animation: props.animation,
          autoScroll: props.autoScroll,
          scrollStep: props.scrollStep,
          scrollThreshold: props.scrollThreshold,

          disabled: props.disabled,
          draggable: props.draggable,
          ghostClass: props.ghostClass,
          ghostStyle: props.ghostStyle,
          chosenClass: props.chosenClass,
        },
        (from: DragState['from'], node: HTMLElement) => {
          // on drag
          dragState.value.from = from
          emit('ondragstart', viewlist.value, from, node)
        },
        (list: any[], from: DragState['from'], to: DragState['to'], changed: boolean) => {
          // on drop
          dragState.value.to = to
          emit('ondragend', list, from, to, changed)
          if (changed) {
            if (sortable.rangeIsChanged && virtual.direction && range.value.start > 0) {
              const index = list.indexOf(viewlist.value[range.value.start])
              if (index > -1) {
                range.value.start = index
                range.value.end = index + props.keeps - 1
              }
            }
            // list change
            viewlist.value = [...list]
            updateUniqueKeys()
            virtual.updateUniqueKeys(uniqueKeys.value)
          }
          clearDragState()
        }
      )
    }

    const clearDragState = throttle(() => {
      dragState.value = new DragState
    }, props.delay + 17)

    // --------------------------- handle scroll ------------------------------
    const handleScroll = debounce(() => {
      // The scroll event is triggered when the mouseup event occurs, which is handled here to prevent the page from scrolling due to range changes.
      if (dragState.value.to.key !== undefined) {
        clearDragState()
        return
      }

      if (!rootRef.value) return
      const offset = getOffset()
      const clientSize = Math.ceil(rootRef.value[clientSizeKey])
      const scrollSize = Math.ceil(rootRef.value[scrollSizeKey])

      if (!scrollSize || offset < 0 || (offset + clientSize > scrollSize + 1)) return

      virtual.handleScroll(offset)

      if (virtual.isFront()) {
        if (!!viewlist.value.length && offset <= 0) handleToTop(this)
      } else if (virtual.isBehind()) {
        if (clientSize + offset >= scrollSize) handleToBottom(this)
      }
    }, props.delay)

    const handleToTop = debounce(() => {
      emit('top')
      lastItem = viewlist.value[0]
    })

    const handleToBottom = debounce(() => {
      emit('bottom')
    })

    // --------------------------- handle size change ------------------------------
    const onItemResized = (id: any, size: number) => {
      virtual.handleItemSizeChange(id, size)
    }
    const onHeaderResized = (id: any, size: number) => {
      virtual.handleHeaderSizeChange(size)
    }
    const onFooterResized = (id: any, size: number) => {
      virtual.handleFooterSizeChange(size)
    }

    // --------------------------- methods ------------------------------
    const getDataKey = (item: any) => {
      const dataKey = props.dataKey
      return (!Array.isArray(dataKey) ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : dataKey).reduce((o, k) => (o || {})[k], item)
    }

    const getItemIndex = (item: any) => {
      return viewlist.value.findIndex(el => {
        return getDataKey(item) == getDataKey(el)
      })
    }

    const getItemStyle = (dataKey: any) => {
      if (!sortable) return {}
      const { key } = dragState.value.from
      if (sortable.rangeIsChanged && dataKey == key)
        return { display: 'none' }
      return {}
    }

    // --------------------------- methods ------------------------------
    watch(() => props.dataSource, (newVal: any[]) => {
      init(newVal)
    }, {
      deep: true,
      immediate: true
    })

    watch(() => props.disabled, (newVal: boolean) => {
      if (sortable) sortable.set('disabled', newVal)
    }, {
      immediate: true
    })

    // init range
    onBeforeMount(() => {
      initVirtual()
    })

    // set back offset when awake from keep-alive
    onActivated(() => {
      scrollToOffset(virtual.offset)
    })

    onUnmounted(() => {
      sortable && sortable.destroy()
      sortable = null
      virtual = null
    })

    // --------------------------- render ------------------------------
    return () => {
      const {
        rootTag: RootTag,
        wrapTag: WrapTag,
        itemTag: ItemTag,
        headerTag: HeaderTag,
        footerTag: FooterTag,
      } = props

      const { start, end, front, behind } = range.value
      const wrapStyle = { ...props.wrapStyle, padding: isHorizontal ? `0px ${behind}px 0px ${front}px` : `${front}px 0px ${behind}px`}

      return h(RootTag, {
        ref: rootRef,
        style: { overflow: isHorizontal ? 'auto hidden' : 'hidden auto' },
        on: { '&scroll': handleScroll }
      }, [
        // header
        slots.header ? h(Slots, {
          props: {
            tag: HeaderTag,
            dataKey: 'header',
            event: 'onHeaderResized'
          },
          on: { onHeaderResized }
        }, slots.header()) : null,
  
        // list
        h(WrapTag, {
          ref: groupRef,
          attrs: { role: 'group' },
          class: props.wrapClass,
          style: wrapStyle
        }, viewlist.value.slice(start, end + 1).map(item => {
          const index = getItemIndex(item)
          const dataKey = getDataKey(item)
          const itemStyle = { ...props.itemStyle, ...getItemStyle(dataKey) }
          const itemProps = { isHorizontal, dataKey, tag: ItemTag, event: 'onItemResized' }
  
          return slots.item ?
            h(Items, {
              key: dataKey,
              props: itemProps,
              class: props.itemClass,
              style: itemStyle,
              on: { onItemResized }
            }, slots.item({ record: item, index, dataKey }))
            :
            h(ItemTag, {
              key: dataKey,
              attrs: { 'data-key': dataKey },
              class: props.itemClass,
              style: { ...itemStyle, height: `${props.size}px` }
            }, dataKey)
        })),
  
        // footer
        slots.footer ? h(Slots, {
          props: {
            tag: FooterTag,
            dataKey: 'footer',
            event: 'onFooterResized'
          },
          on: {onFooterResized}
        }, slots.footer()) : null,
  
        // last el
        h('div', {
          ref: lastRef,
          style: {
            width: isHorizontal ? '0px' : '100%',
            height: isHorizontal ? '100%' : '0px'
          }
        })
      ])
    }
  }
})

export default VirtualDragList
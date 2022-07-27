import { defineComponent, h, ref } from 'vue'
import { useObserver } from './hooks'

export const SlotsProps = {
  tag: {
    type: String,
    default: 'div'
  },
  event: {
    type: String
  },
  dataKey: {
    type: [String, Number]
  },
  isHorizontal: {
    type: Boolean
  }
}

export const Items = defineComponent({
  name: 'virtual-draglist-items',
  props: SlotsProps,
  setup(props, { emit, slots }) {
    const itemRef = ref<HTMLElement | null>(null);
    useObserver(props, itemRef, emit)

    return () => {
      const { tag: Tag, dataKey } = props

      return h(Tag, {
        ref: itemRef,
        key: dataKey,
        attrs: {
          'data-key': dataKey
        }
      }, slots.default?.())
    }
  }
})

export const Slots = defineComponent({
  name: 'virtual-draglist-slots',
  props: SlotsProps,
  setup(props, { emit, slots }) {
    const slotRef = ref<HTMLElement | null>(null);

    useObserver(props, slotRef, emit)

    return () => {
      const { tag: Tag, dataKey } = props

      return h(Tag, {
        ref: slotRef,
        key: dataKey,
        attrs: {
          'data-key': dataKey
        }
      }, slots.default?.())
    }
  }
})

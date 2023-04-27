import { defineComponent, h, ref } from 'vue';
import { useObserver } from '../hooks';
import { SlotsProps } from '../props';

export const Items = defineComponent({
  name: 'VirtualDraglistItems',
  props: SlotsProps,
  emits: ['resize'],
  setup(props, { emit, slots }) {
    const itemRef = ref<HTMLElement | null>(null);
    useObserver(props, itemRef, emit);

    return () => {
      const { tag: Tag, dataKey } = props;

      return h(
        Tag,
        {
          ref: itemRef,
          key: dataKey,
          'data-key': dataKey,
        },
        {default: () => slots.default?.()}
      );
    };
  },
});

export const Slots = defineComponent({
  name: 'VirtualDraglistSlots',
  props: SlotsProps,
  emits: ['resize'],
  setup(props, { emit, slots }) {
    const slotRef = ref<HTMLElement | null>(null);

    useObserver(props, slotRef, emit);

    return () => {
      const { tag: Tag, dataKey } = props;

      return h(
        Tag,
        {
          ref: slotRef,
          key: dataKey,
          'data-key': dataKey,
        },
        {default: () => slots.default?.()}
      );
    };
  },
});

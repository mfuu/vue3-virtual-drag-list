import { h, ref, Ref, computed, onMounted, onUpdated, onUnmounted, defineComponent } from 'vue';
import { SlotsProps } from './props';

export const useObserver = (props: any, aRef: Ref<HTMLElement | null>, emit: any) => {
  let observer: ResizeObserver | null = null;
  const sizeKey = computed(() => (props.isHorizontal ? 'offsetWidth' : 'offsetHeight'));

  const getCurrentSize = () => {
    return aRef.value ? aRef.value[sizeKey.value] : 0;
  };

  const onSizeChange = () => {
    const { event, dataKey } = props;
    emit(event, getCurrentSize(), dataKey);
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
        { default: () => slots.default?.() }
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
        { default: () => slots.default?.() }
      );
    };
  },
});

import { h, ref, Ref, onMounted, onUpdated, onUnmounted, defineComponent } from 'vue';
import { SlotsProps } from './props';

export const useObserver = (props: any, aRef: Ref<HTMLElement | null>, emit: any) => {
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

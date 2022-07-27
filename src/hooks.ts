import { onMounted, onUpdated, onUnmounted, Ref, computed } from 'vue'

export const useObserver = (props: any, aRef: Ref<HTMLElement | null>, emit: any) => {
  let observer: ResizeObserver | null = null;
  const sizeKey = computed(() => props.isHorizontal ? 'offsetWidth' : 'offsetHeight')

  const getCurrentSize = () => {
    return aRef?.value ? aRef.value[sizeKey.value] : 0
  }

  const onSizeChange = () => {
    const { event, dataKey } = props
    emit(event, dataKey, getCurrentSize())
  }

  onMounted(() => {
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        onSizeChange()
      })
      aRef?.value && observer.observe(aRef.value)
    }
  })

  onUpdated(() => { onSizeChange() })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
      observer = null
    }
  })
}
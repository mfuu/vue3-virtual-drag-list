import { PropType } from 'vue';

type Direction = 'vertical' | 'horizontal';
type LockAxis = 'x' | 'y';

export const VirtualProps = {
  dataSource: {},
  modelValue: {},
  dataKey: {
    type: String,
    default: '',
    required: true,
  },
  tableMode: {
    type: Boolean,
    default: false,
  },
  draggable: {
    type: String,
    default: '.virtual-dnd-list-item',
  },
  itemClass: {
    type: String,
    default: 'virtual-dnd-list-item',
  },
  sortable: {
    type: Boolean,
    default: true,
  },
  handle: {
    type: [Function, String],
  },
  group: {
    type: [Object, String],
  },
  scroller: {
    type: [Document, HTMLElement],
  },
  lockAxis: {
    type: String as PropType<LockAxis>,
    default: '',
  },
  direction: {
    type: String as PropType<Direction>,
    default: 'vertical',
  },
  keeps: {
    type: Number,
    default: 30,
  },
  size: {
    type: Number,
  },
  debounceTime: {
    type: Number,
    default: 0,
  },
  throttleTime: {
    type: Number,
    default: 0,
  },
  animation: {
    type: Number,
    default: 150,
  },
  autoScroll: {
    type: Boolean,
    default: true,
  },
  scrollSpeed: {
    type: Object,
    default: () => ({ x: 10, y: 10 }),
  },
  scrollThreshold: {
    type: Number,
    default: 55,
  },
  keepOffset: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  fallbackOnBody: {
    type: Boolean,
    default: false,
  },
  delay: {
    type: Number,
    default: 0,
  },
  delayOnTouchOnly: {
    type: Boolean,
    default: false,
  },
  rootTag: {
    type: String,
    default: 'div',
  },
  wrapTag: {
    type: String,
    default: 'div',
  },
  wrapClass: {
    type: String,
    default: '',
  },
  wrapStyle: {
    type: Object,
    default: () => ({}),
  },
  ghostClass: {
    type: String,
    default: '',
  },
  ghostStyle: {
    type: Object,
    default: () => ({}),
  },
  chosenClass: {
    type: String,
    default: '',
  },
  placeholderClass: {
    type: String,
    default: '',
  }
};

export const ItemProps = {
  dataKey: {
    type: [String, Number],
  },
  sizeKey: {
    type: String,
    default: 'offsetHeight',
  },
  itemClass: {
    type: String,
  },
};

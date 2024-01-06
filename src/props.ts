import { PropType } from 'vue';

type Direction = 'vertical' | 'horizontal';

export const VirtualProps = {
  dataSource: {
    default: [],
    required: true,
  },
  dataKey: {
    type: String,
    default: '',
    required: true,
  },
  draggable: {
    type: [String],
  },
  handle: {
    type: [Function, String],
  },
  group: {
    type: [Object, String],
  },
  scroller: {},
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
  headerTag: {
    type: String,
    default: 'div',
  },
  footerTag: {
    type: String,
    default: 'div',
  },
  itemTag: {
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
  itemStyle: {
    type: Object,
    default: () => ({}),
  },
  itemClass: {
    type: String,
    default: '',
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
  headerStyle: {
    type: Object,
    default: () => ({}),
  },
  footerStyle: {
    type: Object,
    default: () => ({}),
  },
};

export const SlotsProps = {
  tag: {
    type: String,
    default: 'div',
  },
  event: {
    type: String,
  },
  dataKey: {
    type: [String, Number],
  },
  isHorizontal: {
    type: Boolean,
  },
};

import { debounce, throttle } from '../utils';

export interface VirtualOptions {
  size?: number;
  keeps: number;
  buffer: number;
  wrapper?: HTMLElement;
  scroller: any;
  direction: 'vertical' | 'horizontal';
  uniqueKeys: any[];
  debounceTime: number;
  throttleTime: number;
  onScroll: any;
  onUpdate: any;
}

export interface CalcSize {
  average: number;
  total: number;
  fixed: number;
  header: number;
  footer: number;
}

export interface Range {
  start: number;
  end: number;
  front: number;
  behind: number;
}

const CACLTYPE = {
  INIT: 'INIT',
  FIXED: 'FIXED',
  DYNAMIC: 'DYNAMIC',
};

const SCROLL_DIRECTION = {
  FRONT: 'FRONT',
  BEHIND: 'BEHIND',
  STATIONARY: 'STATIONARY',
};

const DIRECTION = {
  HORIZONTAL: 'horizontal',
  VERTICAL: 'vertical',
};

const scrollType = {
  [DIRECTION.VERTICAL]: 'scrollTop',
  [DIRECTION.HORIZONTAL]: 'scrollLeft',
};

const scrollSize = {
  [DIRECTION.VERTICAL]: 'scrollHeight',
  [DIRECTION.HORIZONTAL]: 'scrollWidth',
};

const offsetSize = {
  [DIRECTION.VERTICAL]: 'offsetHeight',
  [DIRECTION.HORIZONTAL]: 'offsetWidth',
};

const offsetType = {
  [DIRECTION.VERTICAL]: 'offsetTop',
  [DIRECTION.HORIZONTAL]: 'offsetLeft',
};

export const attributes = [
  'size',
  'keeps',
  'scroller',
  'direction',
  'debounceTime',
  'throttleTime',
];

class Virtual {
  options: VirtualOptions;
  sizes: Map<any, number>;
  range: Range;
  offset: number;
  scrollEl: HTMLElement;
  calcType: string;
  calcSize: CalcSize;
  direction: string;
  useWindowScroll: boolean;
  onScroll: any;
  constructor(options: VirtualOptions) {
    this.options = options;

    this.sizes = new Map();
    this.range = Object.create(null);
    this.offset = 0;
    this.calcType = CACLTYPE.INIT;
    this.calcSize = Object.create(null);
    this.direction = '';
    this.useWindowScroll = false;

    this.onScroll = null;

    this.updateScrollElement();
    this.updateOnScrollFunction();
    this.addScrollEventListener();
    this.checkIfUpdate(0, options.keeps - 1);
  }

  isFront() {
    return this.direction === SCROLL_DIRECTION.FRONT;
  }

  isBehind() {
    return this.direction === SCROLL_DIRECTION.BEHIND;
  }

  isFixed() {
    return this.calcType === CACLTYPE.FIXED;
  }

  getSize(key) {
    return this.sizes.get(key) || this.getItemSize();
  }

  getOffset() {
    return this.scrollEl[scrollType[this.options.direction]];
  }

  getScrollSize() {
    return this.scrollEl[scrollSize[this.options.direction]];
  }

  getClientSize() {
    return this.scrollEl[offsetSize[this.options.direction]];
  }

  scrollToOffset(offset: number) {
    this.scrollEl[scrollType[this.options.direction]] = offset;
  }

  scrollToIndex(index: number) {
    if (index >= this.options.uniqueKeys.length - 1) {
      this.scrollToBottom();
    } else {
      const indexOffset = this.getOffsetByIndex(index);
      this.scrollToOffset(indexOffset);
    }
  }

  scrollToBottom() {
    const offset = this.getScrollSize();
    this.scrollToOffset(offset);

    // if the bottom is not reached, execute the scroll method again
    setTimeout(() => {
      const clientSize = this.getClientSize();
      const scrollSize = this.getScrollSize();
      const scrollOffset = this.getOffset();
      if (scrollOffset + clientSize + 1 < scrollSize) {
        this.scrollToBottom();
      }
    }, 5);
  }

  updateOptions(key, value) {
    const oldValue = this.options[key];

    this.options[key] = value;

    if (key === 'uniqueKeys') {
      this.sizes.forEach((v, k) => {
        if (!value.includes(k)) {
          this.sizes.delete(k);
        }
      });
    } else if (key === 'scroller') {
      oldValue?.removeEventListener('scroll', this.onScroll);

      this.updateScrollElement();
      this.addScrollEventListener();
    }
  }

  updateRange(range?) {
    if (range) {
      this.handleUpdate(range.start, range.end);
      return;
    }

    let start = this.range.start;
    start = Math.max(start, 0);

    this.handleUpdate(start, this.getEndByStart(start));
  }

  handleItemSizeChange(key, size: number) {
    this.sizes.set(key, size);

    if (this.calcType === CACLTYPE.INIT) {
      this.calcType = CACLTYPE.FIXED;
      this.calcSize.fixed = size;
    } else if (this.isFixed() && this.calcSize.fixed !== size) {
      this.calcType = CACLTYPE.DYNAMIC;
      this.calcSize.fixed = 0;
    }
    if (this.calcType !== CACLTYPE.FIXED) {
      this.calcSize.total = [...this.sizes.values()].reduce((t, i) => t + i, 0);
      this.calcSize.average = Math.round(this.calcSize.total / this.sizes.size);
    }
  }

  handleSlotSizeChange(key: 'header' | 'footer', size: number) {
    this.calcSize[key] = size;
  }

  addScrollEventListener() {
    this.options.scroller?.addEventListener('scroll', this.onScroll, false);
  }

  removeScrollEventListener() {
    this.options.scroller?.removeEventListener('scroll', this.onScroll);
  }

  updateOnScrollFunction() {
    const { debounceTime, throttleTime } = this.options;
    if (debounceTime) {
      this.onScroll = debounce(() => this.handleScroll(), debounceTime);
    } else if (throttleTime) {
      this.onScroll = throttle(() => this.handleScroll(), throttleTime);
    } else {
      this.onScroll = () => this.handleScroll();
    }
  }

  updateScrollElement() {
    this.scrollEl = this.getScrollElement(this.options.scroller);
  }

  handleScroll() {
    if (this.sizes.size === 0) return;

    const offset = this.getOffset();
    const clientSize = this.getClientSize();
    const scrollSize = this.getScrollSize();

    if (offset === this.offset) {
      this.direction = SCROLL_DIRECTION.STATIONARY;
    } else {
      this.direction = offset < this.offset ? SCROLL_DIRECTION.FRONT : SCROLL_DIRECTION.BEHIND;
    }

    this.offset = offset;

    const top = this.isFront() && offset <= 0;
    const bottom = this.isBehind() && clientSize + offset >= scrollSize;

    this.options.onScroll({ top, bottom, offset, direction: this.direction });

    if (this.isFront()) {
      this.handleScrollFront();
    } else if (this.isBehind()) {
      this.handleScrollBehind();
    }
  }

  handleScrollFront() {
    const scrolls = this.getScrollItems();
    if (scrolls > this.range.start) {
      return;
    }
    const start = Math.max(scrolls - this.options.buffer, 0);
    this.checkIfUpdate(start, this.getEndByStart(start));
  }

  handleScrollBehind() {
    const scrolls = this.getScrollItems();
    if (scrolls < this.range.start + this.options.buffer) {
      return;
    }
    this.checkIfUpdate(scrolls, this.getEndByStart(scrolls));
  }

  getScrollItems() {
    const offset = this.offset - this.getScrollStartOffset();

    if (offset <= 0) {
      return 0;
    }

    if (this.isFixed()) {
      return Math.floor(offset / this.calcSize.fixed);
    }

    let low = 0;
    let high = this.options.uniqueKeys.length;
    let middle = 0;
    let middleOffset = 0;
    while (low <= high) {
      middle = low + Math.floor((high - low) / 2);
      middleOffset = this.getOffsetByIndex(middle);

      if (middleOffset === offset) {
        return middle;
      } else if (middleOffset < offset) {
        low = middle + 1;
      } else if (middleOffset > offset) {
        high = middle - 1;
      }
    }
    return low > 0 ? --low : 0;
  }

  checkIfUpdate(start: number, end: number) {
    const keeps = this.options.keeps;
    const total = this.options.uniqueKeys.length;

    if (total <= keeps) {
      start = 0;
      end = this.getLastIndex();
    } else if (end - start < keeps - 1) {
      start = end - keeps + 1;
    }
    if (this.range.start !== start) {
      this.handleUpdate(start, end);
    }
  }

  handleUpdate(start: number, end: number) {
    this.range.start = start;
    this.range.end = end;
    this.range.front = this.getFrontOffset();
    this.range.behind = this.getBehindOffset();

    this.options.onUpdate({ ...this.range });
  }

  getFrontOffset() {
    if (this.isFixed()) {
      return this.calcSize.fixed * this.range.start;
    } else {
      return this.getOffsetByIndex(this.range.start);
    }
  }

  getBehindOffset() {
    const end = this.range.end;
    const last = this.getLastIndex();

    if (this.isFixed()) {
      return (last - end) * this.calcSize.fixed;
    }

    return (last - end) * this.getItemSize();
  }

  getOffsetByIndex(index: number) {
    if (!index) return 0;

    let offset = 0;
    for (let i = 0; i < index; i++) {
      const size = this.sizes.get(this.options.uniqueKeys[i]);
      offset = offset + (typeof size === 'number' ? size : this.getItemSize());
    }
    return offset;
  }

  getEndByStart(start: number) {
    return Math.min(start + this.options.keeps - 1, this.getLastIndex());
  }

  getLastIndex() {
    const { uniqueKeys, keeps } = this.options;
    return uniqueKeys.length > 0 ? uniqueKeys.length - 1 : keeps - 1;
  }

  getItemSize() {
    return this.isFixed() ? this.calcSize.fixed : this.calcSize.average || this.options.size;
  }

  getScrollStartOffset() {
    let offset = this.calcSize.header || 0;

    if (this.useWindowScroll && this.options.wrapper) {
      let el = this.options.wrapper;
      do {
        offset += el[offsetType[this.options.direction]];
      } while ((el = el.offsetParent) && el !== this.options.wrapper.ownerDocument);
    }

    return offset;
  }

  getScrollElement(scroller) {
    if ((scroller instanceof Document && scroller.nodeType === 9) || scroller instanceof Window) {
      this.useWindowScroll = true;
      return document.scrollingElement || document.documentElement || document.body;
    }

    this.useWindowScroll = false;

    return scroller;
  }
}

export default Virtual;

export interface VirtualOptions {
  size?: number;
  keeps: number;
  buffer: number;
  uniqueKeys: any[];
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

const DIRECTION = {
  FRONT: 'FRONT',
  BEHIND: 'BEHIND',
};

const LEADING_BUFFER = 2;

class Virtual {
  options: VirtualOptions;
  callback: Function;
  sizes: Map<any, number>;
  calcType: string;
  calcSize: CalcSize;
  range: Range;
  direction: string;
  offset: number;
  constructor(options: VirtualOptions, callback: Function) {
    this.options = { ...options };
    this.callback = callback;

    this.sizes = new Map();

    this.calcType = CACLTYPE.INIT;
    this.calcSize = Object.create(null);

    this.direction = '';
    this.offset = 0;

    this.range = Object.create(null);

    if (options) {
      this.checkIfUpdate(0, options.keeps - 1);
    }
  }

  isFront() {
    return this.direction === DIRECTION.FRONT;
  }

  isBehind() {
    return this.direction === DIRECTION.BEHIND;
  }

  isFixed() {
    return this.calcType === CACLTYPE.FIXED;
  }

  updateOptions(key, value) {
    if (this.options && key in this.options) {
      if (key === 'uniqueKeys') {
        this.sizes.forEach((v, k) => {
          if (!value.includes(k)) {
            this.sizes.delete(k);
          }
        });
      }
      this.options[key] = value;
    }
  }

  updateRange() {
    let start = this.range.start;
    if (this.isFront()) {
      start -= LEADING_BUFFER;
    } else if (this.isBehind()) {
      start += LEADING_BUFFER;
    }
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

  handleScroll(offset: number) {
    this.direction = offset < this.offset ? DIRECTION.FRONT : DIRECTION.BEHIND;
    this.offset = offset;

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
    const offset = this.offset - (this.calcSize.header || 0);

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
    this.callback({ ...this.range });
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
    let offset = this.calcSize.header || 0;
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
}

export default Virtual;

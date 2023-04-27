export class Range {
  start: number;
  end: number;
  front: number;
  behind: number;
  constructor(options: any = {}) {
    this.start = options.start || 0;
    this.end = options.end || 0;
    this.front = options.front || 0;
    this.behind = options.behind || 0;
  }
}

export interface VirtualOptions {
  size: number;
  keeps: number;
  uniqueKeys: any[];
  isHorizontal: boolean;
}

export class CalcSize {
  average: number;
  total: number;
  fixed: number;
  header: number;
  footer: number;
  constructor() {
    this.average = 0;
    this.total = 0;
    this.fixed = 0;
    this.header = 0;
    this.footer = 0;
  }
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
  isHorizontal: boolean;
  calcIndex: number;
  calcType: string;
  calcSize: CalcSize;
  range: Range;
  direction: string;
  offset: number;

  constructor(options: VirtualOptions, callback: Function) {
    this.options = { ...options };
    this.callback = callback;

    this.sizes = new Map();
    this.isHorizontal = options.isHorizontal;

    this.calcIndex = 0;
    this.calcType = CACLTYPE.INIT;
    this.calcSize = new CalcSize();

    this.direction = '';
    this.offset = 0;

    this.range = Object.create(null);
    if (options) this.checkIfUpdate(0, options.keeps - 1);
  }

  updateUniqueKeys(value: any) {
    this.options.uniqueKeys = value;
  }

  updateSizes(uniqueKeys: any) {
    this.sizes.forEach((v, k) => {
      if (!uniqueKeys.includes(k)) this.sizes.delete(k);
    });
  }

  updateRange() {
    // check if need to update until loaded enough list item
    let start = this.range.start;
    if (this.isFront()) {
      start -= LEADING_BUFFER;
    } else if (this.isBehind()) {
      start += LEADING_BUFFER;
    }
    start = Math.max(start, 0);
    const length = Math.min(this.options.keeps, this.options.uniqueKeys.length);

    if (this.sizes.size >= length - LEADING_BUFFER) {
      this.handleUpdate(start, this.getEndByStart(start));
    } else {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(() => this.updateRange());
      } else {
        setTimeout(() => this.updateRange(), 3);
      }
    }
  }

  handleScroll(offset: number) {
    this.direction = offset < this.offset ? DIRECTION.FRONT : DIRECTION.BEHIND;
    this.offset = offset;

    const scrolls = this.getScrollItems(offset);

    if (this.isFront()) {
      this.handleScrollFront(scrolls);
    } else if (this.isBehind()) {
      this.handleScrollBehind(scrolls);
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

  getScrollItems(offset: number) {
    const { fixed, header } = this.calcSize;
    if (header) offset -= header;
    if (offset <= 0) return 0;
    if (this.isFixed()) return Math.floor(offset / fixed);

    let low = 0,
      high = this.options.uniqueKeys.length;
    let middle = 0,
      middleOffset = 0;
    while (low <= high) {
      middle = low + Math.floor((high - low) / 2);
      middleOffset = this.getOffsetByIndex(middle);
      if (middleOffset === offset) return middle;
      else if (middleOffset < offset) low = middle + 1;
      else if (middleOffset > offset) high = middle - 1;
    }
    return low > 0 ? --low : 0;
  }

  handleScrollFront(scrolls: number) {
    if (scrolls > this.range.start) return;
    const start = Math.max(scrolls - Math.round(this.options.keeps / 3), 0);
    this.checkIfUpdate(start, this.getEndByStart(start));
  }

  handleScrollBehind(scrolls: number) {
    if (scrolls < this.range.start + Math.round(this.options.keeps / 3)) return;
    this.checkIfUpdate(scrolls, this.getEndByStart(scrolls));
  }

  checkIfUpdate(start: number, end: number) {
    const { uniqueKeys, keeps } = this.options;
    if (uniqueKeys.length <= keeps) {
      start = 0;
      end = uniqueKeys.length - 1;
    } else if (end - start < keeps - 1) {
      start = end - keeps + 1;
    }
    if (this.range.start !== start) this.handleUpdate(start, end);
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
    const last = this.getLastIndex();
    if (this.isFixed()) {
      return (last - this.range.end) * this.calcSize.fixed;
    }
    if (this.calcIndex === last) {
      return (
        this.getOffsetByIndex(last) - this.getOffsetByIndex(this.range.end)
      );
    }
    return (last - this.range.end) * this.getItemSize();
  }

  getOffsetByIndex(index: number) {
    if (!index) return 0;
    let offset = 0;
    for (let i = 0; i < index; i++) {
      const size = this.sizes.get(this.options.uniqueKeys[i]);
      offset = offset + (typeof size === 'number' ? size : this.getItemSize());
    }
    this.calcIndex = Math.max(this.calcIndex, index - 1);
    this.calcIndex = Math.min(this.calcIndex, this.getLastIndex());
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
    return this.isFixed()
      ? this.calcSize.fixed
      : this.calcSize.average || this.options.size;
  }

  handleItemSizeChange(key: string | number, size: number) {
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

  handleHeaderSizeChange(size: number) {
    this.calcSize.header = size;
  }

  handleFooterSizeChange(size: number) {
    this.calcSize.footer = size;
  }
}

export default Virtual;

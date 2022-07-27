// scroll range
export class Range {
  start: number;
  end: number;
  front: number;
  behind: number;
  constructor(options: any = {}) {
    this.start = options.start || 0
    this.end = options.end || 0
    this.front = options.front || 0
    this.behind = options.behind || 0
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
    this.average = 0 // 计算首次加载每一项的评价高度
    this.total = 0 // 首次加载的总高度
    this.fixed = 0 // 记录固定高度值
    this.header = 0 // 顶部插槽高度
    this.footer = 0 // 底部插槽高度
  }
}

const CACLTYPE = {
  INIT: 'INIT',
  FIXED: 'FIXED',
  DYNAMIC: 'DYNAMIC'
}

const DIRECTION = {
  FRONT: 'FRONT',
  BEHIND: 'BEHIND'
}

class Virtual {
  options: VirtualOptions;
  callback: Function;

  sizes: Map<any, number>; // 用于存储列表项的高度
  isHorizontal: boolean; // 是否为横向滚动

  calcIndex: number; // 记录上次计算的index
  calcType: string; // 记录列表项高度是动态还是静态
  calcSize: CalcSize;

  range: Range;

  direction: string; // 滚动方向
  offset: number; // 记录滚动距离

  constructor(options: VirtualOptions, callback: Function) {
    this.options = { ...options }
    this.callback = callback

    this.sizes = new Map()
    this.isHorizontal = options.isHorizontal

    this.calcIndex = 0
    this.calcType = CACLTYPE.INIT
    this.calcSize = new CalcSize

    this.direction = ''
    this.offset = 0

    this.range = Object.create(null)
    if (options) this.checkIfUpdate(0, options.keeps - 1)
  }

  // --------------------------- update ------------------------------
  updateUniqueKeys(value: any) {
    this.options.uniqueKeys = value
  }

  // 更新 sizes，删除不在当前列表中的数据
  updateSizes(uniqueKeys: any) {
    this.sizes.forEach((v, k) => {
      if (!uniqueKeys.includes(k)) this.sizes.delete(k)
    })
  }

  updateRange() {
    // check if need to update until loaded enough list item
    const start = Math.max(this.range.start, 0)
    const length = Math.min(this.options.keeps, this.options.uniqueKeys.length)
    if (this.sizes.size >= length - 2) {
      this.handleUpdate(start, this.getEndByStart(start))
    } else {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(() => this.updateRange())
      } else {
        setTimeout(() => this.updateRange(), 3)
      }
    }
  }

  // --------------------------- scroll ------------------------------
  // 滚动事件
  handleScroll(offset: number) {
    this.direction = offset < this.offset ? DIRECTION.FRONT : DIRECTION.BEHIND
    this.offset = offset

    const scrolls = this.getScrollItems(offset)

    if (this.isFront()) {
      this.handleScrollFront(scrolls)
    } else if (this.isBehind()) {
      this.handleScrollBehind(scrolls)
    }
  }

  isFront() {
    return this.direction === DIRECTION.FRONT
  }

  isBehind() {
    return this.direction === DIRECTION.BEHIND
  }

  isFixed() {
    return this.calcType === CACLTYPE.FIXED
  }

  getScrollItems(offset: number) {
    const { fixed, header } = this.calcSize
    // 减去顶部插槽高度
    if (header) offset -= header
    if (offset <= 0) return 0
    // 固定高度
    if (this.isFixed()) return Math.floor(offset / fixed)
    // 非固定高度使用二分查找
    let low = 0, high = this.options.uniqueKeys.length
    let middle = 0, middleOffset = 0
    while (low <= high) {
      middle = low + Math.floor((high - low) / 2)
      middleOffset = this.getOffsetByIndex(middle)
      if (middleOffset === offset) return middle
      else if (middleOffset < offset) low = middle + 1
      else if (middleOffset > offset) high = middle - 1
    }
    return low > 0 ? --low : 0
  }

  handleScrollFront(scrolls: number) {
    if (scrolls > this.range.start) return
    const start = Math.max(scrolls - Math.round(this.options.keeps / 3), 0)
    this.checkIfUpdate(start, this.getEndByStart(start))
  }

  handleScrollBehind(scrolls: number) {
    if (scrolls < this.range.start + Math.round(this.options.keeps / 3)) return
    this.checkIfUpdate(scrolls, this.getEndByStart(scrolls))
  }

  checkIfUpdate(start: number, end: number) {
    const { uniqueKeys, keeps } = this.options
    if (uniqueKeys.length <= keeps) {
      start = 0
      end = uniqueKeys.length - 1
    } else if (end - start < keeps - 1) {
      start = end - keeps + 1
    }
    if (this.range.start !== start) this.handleUpdate(start, end)
  }

  handleUpdate(start: number, end: number) {
    this.range.start = start
    this.range.end = end
    this.range.front = this.getFrontOffset()
    this.range.behind = this.getBehindOffset()
    this.callback({ ...this.range })
  }

  getFrontOffset() {
    if (this.isFixed()) {
      return this.calcSize.fixed * this.range.start
    } else {
      return this.getOffsetByIndex(this.range.start)
    }
  }

  getBehindOffset() {
    const last = this.getLastIndex()
    if (this.isFixed()) {
      return (last - this.range.end) * this.calcSize.fixed
    }
    if (this.calcIndex === last) {
      return this.getOffsetByIndex(last) - this.getOffsetByIndex(this.range.end)
    }
    return (last - this.range.end) * this.getItemSize()
  }

  getOffsetByIndex(index: number) {
    if (!index) return 0
    let offset = 0
    for (let i = 0; i < index; i++) {
      const size = this.sizes.get(this.options.uniqueKeys[i])
      offset = offset + (typeof size === 'number' ? size : this.getItemSize())
    }
    this.calcIndex = Math.max(this.calcIndex, index - 1)
    this.calcIndex = Math.min(this.calcIndex, this.getLastIndex())
    return offset
  }

  getEndByStart(start: number) {
    return Math.min(start + this.options.keeps - 1, this.getLastIndex())
  }

  getLastIndex() {
    const { uniqueKeys, keeps } = this.options
    return uniqueKeys.length > 0 ? uniqueKeys.length - 1 : keeps - 1
  }

  // --------------------------- size ------------------------------
  // 获取列表项的高度
  getItemSize() {
    return this.isFixed() ? this.calcSize.fixed : (this.calcSize.average || this.options.size)
  }

  // 列表项高度变化
  handleItemSizeChange(id: any, size: number) {
    this.sizes.set(id, size)

    // 'INIT' 状态表示每一项的高度都相同
    if (this.calcType === CACLTYPE.INIT) {
      this.calcType = CACLTYPE.FIXED // 固定高度
      this.calcSize.fixed = size
    } else if (this.isFixed() && this.calcSize.fixed !== size) {
      // 如果当前为 'FIXED' 状态并且 size 与固定高度不同，表示当前高度不固定，fixed值也就不需要了
      this.calcType = CACLTYPE.DYNAMIC
      this.calcSize.fixed = 0
    }
    // 非固定高度的情况下，计算平均高度与总高度
    if (this.calcType !== CACLTYPE.FIXED) {
      this.calcSize.total = [...this.sizes.values()].reduce((t, i) => t + i, 0)
      this.calcSize.average = Math.round(this.calcSize.total / this.sizes.size)
    }
  }
  
  // header 插槽高度变化
  handleHeaderSizeChange(size: number) {
    this.calcSize.header = size
  }

  // footer 插槽高度变化
  handleFooterSizeChange(size: number) {
    this.calcSize.footer = size
  }
}

export default Virtual
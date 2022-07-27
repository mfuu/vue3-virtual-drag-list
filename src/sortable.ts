import SortableDnd from 'sortable-dnd'

export interface SortableOptions {
  getKey: Function;
  scrollEl: HTMLElement | null;
  dataSource: any[];
  disabled: boolean;
  draggable: string | Function | undefined;
  ghostStyle: object;
  ghostClass: string;
  chosenClass: string;
  animation: number;
  autoScroll: boolean;
  scrollStep: number;
  scrollThreshold: number;
}

interface DragStateType {
  key: any;
  index: number;
  item: any;
}

// drag state
export class DragState {
  from: DragStateType;
  to: DragStateType;
  constructor() {
    this.from = { key: undefined, item: undefined, index: -1 }
    this.to = { key: undefined, item: undefined, index: -1 }
  }
}

class Sortable {
  onDrag: Function;
  onDrop: Function;
  dragState: DragState;
  dragElement?: HTMLElement | null;
  drag: SortableDnd;
  options: SortableOptions;
  dataSource: any[];
  cloneList: any[];
  rangeIsChanged: boolean;

  constructor(options: SortableOptions, onDrag:Function, onDrop: Function) {
    this.options = options
    this.onDrag = onDrag
    this.onDrop = onDrop

    this.dataSource = options.dataSource
    this.cloneList = new Array()
    this.dragState = new DragState
    this.rangeIsChanged = false

    if (!options.scrollEl) return
    this.init()
  }

  set(key: any, value: any) {
    this[key] = value
    // When the list data changes when dragging, need to execute onDrag function
    if (key === 'dataSource' && this.dragElement) this.dragStart(this.dragElement, false)
  }

  setOption(key: any, value: any) {
    this.options[key] = value
    this.drag.set(key, value)
  }

  init() {
    const {
      disabled,
      draggable,
      ghostClass,
      ghostStyle,
      chosenClass,
      animation,
      autoScroll,
      scrollStep,
      scrollThreshold
    } = this.options

    this.drag = new SortableDnd(
      this.options.scrollEl,
      {
        disabled,
        draggable,
        ghostClass,
        ghostStyle,
        chosenClass,
        animation,
        autoScroll,
        scrollStep,
        scrollThreshold,
        onChange: (from: any, to: any) => this.onChange(from, to),
        onDrag: (dragEl: HTMLElement) => this.dragStart(dragEl),
        onDrop: (changed: boolean) => this.dragEnd(changed)
      }
    )
  }

  dragStart(dragEl: HTMLElement, callback: boolean = true) {
    this.dragElement = dragEl
    this.cloneList = [...this.dataSource]

    const key = dragEl.getAttribute('data-key')
    this.dataSource.forEach((item, index) => {
      if (this.options.getKey(item) == key)
        this.dragState.from = { item, index, key }
    })
    if (callback) {
      this.rangeIsChanged = false
      this.onDrag(this.dragState.from, dragEl)
    } else {
      this.rangeIsChanged = true
    }
  }

  onChange(_old_: any, _new_: any) {
    const oldKey = this.dragState.from.key
    const newKey = _new_.node.getAttribute('data-key')

    const from = { item: null, index: -1 }
    const to = { item: null, index: -1 }

    this.cloneList.forEach((el, index) => {
      const key = this.options.getKey(el)
      if (key == oldKey) Object.assign(from, { item: el, index })
      if (key == newKey) Object.assign(to, { item: el, index })
    })

    this.cloneList.splice(from.index, 1)
    this.cloneList.splice(to.index, 0, from.item)
  }

  dragEnd(changed: boolean) {
    const { getKey } = this.options
    if (this.rangeIsChanged && this.dragElement) this.dragElement.remove()

    const { from } = this.dragState
    this.cloneList.forEach((el, index) => {
      if (getKey(el) == from.key)
        this.dragState.to = { 
          index,
          key: getKey(this.dataSource[index]),
          item: this.dataSource[index]
        }
    })

    this.onDrop(this.cloneList, from, this.dragState.to, changed)

    this.dataSource = [...this.cloneList]
    this.clear()
  }

  clear() {
    this.dragElement = null
    this.rangeIsChanged = false
    this.dragState = new DragState
  }

  destroy() {
    this.drag && this.drag.destroy()
    this.drag = null
  }
}

export default Sortable
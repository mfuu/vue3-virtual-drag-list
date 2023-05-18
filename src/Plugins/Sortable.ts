import SortableDnd, { FromTo } from 'sortable-dnd';
import { Store, State } from './Storage';
import { getDataKey } from '../utils';

const attributes = [
  'group',
  'handle',
  'disabled',
  'draggable',
  'ghostClass',
  'ghostStyle',
  'chosenClass',
  'animation',
  'autoScroll',
  'scrollThreshold',
  'fallbackOnBody',
  'pressDelay',
  'pressDelayOnTouchOnly',
];

let dragEl: HTMLElement | null = null;

class Sortable {
  context: any;
  callback: Function;
  initialList: any[];
  dynamicList: any[];
  sortable: SortableDnd | null;
  rangeChanged: boolean;

  constructor(context, callback: Function) {
    this.context = context;
    this.callback = callback;

    this.initialList = [...context.list];
    this.dynamicList = [...context.list];

    this.sortable = null;
    this.rangeChanged = false;

    this._init();
  }

  destroy() {
    this.sortable && this.sortable.destroy();
    this.sortable = null;
  }

  setValue(key: string, value) {
    if (key === 'list') {
      this.initialList = [...value];
      // When the list data changes when dragging, need to execute onDrag function
      if (dragEl) this._onDrag(dragEl, false);
    } else {
      this.context[key] = value;
      if (this.sortable) this.sortable.option(key, value);
    }
  }

  _init() {
    const props = attributes.reduce((res, key) => {
      let name = key;
      if (key === 'pressDelay') name = 'delay';
      if (key === 'pressDelayOnTouchOnly') name = 'delayOnTouchOnly';
      res[name] = this.context[key];
      return res;
    }, {});

    this.sortable = new SortableDnd(this.context.container, {
      ...props,
      list: this.dynamicList,
      onDrag: ({ from }) => this._onDrag(from.node),
      onAdd: ({ from, to }) => this._onAdd(from, to),
      onRemove: ({ from, to }) => this._onRemove(from, to),
      onChange: ({ from, to }) => this._onChange(from, to),
      onDrop: ({ from, to, changed }) => this._onDrop(from, to, changed),
    });
  }

  async _onDrag(node: HTMLElement, callback = true) {
    dragEl = node;
    this.dynamicList = [...this.initialList];

    const fromList = [...this.initialList];
    const fromState = this._getFromTo({ node }, fromList);

    await Store.setValue({ from: { list: fromList, ...fromState } });

    if (callback) {
      this.rangeChanged = false;
      const store: State = await Store.getValue();
      this.context.emit('drag', { list: fromList, ...store });
    } else {
      this.rangeChanged = true;
    }
  }

  async _onAdd(from: FromTo, to: FromTo) {
    const store = await Store.getValue();
    const list = [...this.dynamicList];
    const index = this._getIndex(list, to.node.dataset.key);
    const params = { ...store.from, index };
    if (from.node === to.node) {
      // insert to end of list
      params.index = this.dynamicList.length;
      this.dynamicList.push(store.from?.item);
    } else {
      this.dynamicList.splice(index, 0, store.from?.item);
    }
    delete params.list;
    this.context.emit('add', { ...params });
  }

  async _onRemove(from: FromTo) {
    const list = [...this.dynamicList];
    const state = this._getFromTo(from, list);

    this.dynamicList.splice(state.index, 1);

    this.context.emit('remove', { ...state });
  }

  async _onChange(from: FromTo, to: FromTo) {
    const fromList = [...this.dynamicList];
    const toList = [...this.dynamicList];
    const fromState = this._getFromTo(from, fromList);
    const toState = this._getFromTo(to, toList);

    this.dynamicList.splice(fromState.index, 1);
    this.dynamicList.splice(toState.index, 0, fromState.item);
  }

  async _onDrop(from: FromTo, to: FromTo, changed) {
    if (this.rangeChanged || from.sortable !== to.sortable) {
      dragEl && dragEl.remove();
    }

    const list = [...this.dynamicList];
    const index = this._getIndex(list, from.node.dataset.key);
    const item = this.initialList[index];
    const key = getDataKey(item, this.context.dataKey);

    await Store.setValue({
      to: { list: [...this.initialList], index, item, key },
    });

    const store = await Store.getValue();
    const params = { list: list, ...store, changed };

    this.context.emit('drop', params);
    this.callback && this.callback(params);

    this.initialList = [...list];
    this._clear();
  }

  _getFromTo(fromTo, list) {
    const key = fromTo.node.dataset.key;
    const index = this._getIndex(list, key);
    const item = list[index];

    return { key, item, index };
  }

  _getIndex(list, key) {
    return list.findIndex(
      (item) => getDataKey(item, this.context.dataKey) == key
    );
  }

  _clear() {
    dragEl = null;
    Store.clear();
    this.rangeChanged = false;
  }
}

export default Sortable;

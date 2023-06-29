const storeKey = 'virtualSortableState';

type Item = {
  list: any[];
  item: any;
  key: any;
  index: number;
};

export interface State {
  from?: Item;
  to?: Item;
}

const defaultStore = { from: {}, to: {} };

class Storage {
  clear() {
    window[storeKey] = null;
  }

  /**
   * Obtaining Synchronization Data
   * @returns states: { from, to }
   */
  getStore() {
    try {
      const result = JSON.parse(window[storeKey]);
      return result || defaultStore;
    } catch (e) {
      return defaultStore;
    }
  }

  /**
   * @returns states: { from, to }
   */
  getValue() {
    return new Promise<State>((resolve, reject) => {
      try {
        const result = JSON.parse(window[storeKey]);
        resolve(result || defaultStore);
      } catch (e) {
        reject(defaultStore);
      }
    });
  }

  setValue(value: State) {
    return new Promise<string>((resolve, reject) => {
      try {
        const store = JSON.parse(window[storeKey] || '{}');
        const result = { ...store, ...value };
        window[storeKey] = JSON.stringify(result);
        resolve(result);
      } catch (e) {
        reject(defaultStore);
      }
    });
  }
}

export const Store = new Storage();

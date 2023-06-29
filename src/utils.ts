export function debounce(fn: Function, delay = 50, immediate = false) {
  let timer: any | undefined;
  let result: Function;
  const debounced = function (this: any, ...args: any) {
    if (timer) clearTimeout(timer);
    if (immediate) {
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (callNow) result = fn.apply(this, args);
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
      }, delay);
    }
    return result;
  };
  debounced.prototype.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };
  return debounced;
}

export function throttle(fn: Function, delay = 50) {
  let timer: any | undefined;
  return function (this: any, ...args: IArguments[]) {
    if (!timer) {
      timer = setTimeout(function () {
        timer = null;
        fn.apply(this, args);
      }, delay);
    }
  };
}

export function getDataKey(item, dataKey: string) {
  return (
    !Array.isArray(dataKey) ? dataKey.replace(/\[/g, '.').replace(/\]/g, '.').split('.') : dataKey
  ).reduce((o, k) => (o || {})[k], item);
}

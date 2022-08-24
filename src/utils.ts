
export function debounce(fn: Function, delay: number = 50, immediate:boolean = false){
  let timer: any | undefined
  let result: Function
  let debounced = function(...args: any){
    if(timer) clearTimeout(timer)
    if(immediate){
      let callNow = !timer
      timer = setTimeout(()=>{
        timer = null
      }, delay)
      if(callNow) result = fn.apply(this, args)
    } else{
      timer = setTimeout(()=>{
        fn.apply(this, args)
      }, delay)
    }
    return result
  }
  debounced.prototype.cancel = function(){
    clearTimeout(timer)
    timer = null
  }
  return debounced
}

export function throttle(fn: Function, delay: number) {
  let timer: any | undefined
  return function(...args: IArguments[]) {
    if(!timer) {
      timer = setTimeout(function() {
        timer = null
        fn.apply(this, args)
      }, delay)
    }
  }
}
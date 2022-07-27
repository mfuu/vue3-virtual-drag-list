
export function debounce(func: Function, delay: number = 50, immediate:boolean = false){
  let timer: any | undefined
  let result: Function
  let debounced = function(...args: any){
    if(timer) clearTimeout(timer)
    if(immediate){
      let callNow = !timer
      timer = setTimeout(()=>{
        timer = null
      }, delay)
      if(callNow) result = func.apply(this, args)
    } else{
      timer = setTimeout(()=>{
        func.apply(this, args)
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
  let timer = null
  return function() {
    const context = this, args = arguments
    if(!timer) {
      timer = setTimeout(function() {
        timer = null
        fn.apply(context, args)
      }, delay)
    }
  }
}
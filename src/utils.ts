export function isWindow(el: Window | Element): el is Window {
  return el === window;
}

export function isString(val: any): val is string {
  return typeof val === "string";
}

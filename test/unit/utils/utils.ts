import Component from "@egjs/component";
import { InfiniteGridItemInfo } from "../../../src/types";
import { toArray } from "../../../src/utils";
import { SIZES } from "./consts";

export function sandbox(obj: object | string, prop?: object): HTMLElement {
  const tmp = document.createElement("div");
  tmp.className = "_tempSandbox_";
  if (typeof obj === "string") {
    tmp.id = obj;
  } else {
    tmp.id = "sandbox";
  }

  if (typeof obj === "object" || typeof prop === "object") {
    const attrs = typeof prop === "object" ? prop : obj;
    for (const p in attrs as object) {
      if (/class|className/.test(p)) {
        tmp.setAttribute(p, attrs[p] + " _tempSandbox_");
      } else {
        tmp.setAttribute(p, attrs[p]);
      }
    }
  }
  document.body.appendChild(tmp);
  return tmp;
}

export function cleanup() {
  const elements = toArray<HTMLElement>(document.querySelectorAll("._tempSandbox_"));
  elements.forEach((v) => {
    v.parentNode!.removeChild(v);
  });
}

export function waitFor(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export function waitEvent<T = any>(component: Component<any>, eventName: string): Promise<T> {
  return new Promise((resolve) => {
    component.once(eventName, (e) => {
      resolve(e);
    });
  });
}

export function createElement(text: string) {
  const el = document.createElement("div");

  el.innerHTML = text;

  return el;
}


export function getItems(count: number): InfiniteGridItemInfo[] {
  const length = SIZES.length;
  const elements: InfiniteGridItemInfo[] = [];

  for (let i = 0; i < count; ++i) {
    const size = SIZES[i % length];
    const element = document.createElement("div");

    element.style.cssText = `position: absolute; width: ${size[0]}px; height: ${size[1]}px;`;
    elements.push({
      element,
    });
  }
  return elements;
}

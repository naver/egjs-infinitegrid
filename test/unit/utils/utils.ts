import Component from "@egjs/component";
import { toArray } from "../../../src/utils";

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

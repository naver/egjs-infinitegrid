import NativeInfiniteGrid, { InfiniteGridMethods } from "@egjs/infinitegrid";

export type ParametersType<T, R> = T extends (...params: infer U) => any ? (...params: U) => R : never;
export type InfiniteGridType<T> = {
  [key in keyof InfiniteGridMethods]:
  InfiniteGridMethods[key] extends (...params: any[]) => NativeInfiniteGrid ?
	ParametersType<InfiniteGridMethods[key], T> : InfiniteGridMethods[key]
};

const win = typeof window !== `undefined` && window || {};

export {win as window};
export const document = win.document;

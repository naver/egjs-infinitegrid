
export function decamelize(str: string) {
  return str.replace(/([a-z])([A-Z])/g, (_, letter, letter2) => `${letter}-${letter2.toLowerCase()}`);
}

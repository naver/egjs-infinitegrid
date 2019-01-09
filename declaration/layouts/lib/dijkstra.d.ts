declare function find_path(graph: (x: string) => ({
    [key: string]: number;
}), s: string, d: string): string[];
export { find_path };

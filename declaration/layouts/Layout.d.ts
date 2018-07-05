export interface Group {
	items: any[];
	outlines: {
		start: number[],
		end: number[],
	};
}


interface Layout {
	setSize(size: number): this;
	append(items: any[], outline?: number[]): Group;
	prepend(items: any[], outline?: number[]): Group;
	layout(groups: any[], outline?: number[]): this;
}

export default Layout;
export interface ILayoutOption {
	direction?: string;
	margin?: number;
};

export interface IGroup {
	groupKey?: number;
	items: Object[];
	outlines: Object;
};

export interface ILayout {
	layout(groups: IGroup[], outline: number[]);
	append(group: IGroup, outline: number[]): IGroup;
	prepend(group: IGroup, outline: number[]): IGroup;
	setViewport(width: number, height: number);
};

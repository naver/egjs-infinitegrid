
interface InfiniteGridProps {
	tag?: string,
	type?: function,
	options?: object,
	margin?: number,
	threshold?: number,
	isOverflowScroll?: bool,
	isEqualSize?: bool,
	useRecycle?: bool,
	isConstantSize?: bool,
	horizontal?: bool,
	loading?: object | bool,
	onAppend?: function,
	onPrepend?: function,
	onLayoutComplete?: function,
	onImageError?: function,
	onChange?: function,
	status?: object,
	useFit?: bool,
	[others: string]: any,
}

declare class InfiniteGrid extends React.Component<InfiniteGridProps> {
	layout(isRelayout?: boolean): this;
	resize(): this;
	setStatus(status: object, applyScrollPos?: boolean): this;
	getStatus(): object;
	clear(): this;
}
declare class GridLayout extends InfiniteGrid {}
declare class JustifiedLayout extends InfiniteGrid {}
declare class FrameLayout extends InfiniteGrid {}
declare class PackingLayout extends InfiniteGrid {}
declare class Squarelayout extends InfiniteGrid {}


export default InfiniteGrid;

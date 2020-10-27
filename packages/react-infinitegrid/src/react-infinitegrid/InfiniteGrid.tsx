import * as React from "react";
import NativeInfiniteGrid, {
	GridLayout,
	ILayout,
	categorize,
	CONTAINER_CLASSNAME,
	ItemManager,
	IItem,
	INFINITEGRID_EVENTS,
	withInfiniteGridMethods,
} from "@egjs/infinitegrid";
import { InfiniteGridProps, InfiniteGridState, InfiniteGridType } from "./types";
import LoadingBar from "./LoadingBar";
import { camelize } from "./utils";

export default class InfiniteGrid<T extends ILayout = GridLayout>
	extends React.Component<InfiniteGridProps<T>, InfiniteGridState> {
	public static defaultProps: Required<InfiniteGridProps> = {
		tag: "div",
		containerTag: "div",
		layoutType: GridLayout,
		options: {},
		layoutOptions: {},
		useFirstRender: true,
		status: null,
		loading: null,
		groupBy: (item: any, index: number) => {
			const props = item.props;

			if ("data-groupkey" in props) {
				return props["data-groupkey"];
			} else if ("groupKey" in props) {
				return props.groupKey;
			} else {
				return "";
			}
		},
		onAppend: () => { },
		onPrepend: () => { },
		onLayoutComplete: () => { },
		onImageError: () => { },
		onChange: () => { },
	};
	public state: InfiniteGridState = {
		layout: "",
		nextFunction: null,
	};
	@withInfiniteGridMethods
	private ig!: NativeInfiniteGrid;
	private wrapperRef = React.createRef<HTMLElement>();
	private containerRef = React.createRef<HTMLElement>();

	public render() {
		const props = this.props;
		const attributes = {};
		const items = this.toItems();
		const Tag = this.props.tag as any;

		for (const name in props) {
			if (name in InfiniteGrid.defaultProps) {
				continue;
			}
			attributes[name] = props[name];
		}

		let visibleChildren: React.ReactElement[] = [];
		const ig = this.ig;

		if (ig) {
			const state = this.state;
			const result = ig.beforeSync(items);
			state.layout = result === "relayout" ? result : state.layout || result;

			visibleChildren = ig.getRenderingItems().map((item: IItem) => item.jsx);
		} else {
			const groups = categorize(items);
			if (props.status) {
				const { startCursor, endCursor } = props.status._infinite;

				visibleChildren = ItemManager.pluck(
					groups.slice(startCursor, endCursor + 1),
					"items",
				).map((item: IItem) => item.jsx);
			} else if (props.useFirstRender && groups[0]) {
				visibleChildren = groups[0].items.map((item: IItem) => item.jsx);
			}
		}
		if (this.props.loading) {
			visibleChildren.push(<LoadingBar key="loadingBar" loading={this.props.loading!} />);
		}
		return <Tag {...attributes} ref={this.wrapperRef}>{this.renderContainer(visibleChildren)}</Tag>;
	}
	public componentDidUpdate() {
		const ig = this.ig;
		const state = this.state;
		const layout = state.layout;
		const nextFunction = state.nextFunction;
		const elements = this.getElements();

		this.setLoadingElement();
		ig.sync(elements);

		if (layout) {
			state.layout = "";
			ig.layout(layout === "relayout");
		}

		if (nextFunction) {
			nextFunction();
			state.nextFunction = null;
		}
	}
	public componentDidMount() {
		this.ig = new NativeInfiniteGrid(this.wrapperRef.current, {
			...this.props.options,
			renderExternal: true,
		}).on("render", ({ next }) => {
			this.setState({
				nextFunction: next,
			});
		});
		const ig = this.ig;

		INFINITEGRID_EVENTS.forEach((name: string) => {
			const eventName = camelize(`on ${name}`);
			ig.on(name, (e: any) => {
				this.props[eventName]!({ ...e, currentTarget: this });
			});
		});

		ig.setLayout(this.props.layoutType, this.props.layoutOptions);

		const elements = this.getElements();

		this.setLoadingElement();
		if (this.props.status) {
			ig.setStatus(this.props.status, true, elements);
		} else {
			ig.beforeSync(this.toItems());
			ig.layout(true);
		}
	}
	public componentWillUnmount() {
		this.ig.destroy();
	}
	public isLoading() {
		return this.ig.isLoading();
	}
	private renderContainer(children: React.ReactElement[]) {
		const props = this.props;
		const { isOverflowScroll } = props.options;

		if (!isOverflowScroll) {
			return children;
		}
		const ContainerTag = props.containerTag as any;

		return <ContainerTag className={CONTAINER_CLASSNAME} ref={this.containerRef}>
			{children}
		</ContainerTag>;
	}
	private toItems() {
		const {
			children,
			groupBy,
		} = this.props;
		const reactChildren = React.Children.toArray(children);
		return reactChildren.map((child: React.ReactElement, i) => {
			const groupKey = groupBy(child, i);
			const itemKey = child.key;

			return { groupKey, itemKey, jsx: child };
		});
	}
	private getElements(): HTMLElement[] {
		const elements = [].slice.call((this.containerRef.current || this.wrapperRef.current).children);

		if (this.props.loading) {
			return elements.slice(0, -1);
		}
		return elements;
	}
	private setLoadingElement() {
		const ig = this.ig;

		if (this.props.loading) {
			const loadingElement = (this.containerRef.current || this.wrapperRef.current).lastElementChild as HTMLElement;

			if (loadingElement) {
				ig.setLoadingBar({
					append: loadingElement,
					prepend: loadingElement,
				});
				return;
			}
		}
		ig.setLoadingBar();
	}
}

export default interface InfiniteGrid extends InfiniteGridType<InfiniteGrid> { }

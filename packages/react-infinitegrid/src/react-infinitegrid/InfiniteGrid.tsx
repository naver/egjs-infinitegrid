import * as React from "react";
import NativeInfiniteGrid, {
	GridLayout,
	ILayout,
	IInfiniteGridGroup,
	categorize,
	CONTAINER_CLASSNAME,
	ItemManager,
	InfiniteGridMethods,
} from "@egjs/infinitegrid";
import { findDOMNode } from "react-dom";
import { InfiniteGridProps } from "./types";
import LoadingBar from "./LoadingBar";

export default class InfiniteGrid<T extends ILayout = GridLayout> extends React.Component<InfiniteGridProps<T>, {
	groups: IInfiniteGridGroup[],
	layout: string;
}> {
	public static defaultProps: Required<InfiniteGridProps> = {
		tag: "div",
		containerTag: "div",
		layoutType: GridLayout,
		options: {},
		layoutOptions: {},
		isFirstRender: true,
		status: null,
		loading: null,
		onAppend: () => { },
		onPrepend: () => { },
		onLayoutComplete: () => { },
		onImageError: () => { },
		onChange: () => { },
	};
	public state = {
		groups: [],
		layout: "",
	};
	private ig!: NativeInfiniteGrid;
	private wrapperElement!: HTMLElement;
	private containerElement!: HTMLElement;

	public render() {
		const props = this.props;
		const attributes = {};
		const children = React.Children.toArray(props.children) as React.ReactElement[];
		const items = this.toItems(children);
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

			visibleChildren = ig.getRenderingItems(state.groups).map(item => item.jsx);

			if (this.props.loading && ig.isLoading()) {
				visibleChildren.push(<LoadingBar key="loadingBar" loading={this.props.loading!} />);
			}
		} else {
			const groups = categorize(items);
			if (props.status) {
				const { startCursor, endCursor } = props.status._infinite;

				visibleChildren = ItemManager.pluck(groups.slice(startCursor, endCursor + 1), "items").map(item => item.jsx);
			} else if (props.isFirstRender && groups[0]) {
				visibleChildren = groups[0].items.map(item => item.jsx);
			}
		}
		return <Tag {...attributes}>{this.renderContainer(visibleChildren)}</Tag>;
	}
	public componentDidUpdate() {
		const ig = this.ig;
		const state = this.state;
		const layout = state.layout;
		const elements = this.getElements();

		if (this.props.loading && ig.isLoading()) {
			const loadingElement = elements.splice(elements.length - 1, 1)[0];

			ig.setLoadingBar({
				append: loadingElement,
				prepend: loadingElement,
			});
		}
		ig.sync(elements, state.groups);

		if (layout) {
			state.layout = "";
			ig.layout(layout === "relayout");
		}
	}
	public componentDidMount() {
		this.wrapperElement = findDOMNode(this) as HTMLElement;

		this.ig = new NativeInfiniteGrid(this.wrapperElement, {
			...this.props.options,
			renderExternal: true,
		}).on("render", ({ next, requestGroups }) => {
			if (requestGroups) {
				this.setState({
					groups: requestGroups,
				}, () => {
					next();
				});
			} else {
				this.forceUpdate(() => {
					next();
				})
			}
		}).on("append", e => {
			this.props.onAppend!({ ...e, currentTarget: this });
		}).on("prepend", e => {
			this.props.onPrepend!({ ...e, currentTarget: this });
		}).on("imageError", e => {
			this.props.onImageError!({ ...e, currentTarget: this });
		}).on("change", e => {
			this.props.onChange!({ ...e, currentTarget: this });
		}).on("layoutComplete", e => {
			this.props.onLayoutComplete!({ ...e, currentTarget: this });
		});

		const ig = this.ig;


		ig.setLayout(this.props.layoutType, this.props.layoutOptions);

		const elements = this.getElements();

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
		const { isOverflowScroll } = props;

		if (!isOverflowScroll) {
			return children;
		}
		const ContainerTag = props.containerTag as any;

		return <ContainerTag className={CONTAINER_CLASSNAME} ref={e => {
			e && (this.containerElement = e);
		}}>
			{children}
		</ContainerTag>;
	}
	private getElements(): HTMLElement[] {
		return [].slice.call((this.containerElement || this.wrapperElement).children);
	}
	private toItems(children = React.Children.toArray(this.props.children)) {
		return children.map((child: React.ReactElement, i) => {
			const groupKey = child.props["data-groupkey"] || child.props["groupKey"] || "";
			const itemKey = child.key;

			return { groupKey, itemKey, jsx: child };
		})
	}
}

export default interface InfiniteGrid extends InfiniteGridMethods { }
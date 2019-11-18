import NativeInfiniteGrid, {
	GridLayout,
	ILayout,
	categorize,
	ItemManager,
	IItem,
	IInfiniteGridOptions,
	IInfiniteGridStatus,
	CONTAINER_CLASSNAME,
	INFINITEGRID_EVENTS,
	withInfiniteGridMethods
} from "@egjs/infinitegrid";
import { Component, Vue, Prop } from "vue-property-decorator";
import { InfiniteGridType } from "./types";
import { VNode, VNodeData, CreateElement } from "vue";
import { LOADING_COMPONENT_NAME } from "./constants";

@Component({})
export default class InfiniteGrid<T extends ILayout = GridLayout> extends Vue {
	// Tag of wrapper element
	@Prop({ type: String, default: "div", required: false }) tag!: string;
	// Tag of container element ( wrapper > container )
	@Prop({ type: String, default: "div", required: false }) containerTag!: string;
	@Prop({ type: Boolean, default: false, required: false }) useFirstRender!: boolean;
	@Prop({ type: Object, default: null, required: false }) status!: IInfiniteGridStatus | null;
	@Prop({ type: Object, default: () => ({}), required: false }) options!: Partial<IInfiniteGridOptions>;
	@Prop({ type: Object, default: () => ({}), required: false }) layoutOptions!: Partial<T["options"]>;
	@Prop({ type: Function, default: GridLayout, required: false }) layoutType!: ILayout;
	// Data of wrapper element
	@Prop({ type: Object, default: () => ({}), required: false }) wrapperData!: VNodeData;
	@Prop({ type: Function, default: (item: VNode, index: number) => {
		const attrs = item.data && item.data.attrs;
		const props = item.data && item.data.props;

		// For DOM elements
		if (attrs) {
			if ("data-groupkey" in attrs) {
				return attrs["data-groupkey"];
			} else if ("groupKey" in attrs) {
				return attrs.groupKey;
			}
		}
		// For components
		if (props) {
			if ("data-groupkey" in props) {
				return props["data-groupkey"];
			} else if ("groupKey" in props) {
				return props.groupKey;
			}
		}

		return "";
	}}) groupBy!: (item: any, index: number) => number | string;

	@withInfiniteGridMethods
	private $_nativeInfiniteGrid!: NativeInfiniteGrid;
	private $_wrapperElement!: HTMLElement;
	private $_layout!: string;

	public mounted(): void {
		const wrapperElement = this.$el as HTMLElement;
		this.$_nativeInfiniteGrid = new NativeInfiniteGrid(wrapperElement, {
			...this.options,
			renderExternal: true,
		});
		this.$_wrapperElement = wrapperElement;
		this.$_layout = "";

		this.$_bindEvents();

		const nativeIG = this.$_nativeInfiniteGrid;
		nativeIG.setLayout(this.layoutType, this.layoutOptions);

		if (this.status) {
			nativeIG.setStatus(this.status, true, this.$_getElements());
		} else {
			nativeIG.beforeSync(this.$_toItems().filter(val => !val.isLoading));
			nativeIG.layout(true);
		}
	}

	public updated(): void {
		const nativeIG = this.$_nativeInfiniteGrid;
		const layout = this.$_layout;
		const elements = this.$_getElements();

		if (this.$slots.default) {
			const loading = this.$slots.default
				.map((child, index) => ({
					child: child as any,
					index,
				}))
				.filter(({ child }) => child.fnOptions && child.fnOptions.name === "Loading")[0];
			if (loading && nativeIG.isLoading()) {
				const loadingElement = elements.splice(elements.length - 1, 1)[0];

				nativeIG.setLoadingBar({
					append: loadingElement,
					prepend: loadingElement,
				});
			}
		}

		nativeIG.sync(elements);

		if (layout) {
			this.$_layout = "";
			nativeIG.layout(layout === "relayout");
		}
	}

	public render(h: CreateElement) {
		const nativeIG = this.$_nativeInfiniteGrid;
		const items = this.$_toItems();

		let visibleChildren: VNode[] = [];
		if (nativeIG) {
			const result = nativeIG.beforeSync(items.filter(val => !val.isLoading));
			this.$_layout = result === "relayout"
				? result
				: (this.$_layout || result);

			visibleChildren = nativeIG.getRenderingItems().map(item => item.vnode);
			if (nativeIG.isLoading()) {
				visibleChildren.push(...items.filter(val => val.isLoading).map(val => val.vnode));
			}
		} else {
			const groups = categorize(items);
			if (this.status) {
				const { startCursor, endCursor } = this.status._infinite;

				visibleChildren = ItemManager.pluck(
					groups.slice(startCursor, endCursor + 1),
					"items",
				).map((item: IItem) => item.vnode);
			} else if (this.useFirstRender && groups[0]) {
				visibleChildren = groups[0].items.map((item: IItem) => item.vnode);
			}
		}

		// To bypass
		// [Vue warn]: Avoid using observed data object as vnode data: {}
		const wrapperData = {};
		for (const key in this.wrapperData) {
			wrapperData[key] = this.wrapperData[key];
		}

		return h(this.tag, wrapperData, this.$_getContainer(visibleChildren, h));
	}

	public beforeDestroy() {
		this.$_nativeInfiniteGrid.destroy();
	}

	public isLoading(): boolean {
		return this.$_nativeInfiniteGrid.isLoading();
	}

	private $_bindEvents(): void {
		const nativeIG = this.$_nativeInfiniteGrid;

		INFINITEGRID_EVENTS.forEach(eventName => {
			nativeIG.on(eventName, e => {
				e.currentTarget = this;
				// Make events from camelCase to kebab-case
				this.$emit(eventName.replace(/([A-Z])/g, "-$1").toLowerCase(), e);
			});
		});

		nativeIG.on("render", ({ next }) => {
			this.$forceUpdate();
			this.$nextTick(() => {
				next();
			});
		});
	}

	private $_getContainer(children: VNode[], h: CreateElement): VNode[] {
		const isOverflowScroll = this.options.isOverflowScroll;

		if (!isOverflowScroll) {
			return children;
		}

		const containerData: VNodeData = {
			class: {
				[CONTAINER_CLASSNAME]: true,
			},
			ref: CONTAINER_CLASSNAME,
		};

		return [h(this.containerTag, containerData, children)];
	}

	private $_getElements(): HTMLElement[] {
		const container = this.$refs && this.$refs[CONTAINER_CLASSNAME] as HTMLElement;

		return [].slice.call((container || this.$_wrapperElement).children);
	}

	private $_toItems(): IItem[] {
		const items = this.$slots.default;
		if (!items) {
			return [];
		}

		return items.map((child: VNode, index: number) => {
			const groupKey = this.groupBy(child, index) || "";
			const itemKey = child.key != null
				? child.key
				: `${child.tag}-${index}`;

			return {
				groupKey,
				itemKey,
				vnode: child,
				isLoading: (child as any).fnOptions
					&& (child as any).fnOptions.name === LOADING_COMPONENT_NAME,
			};
		});
	}
}

export default interface InfiniteGrid extends InfiniteGridType<InfiniteGrid> {}

import NativeInfiniteGrid, {
	GridLayout,
	ILayout,
	categorize,
	ItemManager,
	IItem,
	IInfiniteGridOptions,
	IInfiniteGridStatus,
	CONTAINER_CLASSNAME,
	INFINITEGRID_EVENTS
} from "@egjs/infinitegrid";
import { Component, Vue, Prop } from "vue-property-decorator";
import { InfiniteGridType } from "./types";
import { VNode, VNodeData, CreateElement } from "vue";

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
	@Prop({ type: Object, default: null, required: false }) loading!: VNode | null;
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
	}})

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
		nativeIG.setLayout(this.layoutType);

		if (this.status) {
			nativeIG.setStatus(this.status, true, this.$_getElements());
		} else {
			nativeIG.beforeSync(this.$_toItems());
			nativeIG.layout(true);
		}
	}

	public updated(): void {
		const nativeIG = this.$_nativeInfiniteGrid;
		const layout = this.$_layout;
		const elements = this.$_getElements();

		if (this.loading && nativeIG.isLoading()) {
			const loadingElement = elements.splice(elements.length - 1, 1)[0];

			nativeIG.setLoadingBar({
				append: loadingElement,
				prepend: loadingElement,
			});
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
			const result = nativeIG.beforeSync(items);
			this.$_layout = result === "relayout"
				? result
				: (this.$_layout || result);

			visibleChildren = nativeIG.getRenderingItems().map(item => item.vnode);

			if (this.loading && nativeIG.isLoading()) {
				this.loading.key = "loadingBar";
				visibleChildren.push(this.loading);
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
		return h(this.tag, this.wrapperData, this.$_getContainer(visibleChildren, h));
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
		const container = this.$refs[CONTAINER_CLASSNAME] as HTMLElement;

		return [].slice.call((container || this.$_wrapperElement).children);
	}

	private $_toItems(): IItem[] {
		if (!this.$slots.default) {
			return [];
		}
		return this.$slots.default.map((child: VNode, index: number) => {
			const groupKey = (child.data && (child.data["data-groupkey"] || child.data["groupKey"])) || "";
			const itemKey = child.key || `${child.tag}-${index}`;

			return {
				groupKey,
				itemKey,
				vnode: child,
			};
		});
	}
}

export default interface InfiniteGrid extends InfiniteGridType<InfiniteGrid> {}

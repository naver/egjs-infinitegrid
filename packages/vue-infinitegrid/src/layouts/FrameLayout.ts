import { FrameLayout as LayoutType, ILayout } from "@egjs/infinitegrid";
import InfiniteGrid from "../InfiniteGrid";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class FrameLayout extends InfiniteGrid<LayoutType> {
	@Prop({ type: Function, default: LayoutType, required: false }) layoutType!: ILayout;
}

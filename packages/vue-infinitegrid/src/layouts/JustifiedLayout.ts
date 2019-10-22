import { JustifiedLayout as LayoutType, ILayout } from "@egjs/infinitegrid";
import InfiniteGrid from "../InfiniteGrid";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class JustifiedLayout extends InfiniteGrid<LayoutType> {
	@Prop({ type: Function, default: LayoutType, required: false }) layoutType!: ILayout;
}

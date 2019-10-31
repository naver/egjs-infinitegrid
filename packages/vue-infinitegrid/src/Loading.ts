import { CreateElement, RenderContext } from "vue";
import { LOADING_COMPONENT_NAME } from "./constants";

export default {
	name: LOADING_COMPONENT_NAME,
	functional: true,
	render(createElement: CreateElement, context: RenderContext) {
		return context.children;
	},
};

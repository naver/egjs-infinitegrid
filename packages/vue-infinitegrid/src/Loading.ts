import { CreateElement, RenderContext } from "vue";

export default {
	functional: true,
	render(createElement: CreateElement, context: RenderContext) {
		return context.children;
	},
};

import "@testing-library/jest-dom/extend-expect";
import {render} from "@testing-library/svelte";
import App from "../../src/demo/App.svelte";
import useFirstRender from "../../src/demo/useFirstRender.svelte";

describe("test svelte-infinitegrid", () => {
	it("should check if the demo works", () => {
		// Given, When
		render(App);

		// Then
		// If it works, no error occurs.
		expect(true).toBe(true);
	});
	it("should check if useFirstRender demo works", () => {
		// Given, When
		render(useFirstRender);

		// Then
		// If it works, no error occurs.
		expect(true).toBe(true);
	});
});

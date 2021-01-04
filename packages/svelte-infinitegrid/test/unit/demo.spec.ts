import "@testing-library/jest-dom/extend-expect";
import {render} from "@testing-library/svelte";
import App from "../../src/demo/App.svelte";

describe("test svelte-infinitegrid", () => {
	it("should check if the demo works", () => {
		// Given, When
		render(App);

		// Then
		// If it works, no error occurs.
		expect(true).toBe(true);
	});
});

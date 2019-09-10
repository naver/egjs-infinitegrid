import {ItemManager} from "../../../src/index";
// import {utils} from "../../src/utils";
// import {} from "../../src/utils";
/* eslint-disable */
export function getItems(count) {
	const items = [];
	const size = [100, 200, 300];

	for (let i = 0; i < count; i++) {
		items.push(`<li class="item" style="box-sizing: border-box;border:1px solid #333; margin:0px;padding:0;width:${size[i % 3]}px; height:${size[(i + 1) % 3]}px;"><div>test ${i}</div></li>`);
	}
	return items;
}

export function makeItems(items, isAppend, groupKey) {
	return ItemManager.from(items,  "*", {
		isAppend,
		groupKey,
	});
}
export function makeGroup(items, isAppend, groupKey) {
	return {
		groupKey,
		items: makeItems(items, isAppend, groupKey),
		outlines: {start: [], end: []},
	};
}
export async function insert(instance, isAppend, count = 30, retry = 1, time = 100) {
	const method = isAppend ? "append" : "prepend";

	for (let i = 1; i <= retry; ++i) {
		instance[method](getItems(count), i);
	}
	await wait(time);
}
export function insertCallback(instance, isAppend, callback, count = 30, retry = 1) {
	let idx = 1;
	// const oldHandler = instance.callback.layoutComplete;
	const method = isAppend ? "append" : "prepend";
	const layoutHandler = sinon.spy(function(e) {
		// oldHandler && oldHandler(e);
		// Then: check layout property
		checkLayoutComplete(layoutHandler, {
			isAppend,
			count,
			isTrusted: false
		});

		if (idx <= retry) {
			instance[method](getItems(count), idx++);
		} else {
			instance.off("layoutComplete");
			// instance.callback.layoutComplete = oldHandler;
			callback();
		}
	});
	instance.on("layoutComplete", layoutHandler);
	instance[method](getItems(count), idx++);
	return layoutHandler;
}
export function wait(time = 100) {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve();
		}, time);
	});
}
export function waitInsert(instance, isAppend, count, retry) {
	return new Promise(resolve => {
		let handler;

		handler = insertCallback(instance, isAppend, () => {resolve(handler)}, count, retry);
	});
}
export function waitEvent(instance, eventName) {
	return new Promise(resolve => {
		const event = e => {
			instance.off(eventName, event);
			resolve(e);
		};
		instance.on(eventName, event);
	});
}
// check layout properties
export function checkLayoutComplete(handler, {count, isAppend, isTrusted}) {
	for (let i = 0, len = handler.callCount; i < len; i++) {
		const param = handler.getCall(i).args[0];

		expect(param.target.length).to.be.equal(count);
		expect(param.isAppend).to.be.equal(isAppend);
		expect(param.isTrusted).to.be.equal(isTrusted);
	}
}
export function createElement(groupKey) {
  const div = document.createElement("div");

  div.setAttribute("data-groupkey", groupKey);
  return div;
}

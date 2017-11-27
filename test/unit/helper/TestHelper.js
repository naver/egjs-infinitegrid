// import {utils} from "../../src/utils";
// import {} from "../../src/utils";

export function getItems(count) {
	const items = [];
	const size = [100, 200, 300];

	for (let i = 0; i < count; i++) {
		items.push(`<li class="item" style="border:1px solid #333; margin:0px;padding:0;width:${size[Math.floor((Math.random() * 3))]}px; height:${size[Math.floor((Math.random() * 3))]}px;"><div>test ${i}</div></li>`);
	}
	return items;
}

export function insert(instance, isAppend, callback, count = 30, retry = 1) {
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
			isAppend ? instance[method](getItems(count), idx++) : 
				setTimeout(() => {
					instance[method](getItems(count), idx++);
				}, 10);
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

// check layout properties
export function checkLayoutComplete(handler, {count, isAppend, isTrusted}) {
	for (let i = 0, len = handler.callCount; i < len; i++) {
		const param = handler.getCall(i).args[0];

		expect(param.target.length).to.be.equal(count);
		expect(param.isAppend).to.be.equal(isAppend);
		expect(param.isTrusted).to.be.equal(isTrusted);
	}
}

// function parseCssText(str) {
// 	const ht = {};
// 	str.split(";").map(v => v.trim())
// 		.filter(v => !utils.isEmptyObject(v))
// 		.forEach(v => {
// 			const a = v.split(":");
// 			const val = a[1].trim();

// 			if (!utils.isEmptyObject(val)) {
// 				ht[a[0]] = a[1].trim();
// 			}
// 		});
// 	return ht;
// }

// export function checkGetStatus(infinite, beforeStatus) {
// 	const beforeLayoutStatus = beforeStatus.layoutManager;
// 	const target = infinite.view === window ? infinite.el : infinite.view;

// 	// Then
// 	expect(beforeStatus.html).to.be.equal(target.innerHTML);
// 	expect(beforeStatus.cssText).to.be.equal(target.style.cssText);

// 	beforeLayoutStatus.items.forEach((v, i) => {
// 		expect(v.position).to.be.deep.equal(infinite.layoutManager.items[i].position);
// 		expect(v.size).to.be.deep.equal(infinite.layoutManager.items[i].size);
// 	});
// 	for (let v in beforeStatus.status) {
// 		expect(infinite._status[v]).to.be.equal(beforeStatus.status[v]);
// 	}
// 	expect(utils.scrollTop(infinite.view)).to.be.equal(beforeStatus.scrollPos);
// }

// export function compareStatus(infinite, beforeStatus, beforeScrollPos) {
// 	const beforeLayoutStatus = beforeStatus.layoutManager;
// 	const target = infinite.view === window ? infinite.el : infinite.view;

// 	// Then (check infiniteGrid)
// 	expect(infinite.options).to.be.deep.equal(beforeStatus.options);
// 	for(let v in beforeStatus.prop) {
// 		expect(infinite._status[v]).to.be.equal(beforeStatus.prop[v]); // check infiniteGrid properties
// 	};
// 	expect(parseCssText(target.style.cssText)).to.be.deep.equal(parseCssText(beforeStatus.cssText));

// 	// Then (check layoutManager)
// 	for (let v in beforeLayoutStatus.prop) {
// 		if (v !== "items") {
// 			expect(infinite.layoutManager[v]).to.be.deep.equal(beforeLayoutStatus.prop[v]); // check LayoutManager properties
// 		}
// 	};
// 	infinite.layoutManager.items.forEach((v, i) => {
// 		expect(v.position).to.be.deep.equal(beforeLayoutStatus.items[i].position); // check html and position information
// 		expect(v.size).to.be.deep.equal(beforeLayoutStatus.items[i].size); // check html and size information
// 		expect(v.position).to.be.deep.equal({
// 			"x": parseInt(v.el.style.left, 10),
// 			"y": parseInt(v.el.style.top, 10),
// 		});
// 	});

// 	// Then (check scrollPosotion)
// 	typeof beforeScrollPos !== "undefined" &&
// 		expect(beforeStatus.scrollPos).to.be.equal(beforeScrollPos);
// }
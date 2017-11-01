// import {utils} from "../../src/utils";
// import {} from "../../src/utils";

function imgSrc(v) {
  return "../../demo/assets/image/" + (((v + 1) % 60) + 1) + ".jpg";
}

export function getItems(groupNo) {
  groupNo *= 30;
  var items = [];

  for (var i = 0; i < 30; i++) {
    items.push('<div class="item"><div class="thumbnail"><img src="' + imgSrc(groupNo + i) + '" /><div class="caption"><p><a href="http://www.google.com/">Cras justo odio bla bla bla bla bla bla bla bla</a></p></div></div></div>');
  }
  return items;
};



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
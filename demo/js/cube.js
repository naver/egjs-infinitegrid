var box = document.getElementById("box"),
	inst = new eg.InfiniteGrid({
		min : [ 0, 0 ],
		max : [ 360, 360 ],
		circular : true,
		deceleration : 0.0024
	}).on({
		"change" : function(evt) {
			var pos = evt.pos;
			box.style[TRANSFORM] = "rotateY(" + pos[0] + "deg) rotateX(" + pos[1] + "deg)";
		}
	});

inst.bind(document.body, {
	direction : eg.InfiniteGrid.DIRECTION_ALL,
	maximumSpeed : 50
});
/**
 * Copyright (c) NAVER Corp.
 */

var log = document.getElementById("log");
function addLog(msg) {
    log.innerHTML = msg + "\n" + log.innerHTML;
}
document.getElementById("clear").addEventListener("click", function(e) {
    log.innerHTML = "";
});

var dot = document.getElementById("dot"),
  inst = new eg.InfiniteGrid({
    min : [ 0, 0 ],
    max : [ 200, 300 ],
    bounce : 100,
    deceleration : 0.0024
  }).on({
    "hold" : function(evt) {
      addLog("[Hold] " + evt.pos);
    },
    "release" : function(evt) {
      addLog("[Release] " + evt.destPos);
    },
    "animationStart" : function(evt) {
      addLog("[animationStart ==>]");
    },
    "animationEnd" : function(evt) {
      addLog("[==> animationEnd]");
    },
    "change" : function(evt) {
      var pos = evt.pos;
      dot.setAttribute("style",
          "left:"+ (pos[0]) + 'px;' + "top:"+ (pos[1]) + "px"
        );
    }
  });

inst.bind("#area", {
  direction : eg.InfiniteGrid.DIRECTION_ALL,
  scale : [ 0.5, 1],
  maximumSpeed : 50
}).
bind("#hmove", {
  direction : eg.InfiniteGrid.DIRECTION_HORIZONTAL,
  maximumSpeed : 50
}).
bind("#vmove", {
  direction : eg.InfiniteGrid.DIRECTION_VERTICAL,
  maximumSpeed : 50
});

// inst.setTo(200,200);
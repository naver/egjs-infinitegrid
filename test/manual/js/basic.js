var oinst = new eg.InfiniteGrid("#grid", {
  
});
// var HTML = '<li class="item"><div>테스트1</div></li><li class="item"><div>테스트2</div></li><li class="item"><div>테스트3</div></li><li class="item"><div>테스트4</div></li><li class="item"><div>테스트5</div></li><li class="item"><div>테스트6</div></li><li class="item"><div>테스트7</div></li>';

// var tmpStatus = {};

document.getElementById("controller").addEventListener("click", function() {
  // var $el = $(e.target),
  //   $elements = null;
  // if ($el.hasClass("append")) {
  //   $elements = $(HTML);
  //   $elements.addClass("append").find("div").height(function() {
  //     var val = parseInt(Math.random() * 100,10);
  //     return val < 40 ? 40 : val;
  //   });
  //   oinst.append($elements );
  // } else if ($el.hasClass("prepend")) {
  //   $elements = $(HTML);
  //   $elements.addClass("prepend").find("div").height(function() {
  //     var val = parseInt(Math.random() * 100,10);
  //     return val < 40 ? 40 : val;
  //   })
  //   oinst.prepend($elements);
  // } else if ($el.hasClass("fit")) {
  //   oinst.fit();
  // } else if ($el.hasClass("layout")) {
  //   oinst.layout();
  // } else if ($el.hasClass("clear")) {
  //   oinst.clear();
  // } else if ($el.hasClass("getStatus")) {
  //   tmpStatus = oinst.getStatus();
  // } else if ($el.hasClass("setStatus")) {
  //   oinst.setStatus(tmpStatus);
  // } else if ($el.hasClass("getTopElement")) {
  //   var $el = $(oinst.getTopElement());
  //   $el.animate({
  //           "fontSize" : "3em"
  //   }, 1000)
  //       .animate({
  //           "fontSize" : "1em"
  //       });
  // } else if ($el.hasClass("getBottomElement")) {
  //   var $el = $(oinst.getBottomElement());
  //   $el.animate({
  //           "fontSize" : "3em"
  //   }, 1000)
  //       .animate({
  //           "fontSize" : "1em"
  //       });
  // }
});
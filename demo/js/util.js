var TRANSFORM = (function() {
    var bodyStyle = (document.head || document.getElementsByTagName("head")[0]).style;
    var target = [ "transform", "webkitTransform", "msTransform", "mozTransform" ];
    for(var i=0, len=target.length; i<len; i++) {
        if(target[i] in bodyStyle) {
            return target[i];
        }
    }
    return "";
})();
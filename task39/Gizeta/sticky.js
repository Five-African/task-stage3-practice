var Sticky = (function() {
  var stickies;

  return {
    init: function() {
      stickies = [].slice.call(document.querySelectorAll('.sticky'));
      if (stickies.length == 0) return;

      var length = stickies.length;
      var magic = 0;
      for (var i = 0; i < length; i++) {
        var node = stickies[i];
        var nextNode = stickies[i + 1];
        node.dataset.stickyStartPos = node.getBoundingClientRect().top - magic;
        node.dataset.stickyEndPos = Math.min(nextNode ? nextNode.getBoundingClientRect().top : 16777215, node.parentNode.getBoundingClientRect().bottom) - magic;
        node.dataset.stickyHeight = node.clientHeight;
        magic = node.clientHeight;
      }

      window.addEventListener('scroll', function() {
        var length = stickies.length;
        for(var i = 0; i < length; i++) {
          var prevNode = stickies[i - 1];
          var node = stickies[i];
          var nextNode = stickies[i + 1];
          if(window.scrollY >= +node.dataset.stickyStartPos && window.scrollY < +node.dataset.stickyEndPos) {
            if (node.className.indexOf(' fixed') < 0) {
              node.className += " fixed";
            }
            if (nextNode) {
              var nextPos = nextNode.getBoundingClientRect().top - node.dataset.stickyHeight;
              if (nextPos < 0) {
                node.style.top = nextPos + "px";
              }
            }
          }
          else {
            if (node.className.indexOf(' fixed') >= 0) {
              node.className = node.className.replace(' fixed', '');

              if (!prevNode || (prevNode && prevNode.getBoundingClientRect().top + +prevNode.dataset.stickyHeight < 0)) {
                node.style.top = "";
              }
            }
          }
        }
      });
    }
  }
})();

Sticky.init();

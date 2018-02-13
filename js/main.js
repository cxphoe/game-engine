window.onload = function() {
    if (isMobile()) {
        var root = document.querySelector('#root')
        root.style.height = '700px'
        root.style.margin = '-350px 0 0 -200px'
        
        // 禁止双指缩放
        document.documentElement.addEventListener('touchstart', function (event) {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        }, false);
        
        // 禁止双击缩放
        var lastTouchEnd = 0;
        document.documentElement.addEventListener('touchend', function (event) {
            var now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
          
    }
    var g = Game.instance(function (game) {
        game.run()
    })
}

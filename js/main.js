window.onload = function() {
    if (isMobile()) {
        var root = document.querySelector('#root'),
            o = { passive: false }
    
        document.body.style.fontSize = '12px'
        // 禁止双指缩放 以及 阻止长按出现菜单
        document.documentElement.addEventListener('touchstart', (event) => {
            event.preventDefault();
        }, o);
        
        // 禁止双击缩放
        var lastTouchEnd = 0;
        document.documentElement.addEventListener('touchend', (event) => {
            var now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, o);
        
        // 禁止滚动
        document.documentElement.addEventListener('touchmove', (event) => {
            event.preventDefault()
        }, o)
    }

    // 调整界面
    var gi = GameInterface.new()
    gi.resize()
    window.onresize = () => {
        gi.resize()
    }

    // 开始游戏
    var g = Game.instance(function (game) {
        game.run()
    })
}

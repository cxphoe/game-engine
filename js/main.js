window.onload = function() {
    if (isMobile()) {
        var root = document.querySelector('#root'),
        page = getBrowserInterfaceSize(),
        h = page.pageHeight
    
        root.style.height = `${h}px`
        root.style.margin = `-${h/2}px 0 0 -200px`
        root.style['font-size'] = '10px'
        // 禁止双指缩放
        document.documentElement.addEventListener('touchstart', (event) => {
            if (event.touches.length > 1) {
                event.preventDefault();
            }
        }, false);
        
        // 禁止双击缩放
        var lastTouchEnd = 0;
        document.documentElement.addEventListener('touchend', (event) => {
            var now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, false);
        
        // 禁止滚动
        document.documentElement.addEventListener('touchmove', (event) => {
            event.preventDefault()
        })

        // 阻止长按出现菜单
        document.documentElement.addEventListener('touchstart', (event) => {{
            event.preventDefault()
        }})
    }
    var g = Game.instance(function (game) {
        game.run()
    })
}

import Game from './game/game'
import GameInterface from './view/game_interface'
import { isMobile } from './utils/function'
import style from '../css/index.css'

window.onload = function() {
    // 判断是否是移动端
    if (isMobile()) {
        var options = { passive: false }
    
        document.body.style.fontSize = '12px'
        // 禁止双指缩放 以及 阻止长按出现菜单
        document.documentElement.addEventListener('touchstart', (event) => {
            event.preventDefault();
        }, options);
        
        // 禁止双击缩放
        var lastTouchEnd = 0;
        document.documentElement.addEventListener('touchend', (event) => {
            var now = Date.now();
            if (now - lastTouchEnd <= 300) {
                event.preventDefault();
            }
            lastTouchEnd = now;
        }, options);
        
        // 禁止滚动
        document.documentElement.addEventListener('touchmove', (event) => {
            event.preventDefault()
        }, options)
    }

    // 调整界面
    var gi = GameInterface.instance()
    gi.resize()
    window.onresize = () => {
        gi.resize()
    }

    // 开始游戏
    var g = Game.instance(function (game) {
        game.run()
    })
}

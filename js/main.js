window.onload = function() {
    if (isMobile()) {
        var root = document.querySelector('#root')
        root.style.height = '700px'
        root.style.margin = '-350px 0 0 -200px'
    }
    var g = Game.instance(function (game) {
        game.run()
    })
}

class SceneReset extends GameScene {
    constructor (game) {
        super(game)
    }

    setup() {
        this.pushElement(this.game.area)
    }

    init() {
        this.index = 19
        this.update = this.fillArea
    }

    fillArea() {
        var area = this.game.area
        area.setLine(this.index, OCCUPIED_COLOR, false)
        if (--this.index < 0) {
            this.index = 0
            this.update = this.clearArea
        }
    }
    
    clearArea() {
        var area = this.game.area
        area.setLine(this.index, DEFAULT_COLOR, false)
        if (++this.index == 20) {
            this.restartGame()
        }
    }

    restartGame() {
        this.game.replaceScene(SceneTitle, 'title')
    }
}
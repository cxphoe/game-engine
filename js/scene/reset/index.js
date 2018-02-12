class SceneReset extends GameScene {
    constructor (game) {
        super(game)
    }

    setup() {
        this.pushElement(this.game.field)
    }

    init() {
        this.index = 19
        this.update = this.fillField
    }

    fillField() {
        var field = this.game.field
        field.setLine(this.index, OCCUPIED_COLOR, false)
        if (--this.index < 0) {
            this.index = 0
            this.update = this.clearField
        }
    }
    
    clearField() {
        var field = this.game.field
        field.setLine(this.index, DEFAULT_COLOR, false)
        if (++this.index == 20) {
            this.restartGame()
        }
    }

    restartGame() {
        this.game.replaceScene(SceneTitle, 'title')
    }
}
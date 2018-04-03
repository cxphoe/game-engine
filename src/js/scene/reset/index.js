import GameScene from '../../game/game_scene'
import SceneTitle from '../title/index'
import { occupiedColor, defaultColor } from '../../const'

export default class SceneReset extends GameScene {
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
        let area = this.game.area
        area.setLine(this.index, occupiedColor, false)
        if (--this.index < 0) {
            this.index = 0
            this.update = this.clearArea
        }
    }
    
    clearArea() {
        let area = this.game.area
        area.setLine(this.index, defaultColor, false)
        if (++this.index == 20) {
            this.restartGame()
        }
    }

    restartGame() {
        this.game.replaceScene(SceneTitle, 'title')
    }
}
import CoreGame from '../../core/game'
import SceneTitle from '../scene/title'

export default class Game extends CoreGame {
    constructor(callback) {
        super('#area')

        this.callbackRun = callback
        this.__start()
    }

    clear() {
        // this.ctx.clearRect(0, 0, 400, 600)
    }

    __start() {
        this.replaceScene(SceneTitle, 'main')
        this.callbackRun && this.callbackRun(this)
    }
}

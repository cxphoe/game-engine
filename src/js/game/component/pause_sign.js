import GameIndicator from '../game_indicator'
import { pauseState, unpauseState } from '../../const'

export default class PauseSign extends GameIndicator {
    // 用来管理 暂停功能 以及 在游戏界面中的暂停标志
    constructor() {
        super('#s_psign')
        this.process = null
        this.paused = false
        this.count = 0
    }

    pause() {
        this.paused = true
        // 暂停指示器闪烁
        this.process = setInterval(() => {
            this.count++ % 2 == 0 ? this.setState(pauseState) :
                                    this.setState(unpauseState)
        }, 1000 / 4)
    }

    unpause() {
        this.paused = false
        this.count = 0
        this.setState(unpauseState)
        clearInterval(this.process)
    }
}
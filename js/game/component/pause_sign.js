class PauseSign extends GameIndicator {
    // 用来管理 暂停功能 以及 在游戏界面中的暂停标志
    constructor() {
        super('#s_psign')
        this.process = null
        this.paused = false
        this.count = 0
    }

    pause() {
        this.paused = true
        this.process = setInterval(() => {
            this.count++ % 2 == 0 ? this.setState(PAUSE_STATE) :
                                    this.setState(UNPAUSE_STATE)
        }, 1000 / 4)
    }

    unpause() {
        this.paused = false
        this.count = 0
        this.setState(UNPAUSE_STATE)
        clearInterval(this.process)
    }
}
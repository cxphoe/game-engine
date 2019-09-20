import GameIndicator from '../game/game_indicator'
import GameBoard from '../game/game_board'
import { tikState, tokState } from '../const'

// 用于表示游戏界面的时钟
export default class Clock {
    constructor(game) {
        this.game = game
        this.setup()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    // 初始化两个板子分别表示小时以及分钟，一个“滴答”的显示器
    setup() {
        this.hourBoard = GameBoard.new('#s_hour span')
        this.minuteBoard = GameBoard.new('#s_minute span')
        this.indicator = GameIndicator.new('#s_clock_indi')
        
        const now = new Date()
        this.hours = now.getHours()
        this.minutes = now.getMinutes()
        this.seconds = now.getSeconds()

        this.hourBoard.setNumber(this.hours)
        this.minuteBoard.setNumber(this.minutes)

        // 每秒更新一次
        setInterval(() => {
            this.update()
        }, 1000)
    }

    update() {
        if (++this.seconds == 60) {
            this.seconds = 0
            if (++this.minutes == 60) {
                this.minutes = 0
                if (++this.hours == 24) {
                    this.hours = 0
                }
                this.hourBoard.setNumber(this.hours)
            }
            this.minuteBoard.setNumber(this.minutes)
        }
        
        // 通过设置tikState，tokState两种状态相应的类名实现“滴答”的效果
        const state = this.seconds % 2 == 0 ? tikState : tokState
        this.indicator.setState(state)
    }
}
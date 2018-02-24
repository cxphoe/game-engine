import GameIndicator from '../game_indicator'
import GameBoard from '../game_board'
import { tikState, tokState } from '../../const'

export default class Clock {
    constructor(game) {
        this.game = game
        this.setup()
    }

    static new(...args) {
        return new this(...args)
    }

    setup() {
        this.hourBoard = GameBoard.new('#s_hour span')
        this.minuteBoard = GameBoard.new('#s_minute span')
        this.indicator = GameIndicator.new('#s_clock_indi')
        
        var now = new Date()
        this.hours = now.getHours()
        this.minutes = now.getMinutes()
        this.seconds = now.getSeconds()

        this.hourBoard.setNumber(this.hours)
        this.minuteBoard.setNumber(this.minutes)

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
        
        var state = this.seconds % 2 == 0 ? tikState : tokState
        this.indicator.setState(state)
    }
}
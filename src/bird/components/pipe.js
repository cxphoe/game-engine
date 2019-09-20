import GameElement from "../../core/game_element";
import { imgs } from "../const";
import config from "../config";
import { randBetween } from "../../utils/function";


export default class Pipe extends GameElement {
    constructor(game, retire, gradeFn) {
        super(game)


        this.PipeYs = Pipe.getPipeYCoors()
        /** 两个管道之间的间隔上下端的 Y 坐标 */
        this.gapYCoors = [this.PipeYs[0] + 320, this.PipeYs[1]]
        this.retire = retire
        /** 加分的回调 */
        this.grade = gradeFn
        // 到 -52 就 retire
        this.x = 400

        this.graded = false
    }

    // bot_pipe 图片 51 x 317
    static bottomPipeYRange = [500 - 317, 400]
    // // top_pipe 图片 52 x 320
    // const [y1, y2] = this.bottomPipeYRange
    // this.topPipeYRange = [y1 - 320, y2 - 320]
    static topPipeYRange = [-200, 0]

    static new(...args) {
        return new this(...args)
    }

    static getPipeYCoors() {
        let bottomY = randBetween(...this.bottomPipeYRange)
        let topY = bottomY - 320 - this.gap
        let [y1, y2] = this.topPipeYRange
        // if (topY < y1 || topY > y2) {
        //     console.log(topY)
        //     return this.getPipeYCoors()
        // }
        return [topY, bottomY]
    }

    static get gap() {
        return config.pipeGap
    }

    get speed() {
        return config.backgroundSpeed
    }

    draw() {
        let ctx = this.game.ctx
        let x = this.x
        let [topY, bottomY] = this.PipeYs
        ctx.drawImage(imgs.topPipe, x, topY)
        ctx.drawImage(imgs.pipe, x, bottomY)
    }

    update() {
        if (this.x < -52) {
            if (!this.retire) {
                return
            }
            console.log('pipe retire')
            this.retire()
            this.retire = null
            return
        }
        if (!this.graded && this.x <= 100 - 26) {
            this.grade && this.grade()
            this.graded = true
        }
        this.x -= this.speed
    }
}

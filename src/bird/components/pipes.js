import GameElement from "../../core/game_element";
import config from "../config";
import Pipe from "./pipe";


const overlap = ([x1, x2], [y1, y2]) => {
    return !(x1 > y2 || x2 < y1)
} 

export default class Pipes extends GameElement {
    constructor(game, gradeFn) {
        super(game)
        /** @type {Pipe[]} */
        this.pipes = []
        this.pipeCd = 2 * game.fps
        this.grade = gradeFn
    }

    get pipeTimeInterval() {
        return config.pipeTimeInterval / 1000
    }

    collide(x1, x2, y1, y2) {
        for (let p of this.pipes) {
            if (
                overlap([x1, x2], [p.x, p.x + 52]) &&
                (overlap([y1, y2], [0, p.gapYCoors[0]]) ||
                overlap([y1, y2], [p.gapYCoors[1], 500]))
            ) {
                return true
            }
        }
        return false
    }

    draw() {
        for (let e of this.pipes) {
            e.draw()
        }
    }

    update() {
        for (let p of this.pipes) {
            p.update()
        }
        this.pipeCd--
        if (this.pipeCd <= 0) {
            let game = this.game
            this.pipeCd = this.pipeTimeInterval * game.fps
            let p = Pipe.new(this.game, () => {
                setTimeout(() => {
                    let index = this.pipes.indexOf(p)
                    this.pipes.splice(index, 1)
                })
            }, () => this.grade && this.grade())
            this.pipes.push(p)
        }
    }
}

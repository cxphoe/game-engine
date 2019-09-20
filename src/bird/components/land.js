import GameElement from '../../core/game_element'
import { imgs } from '../const'
import config from '../config'

export default class Land extends GameElement {
    constructor(game) {
        super(game)
        this.x = 0
    }

    get speed() {
        return config.backgroundSpeed
    }

    draw() {
        let game = this.game
        let ctx = game.ctx
        let offset = this.x
        ctx.drawImage(imgs.land, 0 - offset, 500, 400, imgs.land.height)
        ctx.drawImage(imgs.land, 400 - offset, 500, 400, imgs.land.height)
    }

    update() {
        this.x += this.speed
        if (this.x > 400) {
            this.x = 0
        }
    }
}

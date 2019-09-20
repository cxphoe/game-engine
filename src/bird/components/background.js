import GameElement from '../../core/game_element'
import { imgs } from '../const'

export default class Background extends GameElement {
    constructor(game) {
        super(game)
    }

    draw() {
        let game = this.game
        let ctx = game.ctx
        ctx.drawImage(imgs.sky, 0, 0)
    }
}

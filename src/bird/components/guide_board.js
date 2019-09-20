import GameElement from "../../core/game_element";
import { imgs } from "../const";


export default class GuideBoard extends GameElement {
    constructor(game) {
        super(game)
        this.keepCD = 3 * game.fps
    }

    draw() {
        let ctx = this.game.ctx
        ctx.drawImage(imgs.label, 100, 525)
        ctx.font = '18px Arial'
        ctx.fontStyle = '#f0f0f0'
        ctx.fillText('按空格键跳跃', 147, 568)
    }

    update() {
        this.keepCD--
        if (this.keepCD <= 0) {
            this.draw = this.update = () => {}
        }
    }
}
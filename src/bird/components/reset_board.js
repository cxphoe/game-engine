import GameElement from "../../core/game_element";
import { imgs } from "../const";


export default class ResetBoard extends GameElement {
    draw() {
        let ctx = this.game.ctx
        ctx.drawImage(imgs.label, 100, 40)
        ctx.font = '18px Arial'
        ctx.fillStyle = '#dddddd'
        ctx.fillText('按 R 键重新开始', 135, 83)
    }
}
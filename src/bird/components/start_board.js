import GameElement from "../../core/game_element";
import { imgs } from "../const";


export default class StartBoard extends GameElement {
    draw() {
        let ctx = this.game.ctx
        ctx.drawImage(imgs.label, 100, 40)
        ctx.font = '16px Arial'
        ctx.fillStyle = '#dddddd'
        ctx.fillText('按空格键开始游戏', 137, 83)
    }
}
import GameElement from "../../core/game_element";
import { imgs } from "../const";


export default class ScoreBoard extends GameElement {
    constructor(game) {
        super(game)
        this.grades = 0
    }

    draw() {
        /** @type {CanvasRenderingContext2D} */
        let ctx = this.game.ctx
        ctx.drawImage(imgs.label, 100, 527)
        ctx.font = '20px Arial'
        ctx.fillStyle = '#ffffff'
        ctx.fillText('得分：' + this.grades, 140, 570)
    }

    setGrades(num) {
        this.grades = num
    }
}

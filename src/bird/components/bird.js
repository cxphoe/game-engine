import GameElement from "../../core/game_element";
import { imgs } from "../const";
import config from "../config";

export default class Bird extends GameElement {
    constructor(game, overFn) {
        super(game)
        this.texture = imgs.bird1
        this.flyUpdateCD = 5
        this.flyCD = this.flyUpdateCD
        this.coors = [100, 100]
        this.sizes = [48, 48]

        this.deg = 0
        this.rangeDeg = [-90, 120]

        this.speed = 0
        // this.speedIncrement = 3
        this.rangeY = [0, 500]
        this.overCallback = overFn
    }

    get angle() {
        return this.deg / 360 * Math.PI
    }

    get speedIncrement() {
        return config.birdSpeedIncrement
    }

    get flapSpeed() {
        return config.birdFlapSpeed
    }

    get degIncrement() {
        return config.degIncrement
    }

    draw() {
        let ctx = this.game.ctx
        let img = this.texture
        let [x, y] = this.coors
        let [w, h] = this.sizes
        let angle = this.angle
        ctx.save()
        // 将 canvas 画布原点移动到 bird 图片的正中间
        ctx.translate(x + w / 2, y + h / 2)
        ctx.rotate(angle)
        ctx.drawImage(img, -w / 2, -h / 2)

        ctx.restore()
    }

    over() {
        this.overCallback()
    }

    updateY() {
        let nextY = this.coors[1] + this.speed
        let [minY, maxY] = this.rangeY
        if (nextY >= minY && nextY <= maxY) {
            this.coors[1] = nextY
        } else if (nextY > maxY) {
            this.over()
        }
    }

    updateDeg() {
        let degIncrement = this.degIncrement
        let [minDeg, maxDeg] = this.rangeDeg
        if (this.speed > 0) {
            this.deg < maxDeg && (this.deg += degIncrement)
        } else if (this.speed < 0) {
            this.deg > minDeg && (this.deg -= degIncrement)
        }
    }

    updateSpeed () {
        this.speed += this.speedIncrement
        if (this.speed < 0) {
            this.texture = imgs.bird2
        } else if (this.speed > 0) {
            this.texture = imgs.bird0
        } else {
            this.texture = imgs.bird1
        }
    }

    flap() {
        this.speed = this.flapSpeed
        this.deg = this.rangeDeg[0]
    }

    update() {
        this.updateY()
        this.updateSpeed()
        this.updateDeg()
    }
}
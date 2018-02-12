// preview for next blockcomb
class Preview extends DrawingBoard {
    constructor(game) {
        super('#next canvas')
        this.game = game
        this.default()
    }

    // 更新 coors 供下一次 blockComb 重置使用
    next() {
        this.coors = randBlockType()
        var diffX = coorDiff(this.coors, 0)
        this.offsetX = diffX == 1 ? 1 : diffX == 2 ? 0.5 : 0
        this.offsetY = coorDiff(this.coors, 1) == 0 ? 0.5 : 0
    }

    default() {
        this.color = 'rbg(0, 0, 0)'
    }

    drawBlock(x, y) {
        super.drawBlock(x, y, this.game.blockSize, this.color)
    }

    draw() {
        var coors = this.coors
        
        // draw blockComb preview
        var offsetX = this.offsetX
        var offsetY = this.offsetY
        for (var c of coors) {
            this.drawBlock(c[0] + offsetX, c[1] + offsetY)
        }
    }

    clear() {
        var c = this.canvas
        this.ctx.clearRect(0, 0, c.width, c.height)
    }
}
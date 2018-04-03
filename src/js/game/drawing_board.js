// 一个用于画出俄罗斯方块的画板(canvas)
export default class DrawingBoard {
    constructor(selectors) {
        this.canvas = document.querySelector(selectors)
        this.ctx = this.canvas.getContext('2d')
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    drawBlock(x, y, bs, color) {
        let gap = bs / 15
        let space = bs / 10
        let ctx = this.ctx
        
        ctx.fillStyle = color
        // 画外框
        let offsetX = bs * x + gap
        let offsetY = bs * y + gap
        let length = bs - 2 * gap        
        ctx.fillRect(offsetX, offsetY, length, length)
        
        // 请空间隔
        offsetX += gap
        offsetY += gap
        length -= 2 * gap
        ctx.clearRect(offsetX, offsetY, length, length)

        // 画正中间方块
        length -= space * 2
        ctx.fillRect(offsetX + space, offsetY + space,
                     length, length)
    }

}
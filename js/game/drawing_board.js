class DrawingBoard {
    constructor(selectors) {
        this.canvas = document.querySelector(selectors)
        this.ctx = this.canvas.getContext('2d')
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    drawBlock(x, y, bs, color) {
        var gap, space, ctx, length, offsetX, offsetY
        gap = bs / 15
        space = bs / 10
        ctx = this.ctx
        
        ctx.fillStyle = color
        // 画外框
        offsetX = bs * x + gap
        offsetY = bs * y + gap
        length = bs - 2 * gap        
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
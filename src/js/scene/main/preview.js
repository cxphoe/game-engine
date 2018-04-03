import DrawingBoard from '../../game/drawing_board'
import { blockType } from '../../const'
import { occupiedColor } from '../../const'
import { coorDiff } from '../../utils/function'

// preview for next blockcomb 方块组合的预览
// 每次在主要界面需要一个新的方块组合时，就将目前缓存的方块组
// 合提供给主界面，之后再更新方块组合；
// 方块组合为一个数组，包含四个表示的坐标的数组
export default class Preview extends DrawingBoard {
    constructor(game) {
        super('#next canvas')
        this.game = game
        this.default()
    }

    // 更新 coors 供下一次 blockComb 重置使用
    next() {
        this.coors = this.randBlockType()
        let diffX = coorDiff(this.coors, 0)
        this.offsetX = diffX == 1 ? 1 : diffX == 2 ? 0.5 : 0
        this.offsetY = coorDiff(this.coors, 1) == 0 ? 0.5 : 0
    }

    default() {
        this.color = occupiedColor
    }

    drawBlock(x, y) {
        super.drawBlock(x, y, this.game.blockSize, this.color)
    }

    randBlockType() {
        let bt = blockType
        return bt[Math.floor(Math.random() * bt.length)]    
    }

    draw() {
        let coors = this.coors
        
        // draw blockComb preview
        let offsetX = this.offsetX
        let offsetY = this.offsetY
        for (let c of coors) {
            this.drawBlock(c[0] + offsetX, c[1] + offsetY)
        }
    }

    clear() {
        let c = this.canvas
        this.ctx.clearRect(0, 0, c.width, c.height)
    }
}
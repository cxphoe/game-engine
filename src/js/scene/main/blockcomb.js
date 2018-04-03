import Preview from './preview'
import { collide, coorDiff, coorCompare } from '../../utils/function'
import { occupiedColor, indicateColor } from '../../const'

// 方块组合
export default class BlockComb {
    constructor (game) {
        this.game = game
        this.default()
        this.setup()
    }

    static instance(game) {
        this.i = this.i || new this(game)

        return this.i
    }

    default() {
        // 整个方块组合的基准坐标
        this.x = 0
        this.y = 0
        this.defaultColor = occupiedColor
        // indicateColor 用于方块在到达底部的时候高亮显示的颜色
        this.indicateColor = indicateColor
        // blockcomb 下降的CD
        this.maxUpdateCD = Math.floor(this.game.fps / 1.5)
    }

    setup() {
        this.preview = Preview.instance(this.game)
        this.preview.next()
    }

    // change the attrs of blockComb instead of creating a new one
    // when the game need another block combination
    init() {
        let p = this.preview
        this.coors = p.coors
        // update preivew
        p.next()
        p.clear()
        p.draw()

        // x and y indicate block combination's place in board
        this.y = -coorDiff(this.coors, 1) - 1
        this.color = this.defaultColor
        this.updateCD = this.maxUpdateCD
        this.retired = false    // retired 为真时重置 blockcomb
    }

    move(offset) {
        // 方块退休时，不能移动
        if (this.retired) {
            return
        }
        
        let area = this.game.area
        if (! collide(this.x+offset, this.y, this.coors, area)) {
            this.x += offset
        }
    }

    moveLeft() {
        this.move(-1)
    }

    moveRight() {
        this.move(1)
    }

    rotate() {
        // 方块退休时不能旋转
        if (this.retired) {
            return
        }
        // get rotated coordinates
        let newCoors = this.rotateCoors(this.coors)
        let area = this.game.area

        // 得到所有可能的水平位移距离，通过让方块组合在贴墙时吗，改变其水平
        // 基准坐标，使得能够贴墙旋转
        let xDiff = coorDiff(newCoors, 0)
        let offsets = this.getOptionalOffsets(xDiff)
        for (let offset of offsets) {
            if (! collide(this.x + offset, this.y, newCoors, area)) {
                this.coors = newCoors
                this.x += offset
                return
            }
        }
    }

    rotateCoors(coors) {
        // 旋转坐标
        let newCoors = coors.map(c => [-c[1], c[0]])
        // 对得到的新坐标排序，并且得到 x 坐标最小的坐标
        let m = newCoors.sort(function (c1, c2) {
            return c1[0] === c2[0] ? c1[1] - c2[1] : c1[0] - c2[0]
        })[0]

        // ensure the first one coor with 0 as x coordinate
        // 确保第一个坐标的 x 坐标为0；长蛇状除外
        let offsetX = m[0]
        let offsetY = m[1]
        let xDiff = coorDiff(coors, 0)
        // 判断是否为长蛇状且旋转前处于横放的状态
        if (xDiff === 3) {
            offsetX -= 1
            offsetY += 1
        }
        return newCoors.map(c => [c[0] - offsetX, c[1] - offsetY])
    }

    getOptionalOffsets(n) {
        let offsets = [0]
        for (let offset = 1; offset <= n; offset++) {
            offsets.push(offset, -offset)
        }
        return offsets
    }

    // 方块组合直接降落到底部
    drop() {
        if (this.game.area.scoring) {
            return  // area 在计分时不能 drop
        }
        while (!this.retired) {
            this.updateY()
        }
    }

    // 占据游戏画板
    occupy() {
        let board = this.game.area.board
        for (let c of this.coors) {
            try {
                let block = board[this.y + c[1]][this.x + c[0]]
                block.occupied = true
                block.color = this.defaultColor
            } catch(ex) {

            }
        }
    }

    retire() {
        this.retired = true
        this.color = this.indicateColor
    }

    // 判断方块组合是否被挡住
    isBlocked() {
        let area = this.game.area
        for (let c of this.coors) {
            try {
                if (this.y + c[1] + 1 === area.row ||
                    area.board[this.y + c[1] + 1][this.x + c[0]].occupied)
                    return true
            } catch (err) {
                
            }
        }
        return false
    }

    draw() {
        let game = this.game
        for (let c of this.coors) {
            game.drawBlock(this.x + c[0], this.y + c[1], this.color)
        }
    }

    updateY() {
        this.isBlocked() ? this.retire() : this.y++
    }

    update() {
        if (this.updateCD <= 0) {
            this.updateCD = this.maxUpdateCD
            this.updateY()
        } else {
            this.updateCD--
        }
    }
}

class BlockComb {
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
        this.defaultColor = OCCUPIED_COLOR
        this.indicateColor = INDICATE_COLOR
        // blockcomb move 和 rotate 的CD
        this.maxChangeCD = 1
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
        var p = this.preview
        this.coors = p.coors
        // update preivew
        p.next()
        p.clear()
        p.draw()

        // x and y indicate block combination's place in board
        this.x = 3
        this.y = -coorDiff(this.coors, 1) - 1
        this.color = this.defaultColor
        this.rotateCD = 0
        this.updateCD = this.maxUpdateCD
        this.retired = false    // retired 为真时重置 blockcomb
    }

    move(offset) {
        if (this.changeCD || this.retired) {
            return
        }
        
        var field = this.game.field
        if (! collide(this.x+offset, this.y, this.coors, field)) {
            this.changeCD = this.maxChangeCD
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
        if (this.changeCD || this.retired) {
            return
        }
        // get rotated coordinates
        var newCoors = rotateCoors(this.coors)
        var field = this.game.field
        if (! collide(this.x, this.y, newCoors, field)) {
            this.changeCD = this.maxChangeCD
            this.coors = newCoors
        }
    }

    drop() {
        if (this.game.field.scoring) {
            return  // field 在计分时不能 drop
        }
        while (!this.retired) {
            this.updateY()
        }
    }

    occupy() {
        var board = this.game.field.board
        for (var c of this.coors) {
            try {
                var block = board[this.y + c[1]][this.x + c[0]]
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

    isBlocked() {
        var row, block, field = this.game.field
        for (var c of this.coors) {
            try {
                if (this.y + c[1] + 1 == field.row ||
                    field.board[this.y + c[1] + 1][this.x + c[0]].occupied)
                        return true
            } catch (err) {
                
            }
        }
        return false
    }
    
    debug() {
        this.maxChangeCD = config.game.bcChangeCD.value
        // if just assign the maxUpdateCD to config value
        if (this.maxUpdateCD != 0) {
            this.maxUpdateCD = config.game.bcUpdateCD.value
        }
    }

    draw() {
        var game = this.game
        for (var c of this.coors) {
            game.drawBlock(this.x + c[0], this.y + c[1], this.color)
        }
    }

    updateY() {
        this.isBlocked() ? this.retire() : this.y++
    }

    update() {
        if (this.game.speedUp) {
            this.updateY()
        }

        if (this.updateCD == 0) {
            this.updateCD = this.maxUpdateCD
            this.updateY()
        } else {
            this.updateCD--
        }
        if (this.changeCD) {
            this.changeCD--
        }
    }
}

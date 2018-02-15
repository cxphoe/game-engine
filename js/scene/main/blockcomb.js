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
        this.updateCD = this.maxUpdateCD
        this.retired = false    // retired 为真时重置 blockcomb
    }

    move(offset) {
        if (this.retired) {
            return
        }
        
        var area = this.game.area
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
        if (this.retired) {
            return
        }
        // get rotated coordinates
        var newCoors = this.rotateCoors(this.coors)
        var area = this.game.area
        if (! collide(this.x, this.y, newCoors, area)) {
            this.coors = newCoors
        }
    }

    rotateCoors(coors) {
        // rotate coordinates
        var newCoors = coors.map(c => [-c[1], c[0]])
        // find the smallest one
        var m = newCoors.sort(function (c1, c2) {
            return c1[0] == c2[0] ? c1[1] - c2[1] : c1[0] - c2[0]
        })[0]
        // ensure the first one coor with 0 as x coordinate
        return newCoors.map(c => [c[0]-m[0], c[1]-m[1]])
    }

    drop() {
        if (this.game.area.scoring) {
            return  // area 在计分时不能 drop
        }
        while (!this.retired) {
            this.updateY()
        }
    }

    occupy() {
        var board = this.game.area.board
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
        var row, block, area = this.game.area
        for (var c of this.coors) {
            try {
                if (this.y + c[1] + 1 == area.row ||
                    area.board[this.y + c[1] + 1][this.x + c[0]].occupied)
                        return true
            } catch (err) {
                
            }
        }
        return false
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
        if (this.updateCD <= 0) {
            this.updateCD = this.maxUpdateCD
            this.updateY()
        } else {
            this.updateCD--
        }
    }
}

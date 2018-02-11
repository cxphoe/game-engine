class Field {
    constructor (game) {
        this.game = game
        this.board = []
        this.scoring = false
        this.process = null
        this.count = 0
        this.default()
    }

    static instance(game) {
        this.i = this.i || new this(game)
        return this.i
    }

    default() {
        this.row = 20
        this.column = 10
        this.defaultColor = DEFAULT_COLOR
        this.indicateColor = INDICATE_COLOR
        this.fullLinesEchoSpeed = 15    // board 中的满行显示的速度
        this.fullLinesEchoTimes = 3     // 重复显示 board 中满行的次数
    }

    init() {
        for (var i = 0; i < this.row; i++) {
            this.board[i] = []
            var line = this.board[i]
            for (var j = 0; j < this.column; j++) {
                line[j] = {
                    color: this.defaultColor,
                    occupied: false,
                }
            }
        }
    }

    setLine(lineIndex, color, occupied) {
        var line = this.board[lineIndex]
        for (var i = 0; i < this.column; i++) {
            var block = line[i]
            block.color = color
            block.occupied = occupied
        }
    }

    setUpScoreRule(scene) {
        this.scoreFunc = function(rows) {
            scene.countScore(rows)
        }
    }

    draw() {
        var game = this.game
        for (var i = 0; i < this.row; i++) {
            for (var j = 0; j < this.column; j++) {
                game.drawBlock(j, i, this.board[i][j].color)
            }
        }
    }

    update() {
        var lines = []
        for (var i = 0; i < this.row; i++) {
            var full = this.board[i].map((b) => {
                return b.occupied
            }).reduce((prev, cur) => {
                return prev && cur
            })

            if (full) {
                lines.push(i)
            }
        }
        
        if (lines.length > 0) {
            this.scoring = true
            this.lines = lines
            this.score()
        }
    }

    // 通过更新 full lines 的颜色来高亮显示 full lines
    echoFullLines() {
        // 游戏暂停时不更新
        if (this.game.isPaused()) {
            return
        }

        if (this.count++ > this.fullLinesEchoTimes * 2 - 1) {
            this.count = 0
            this.scoring = false
            clearInterval(this.process)
            this.clearFullLines()
            return
        }
        var color = this.count % 2 == 0 ? this.defaultColor 
                                        : this.indicateColor
        this.lines.map((li) => {
            this.setLine(li, color, false)
        })
    }

    clearFullLines() {
        var ls = this.lines
        ls.forEach((li) => {
            var deleted = this.board.splice(li, 1)[0]
            this.board.unshift(deleted)
        })
        this.scoreFunc(ls.length)
        this.lines = null
    }

    score() {
        this.scoring = true
        log('echo full lines...')
        this.process = setInterval(() => {
            this.echoFullLines()
        }, 1000 / this.fullLinesEchoSpeed)
    }
}
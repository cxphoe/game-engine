import {
    generateBlockProb,
    defaultColor,
    occupiedColor,
    indicateColor,
} from '../const'

// 用于表示一个俄罗斯方块活动的区域
export default class GameArea {
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
        // 游戏区域的行数
        this.row = 20
        // 游戏区域的列数
        this.column = 10
        this.defaultColor = defaultColor
        this.indicateColor = indicateColor
        // 以下两项用于设置界面中在清除满行时的高亮显示
        this.fullLinesEchoSpeed = 15    // board 中的满行显示的速度
        this.fullLinesEchoTimes = 3     // 重复显示 board 中满行的次数
    }

    // 初始化board，board用于表示游戏界面的所有方块
    // 初始时将所有方块的颜色设置为默认的颜色，occupied用于表示该方块时候已经被占据
    init() {
        let row = this.row
        for (let i = 0; i < row; i++) {
            this.board[i] = []
            let line = this.board[i]
            for (let j = 0; j < this.column; j++) {
                line[j] = {
                    color: this.defaultColor,
                    occupied: false,
                }
            }
        }
    }

    // 设置初始行
    setPresetLines(num) {
        this.generateRandomRows(num)
    }

    // 设置一整行的方块
    setLine(lineIndex, color, occupied) {
        let line = this.board[lineIndex]
        for (let i = 0; i < this.column; i++) {
            let block = line[i]
            block.color = color
            block.occupied = occupied
        }
    }

    // 生成随机行
    generateRandomRows(num) {
        let lastIndex = this.row - num
        for (let i = this.row - 1; i >= lastIndex; i--) {
            let row = this.board[i]
            for (let j = this.column - 1; j >= 0; j--) {
                let block = row[j]
                let generateBlock = Math.random() <= generateBlockProb
                block.color = generateBlock ? occupiedColor : defaultColor
                block.occupied = generateBlock
            }

            if (this.lineIsFull(row)) {
                let index = Math.floor(Math.random() * 10)
                let block = row[index]
                block.color = defaultColor
                block.occupied = false
            }
        }
    }

    lineIsFull(line) {
        return line.map(b => {
            return b.occupied
        }).reduce((prev, cur) => {
            return prev && cur
        })
    }

    // 设置用于在清除满行的执行的对清除行数计分函数
    setUpScoreRule(func) {
        this.scoreFunc = function(rows) {
            func && func(rows)
        }
    }

    draw() {
        let game = this.game
        for (let i = 0; i < this.row; i++) {
            for (let j = 0; j < this.column; j++) {
                game.drawBlock(j, i, this.board[i][j].color)
            }
        }
    }

    update() {
        let lines = []
        for (let i = 0; i < this.row; i++) {
            if (this.lineIsFull(this.board[i])) {
                lines.push(i)
            }
        }
        
        if (lines.length > 0) {
            this.scoring = true
            this.lines = lines
            this.score()
        }
    }

    score() {
        this.scoring = true
        this.process = setInterval(() => {
            this.echoFullLines()
        }, 1000 / this.fullLinesEchoSpeed)
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
        let color = this.count % 2 == 0 ? this.defaultColor 
                                        : this.indicateColor
        this.lines.map((li) => {
            this.setLine(li, color, false)
        })
    }

    // 在 echoFullLines() 中 full lines 的颜色已设置成
    // defaultColor 因此直接将它移到数组顶部
    clearFullLines() {
        let ls = this.lines
        ls.forEach((li) => {
            let deleted = this.board.splice(li, 1)[0]
            this.board.unshift(deleted)
        })
        this.scoreFunc(ls.length)
        this.lines = null
    }
}
class SceneMain extends GameScene {
    constructor (game) {
        super(game)        
    }

    setup() {
        var that = this
        var game = this.game

        this.bc = BlockComb.instance(game)
        this.pushElement(this.game.field)
        this.pushElement(this.bc)
        game.field.setUpScoreRule(this)

        // 按 '向右箭头' 右移
        game.registerAction(37, function () {
            that.bc.moveLeft()
        }, ['mousedown', 'keydown'])
    
        // 按 '向左箭头' 左移
        game.registerAction(39, function () {
            that.bc.moveRight()
        }, ['mousedown', 'keydown'])
    
        // 按 '向下箭头' 加速
        game.registerAction(40, function () {
            game.speedUp = true
        }, ['mousedown', 'keydown'])
        
        // 松开 '向下箭头' 恢复速度
        game.registerAction(40, function () {
            game.speedUp = false
        }, ['mouseup', 'keyup'])
    
        // 按 '向上箭头' 旋转
        game.registerAction(38, function () {
            that.bc.rotate()
        }, ['mousedown', 'keydown'])

        // 按 '空格' 旋转
        game.registerAction(32, function () {
            that.bc.drop()
        }, ['mousedown', 'keydown'])

        // 按 'R' 重置
        game.registerAction(82, function () {
            that.resetGame()
        }, ['mousedown', 'keydown'])

        // 设置 'P' 成为game的 pause key
        var pauseKeyCode = 80
        game.registerAction(pauseKeyCode, function () {
            game.isPaused() ? game.unpause() : game.pause()
        }, ['mousedown', 'keydown'])
        game.setPauseKeyCode(pauseKeyCode)
    }

    init() {
        this.bc.init()
    }

    addScore(score) {
        var sb = this.game.scoreBoard
        var sprev = sb.getNumber()
        sb.setNumber(score + sprev)
    }

    countScore(rows) {
        if (rows > 0) {
            var ccb = this.game.clearCountBoard
            var cprev = ccb.getNumber()
            ccb.setNumber(rows + cprev)
            
            for (var n = 0; rows > 0; rows--) {
                n += rows
            }

            this.addScore(n * 100)
        }
    }

    resetGame() {
        var game = this.game
        
        game.replaceScene(SceneReset, 'Reset')
        var s = game.storage
        var maxRecord = s.getMaxRecord()
        var lastRecord = game.scoreBoard.getNumber()
        log('last:', lastRecord, 'max', maxRecord)
        if (lastRecord > maxRecord) {
            s.setMaxRecord(lastRecord)
        }
        s.setLastRecord(lastRecord)
    }

    update() {
        var bc = this.bc
        var game = this.game
        var field = game.field        

        if (game.isPaused() || field.scoring) {
            return
        }
        
        if (bc.retired) {
            if (bc.y <= 0) {
                this.resetGame()
            } else {
                bc.occupy()
                field.update()
                if (game.speedUp) {
                    game.speedUp = false
                }
                bc.init()
                this.addScore(10)
            }
        } else {
            bc.update()
        }
    }
}

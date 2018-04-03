import GameScene from '../../game/game_scene'
import BlockComb from './blockcomb'
import SceneReset from '../reset/index'
import ActionController from '../../utils/action_controller'
import {
    linesForEachLevel,
    blockScoreIncrement,
    keySettings,
    clearPoints,
} from '../../const'

export default class SceneMain extends GameScene {
    constructor (game) {
        super(game)
        // 每组方块到达底部时得到的分数
        this.eachBlockScore = 10
        this.clearLines = 0
    }

    setup() {
        let that = this
        let game = this.game
        let area = game.area

        this.bc = BlockComb.instance(game)
        this.pushElement(area)
        this.pushElement(this.bc)
       
        // 设置 area 的计分规则
        area.setUpScoreRule(rows => {
            this.countScore(rows)
        })

        // 注册“左移”按键事件
        let leftCode = keySettings.left.keyCode
        game.registerAction(leftCode, ActionController.new({
            key: 'left',
            begin: 200,
            interval: 100,
            callback() {
                that.bc.moveLeft()
            },
        }))

        // 注册“右移”按键事件
        let rightCode = keySettings.right.keyCode
        game.registerAction(rightCode, ActionController.new({
            key: 'right',
            begin: 200,
            interval: 100,
            callback() {
                that.bc.moveRight()
            },
        }))
        
        // 注册“加速”按键事件
        let speedUpCode = keySettings.speedUp.keyCode
        game.registerAction(speedUpCode, ActionController.new({
            key: 'speedUp',
            callback(clear) {
                that.bc.retired ? clear() : that.bc.updateCD = -10
            },
        }))
        
        // 注册“旋转”按键事件
        let rotateCode = keySettings.rotate.keyCode
        game.registerAction(rotateCode, ActionController.new({
            key: 'rotate',
            once: true,
            callback() {
                that.bc.rotate()
            },
        }))

        // 注册“降落”按键事件
        let dropCode = keySettings.drop.keyCode
        game.registerAction(dropCode, ActionController.new({
            key: 'drop',
            once: true,
            callback() {
                that.bc.drop()
            },
        }))

        // 注册“重置”按键事件
        let resetCode = keySettings.reset.keyCode
        game.registerAction(resetCode, ActionController.new({
            key: 'reset',
            once: true,
            callback() {
                that.resetGame()
            },
        }))

        // 注册“暂停”按键事件，并设置为game的 pause key
        let pauseCode = keySettings.pause.keyCode
        game.registerAction(pauseCode, ActionController.new({
            key: 'pause',
            once: true,
            callback() {
                game.isPaused() ? game.unpause() : game.pause()
            },
        }))
        game.setPauseKeyCode(pauseCode)
    }

    init() {
        let game = this.game

        let level = this.game.getLevel()
        this.bc.setLevel(level)
        // 每次进入场景都行初始化 blockcomb
        this.bc.init()

        let presetLines = game.getLines()
        game.area.setPresetLines(presetLines)

        game.setLineBoardTitle('Cleans')
        game.setLines(0)

        game.setScoreBoardTitle('Points')
        game.setScore(0)

        // 初始化计分的有关信息
        this.eachBlockScore = 10
        this.clearLines = 0
    }

    addScore(score) {
        let game = this.game
        let sprev = game.getScore()
        game.setScore(score + sprev)
    }

    countScore(rows) {
        if (rows > 0) {
            let game = this.game
            let cprev = game.getLines()
            let lineAmount = rows + cprev
            game.setLines(lineAmount)

            this.addScore(clearPoints[rows - 1])

            this.clearLines += rows
            if (this.clearLines >= linesForEachLevel) {
                this.clearLines -= linesForEachLevel
                this.bc.updateLevel()
                this.eachBlockScore += blockScoreIncrement
            }
        }
    }

    resetGame() {
        let game = this.game
         
        game.replaceScene(SceneReset, 'Reset')
        let s = game.storage
        let maxRecord = s.getMaxRecord()
        let lastRecord = game.scoreBoard.getNumber()
        if (lastRecord > maxRecord) {
            s.setMaxRecord(lastRecord)
        }
        s.setLastRecord(lastRecord)
    }

    update() {
        let bc = this.bc
        let game = this.game
        let area = game.area        

        if (game.isPaused() || area.scoring) {
            return
        }
        
        if (bc.retired) {
            if (bc.y < 0) {
                this.resetGame()
            } else {
                bc.occupy()
                this.addScore(this.eachBlockScore)                
                area.update()
                bc.init()
            }
        } else {
            bc.update()
        }
    }
}

import GameScene from '../../game/game_scene'
import BlockComb from './blockcomb'
import SceneReset from '../reset/index'
import ActionController from '../../utils/action_controller'

export default class SceneMain extends GameScene {
    constructor (game) {
        super(game)
    }

    setup() {
        let that = this
        let game = this.game
        let area = game.area

        // 每组方块到达底部时得到的分数
        this.eachBlockScore = 10

        this.bc = BlockComb.instance(game)
        this.pushElement(area)
        this.pushElement(this.bc)
       
        area.setUpScoreRule(rows => {
            this.countScore(rows)
        })

        // 按 '向左箭头' 左移
        game.registerAction(37, ActionController.new({
            key: 'left',
            begin: 200,
            interval: 100,
            callback: (clear) => {
                that.bc.moveLeft()
            },
        }))

        // 按 '向右箭头' 右移
        game.registerAction(39, ActionController.new({
            key: 'right',
            begin: 200,
            interval: 100,
            callback: (clear) => {
                that.bc.moveRight()
            },
        }))
        
        // 按 '向下箭头' 加速
        game.registerAction(40, ActionController.new({
            key: 'down',
            callback: (clear) => {
                that.bc.retired ? clear() : that.bc.updateCD = -10
            },
        }))
        
        // 按 '向上箭头' 旋转
        game.registerAction(38, ActionController.new({
            key: 'up',
            once: true,
            callback: (clear) => {
                that.bc.rotate()
            },
        }))

        // 按 '空格' 降落
        game.registerAction(32, ActionController.new({
            key: 'space',
            once: true,
            callback: (clear) => {
                that.bc.drop()
            },
        }))

        // 按 'R' 重置
        game.registerAction(82, ActionController.new({
            key: 'r',
            once: true,
            callback: (clear) => {
                that.resetGame()
            },
        }))

        // 设置 'P' 成为game的 pause key
        let pauseKeyCode = 80
        game.registerAction(pauseKeyCode, ActionController.new({
            key: 'p',
            once: true,
            callback: (clear) => {
                game.isPaused() ? game.unpause() : game.pause()
            },
        }))
        game.setPauseKeyCode(pauseKeyCode)
    }

    init() {
        this.bc.init()
    }

    addScore(score) {
        let sb = this.game.scoreBoard
        let sprev = sb.getNumber()
        sb.setNumber(score + sprev)
    }

    countScore(rows) {
        if (rows > 0) {
            let ccb = this.game.clearCountBoard
            let cprev = ccb.getNumber()
            ccb.setNumber(rows + cprev)
            
            for (let n = 0; rows > 0; rows--) {
                n += rows
            }

            this.addScore(n * 100)
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

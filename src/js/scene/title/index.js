import GameScene from '../../game/game_scene'
import SceneMain from '../main'
import ActionController from '../../controller/action_controller'
import { speeds, maxStartLines, keySettings } from '../../const'

export default class SceneTitle extends GameScene {
    constructor (game) {
        super(game)
        this.title = document.querySelector('#title')
        // 页面标题闪烁的间隔
        this.showGap = Math.floor(game.fps * 0.75)
        this.scoreShowGap = game.fps * 2
        this.count = 0
        this.titleType = 1
        this.startLevel = 1
        this.maxLevel = speeds.length
        this.startLines = 0
        this.maxStartLines = maxStartLines
    }

    setup() {
        let game = this.game
        let that = this

        let begin = 250
        let interval = 150

        let a = []
        let b = [1, 2, ...a]
        // 注册“降落”按键为开始游戏的按键
        let dropCode = keySettings.drop.keyCode
        game.registerAction(dropCode, ActionController.new({
            key: 'drop',
            begin,
            interval,
            callback() {
                that.startGame()
            },
        }))

        // 注册“向左”按键为降低初始难度
        let leftCode = keySettings.left.keyCode
        game.registerAction(leftCode, ActionController.new({
            key: 'left',
            begin,
            interval,
            callback() {
                that.updateLevel(-1)
            }
        }))

        // 注册“向右”按键为降低初始难度
        let rightCode = keySettings.right.keyCode
        game.registerAction(rightCode, ActionController.new({
            key: 'right',
            begin,
            interval,
            callback() {
                that.updateLevel(1)
            }
        }))

        // 注册“旋转”按键为增加初始行
        let upCode = keySettings.rotate.keyCode
        game.registerAction(upCode, ActionController.new({
            key: 'up',
            begin,
            interval,
            callback() {
                that.updateLines(1)
            },
        }))

        // 注册“加速”按键为减少初始行
        let downCode = keySettings.speedUp.keyCode
        game.registerAction(downCode, ActionController.new({
            key: 'down',
            begin,
            interval,
            callback() {
                that.updateLines(-1)
            },
        }))
    }

    init() {
        let game = this.game

        game.setLevel(this.startLevel)
        game.setLineBoardTitle('Start lines')
        game.setLines(this.startLines)
        game.area.draw()
    }

    startGame() {
        let game =  this.game
        game.replaceScene(SceneMain, 'main')
        this.title.style.visibility = 'hidden'
    }

    update() {
        let t = this.title
        let game = this.game
        // 反复显示标题
        if (this.count % this.showGap == 0) {
            let visible = t.style.visibility == 'visible'
            t.style.visibility = visible ? 'hidden' : 'visible'
        }

        // 反复切换显示“上局游戏分数”，以及“最大游戏分数”
        if (this.count % this.scoreShowGap == 0) {
            let sb = game.scoreBoard
            let s = game.storage
            if (this.titleType) {
                sb.setTitle('Max')
                sb.setNumber(s.getMaxRecord())
            } else {
                sb.setTitle('Last Round')
                sb.setNumber(s.getLastRecord())
            }
            this.titleType = !this.titleType
        }
        this.count++
    }

    updateLevel(num) {
        let level = this.startLevel + num
        if (level < 1) {
            level += this.maxLevel
        } else if (level > this.maxLevel) {
            level -= this.maxLevel
        }

        this.game.setLevel(level)
        this.startLevel = level
    }

    updateLines(num) {
        let lines = this.startLines + num
        if (lines < 0) {
            lines += this.maxStartLines + 1
        } else if (lines > this.maxStartLines) {
            lines -= this.maxStartLines + 1
        }

        this.game.setLines(lines)
        this.startLines = lines
    }
}
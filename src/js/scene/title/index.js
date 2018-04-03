import GameScene from '../../game/game_scene'
import SceneMain from '../main/index'
import ActionController from '../../utils/action_controller'
import { speeds, keySettings } from '../../const'

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
    }

    setup() {
        let game = this.game
        let that = this

        // 获得记录级别的面板，在 title 场景用于记录初始级别
        this.levelBoard = this.game.levelBoard

        // 注册“降落”按键为开始游戏的按键
        let dropCode = keySettings.drop.keyCode
        game.registerAction(dropCode, ActionController.new({
            key: 'drop',
            once: true,
            callback: (clear) => {
                that.startGame()
            },
        }))

        // 注册“向左”按键为降低初始难度
        let leftCode = keySettings.left.keyCode
        game.registerAction(leftCode, ActionController.new({
            key: 'left',
            once: true,
            callback: () => {
                that.updateLevel(-1)
            }
        }))

        // 注册“向右”按键为降低初始难度
        let rightCode = keySettings.right.keyCode
        game.registerAction(rightCode, ActionController.new({
            key: 'right',
            once: true,
            callback: () => {
                that.updateLevel(1)
            }
        }))
    }

    init() {
        let game = this.game

        this.levelBoard.setNumber(this.startLevel)
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

        this.levelBoard.setNumber(level)
        this.startLevel = level
    }
}
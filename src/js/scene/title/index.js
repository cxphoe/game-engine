import GameScene from '../../game/game_scene'
import SceneMain from '../main/index'
import ActionController from '../../utils/action_controller'
import { keySettings } from '../../const'

export default class SceneTitle extends GameScene {
    constructor (game) {
        super(game)
        this.title = document.querySelector('#title')
        // 页面标题闪烁的间隔
        this.showGap = Math.floor(game.fps * 0.75)
        this.scoreShowGap = game.fps * 2
        this.count = 0
        this.titleType = 1
    }

    setup() {
        let game = this.game
        let that = this

        // 注册“降落”按键为开始游戏的按键
        let dropCode = keySettings.drop.keyCode
        game.registerAction(dropCode, ActionController.new({
            key: 'drop',
            once: true,
            callback: (clear) => {
                that.startGame()
            },
        }))
    }

    init() {
        let game = this.game

        game.area.draw()
    }

    startGame() {
        let game =  this.game
        game.replaceScene(SceneMain, 'main')
        game.init()
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
}
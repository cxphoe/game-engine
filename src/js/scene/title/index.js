import GameScene from '../../game/game_scene'
import SceneMain from '../main/index'
import ActionController from '../../utils/action_controller'

export default class SceneTitle extends GameScene {
    constructor (game) {
        super(game)
        this.title = document.querySelector('#title')
        this.showGap = Math.floor(game.fps * 0.75)
        this.titleShowGap = game.fps * 2
        this.count = 0
        this.titleType = 1
    }

    setup() {
        let game = this.game
        let that = this

        // 按 空格 开始游戏
        game.registerAction(32, ActionController.new({
            key: 'space',
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
        if (this.count % this.showGap == 0) {
            let visible = t.style.visibility == 'visible'
            t.style.visibility = visible ? 'hidden' : 'visible'
        }
        if (this.count % this.titleShowGap == 0) {
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
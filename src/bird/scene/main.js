import GameScene from "../../core/game_scene"
import Background from "../components/background"
import Bird from "../components/bird"
import { keySettings } from "../const"
import ActionController from "../../core/action_controller"
import Land from "../components/land"
import config from "../config"
import Pipes from "../components/pipes"
import ScoreBoard from "../components/score_board"
import GuideBoard from "../components/guide_board"
import ResetBoard from "../components/reset_board"

export default class SceneMain extends GameScene {
    constructor (game) {

        super(game)
        this.pipeCd = 2 * game.fps
        this.grades = 0
        this.paused = false
    }

    get pipeTimeInterval() {
        return config.pipeTimeInterval
    }

    setup() {
        this.paused = false
        this.grades = 0
        this.elements = []

        let game = this.game
        let bg = Background.instance(game)
        let land = Land.instance(game)
        let bird = Bird.new(game, () => {
            ResetBoard.instance(game).draw()
            this.paused = true
        })
        /** @type {Pipes} */
        this.pipes = Pipes.new(game, () => this.grade())
        /** @type {Bird} */
        this.bird = bird
        this.board = ScoreBoard.instance(game)
        this.guide = GuideBoard.new(game)

        this.pushElement(bg)
        this.pushElement(this.pipes)
        this.pushElement(land)
        this.pushElement(bird)
        this.pushElement(this.board)
        this.pushElement(this.guide)
        // this.pushElement(ResetBoard.instance(game))

        let spaceCode = keySettings.space.keyCode
        game.registerAction(spaceCode, ActionController.new({
            key: 'space',
            once: true,
            callback: () => {
                !this.paused && bird.flap()
            },
        }))

        let rCode = keySettings.reset.keyCode
        game.registerAction(rCode, ActionController.new({
            key: 'reset',
            once: true,
            callback: () => {
                this.setup()
            },
        }))
    }

    grade() {
        this.grades++
        this.board.setGrades(this.grades)
    }

    update() {
        if (this.paused) {
            this.bird.update()
            return
        }
        super.update()
        let bird = this.bird
        let [x, y] = bird.coors
        let offset = 10
        x += offset
        y += offset
        let [w, h] = bird.sizes
        let pipes = this.pipes
        if (pipes.collide(x, x + w - offset * 2, y, y + h - offset * 2)) {
            this.bird.over()
        }
    }
}
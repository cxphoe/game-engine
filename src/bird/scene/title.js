import GameScene from "../../core/game_scene"
import Background from "../components/background"
import Land from "../components/land"
import Bird from "../components/bird"
import StartBoard from "../components/start_board"
import { keySettings } from "../const"
import ActionController from "../../core/action_controller"
import SceneMain from "./main"


export default class SceneTitle extends GameScene {
    constructor (game) {
        super(game)
    }

    setup() {
        let game = this.game
        let bg = Background.instance(game)
        let land = Land.instance(game)
        let bird = Bird.new(game)
        bird.update = () => {}

        this.pushElement(bg)
        this.pushElement(land)
        this.pushElement(bird)
        this.pushElement(StartBoard.instance(game))

        game.registerAction(keySettings.space.keyCode, ActionController.new({
            key: 'space',
            once: true,
            callback() {
                game.replaceScene(SceneMain, 'main')
            }
        }))
    }
}
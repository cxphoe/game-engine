import DrawingBoard from './drawing_board'
import EventController from './event_controller'

import Clock from './component/clock'
import PauseSign from './component/pause_sign'
import ScoreStorage from './storage/score'

import GameBoard from './game_board'
import GameArea from './game_area'

import SceneReset from '../scene/reset/index'

// 游戏主体
export default class Game extends DrawingBoard {
    constructor(callback) {
        // 得到 id 为 area 的 canvas 作为画板
        super('#area')
        // 设置每个方块的大小
        this.blockSize = this.canvas.width / 10
        // 用来记录 setInterval 返回的循环事件 id,方便取消     
        this.process = null
        // 游戏初始完成之后执行的回调
        this.callbackRun = callback

        this.default()
        this.getComponents()
        this.setupEventController()
        this.__start()
    }
    
    default() {
        this.fps = 45
    }

    getComponents() {
        this.clock = Clock.new()
        this.storage = ScoreStorage.new()
        
        // 分数板
        this.scoreBoard = GameBoard.new('#point span', '#point p')
        // 记录清除行数的面板
        this.lineCountBoard = GameBoard.new('#lines span', '#lines p')
        // 记录当前级别的面板
        this.levelBoard = GameBoard.new('#level span')
        // 暂停标志
        this.pauseSign = PauseSign.new()

        this.area = GameArea.instance(this)
        this.area.init()
    }

    setupEventController() {
        this.eventCtrler = EventController.instance(this)
    }

    setPauseKeyCode(keyCode) {
        this.eventCtrler.setPauseKeyCode(keyCode)
    }

    isPaused() {
        return this.pauseSign.paused
    }

    pause() {
        this.pauseSign.pause()
    }

    unpause() {
        this.pauseSign.unpause()
    }

    // 注册相应键码的事件
    registerAction(keyCode, controller) {
        this.eventCtrler.registerController(keyCode, controller)
    }

    removeAllActions() {
        this.eventCtrler.removeAllCallbacks()
    }

    // 游戏场景替换
    replaceScene(Scene, name) {
        // cancel the registered functions
        // this.removeAllActions()
        this.sceneName = name
        this.scene = Scene.new(this)
        // Scene.new will:
        //      1st: create a singular instance at the first time or
        //      2nd: just initialize the instance
        this.eventCtrler.init()
    }

    drawBlock(x, y, color) {
        super.drawBlock(x, y, this.blockSize, color)
    }

    draw() {
        this.scene.draw()
    }

    update() {
        this.scene.update()
    }

    runloop() {
        //this.clear()
        this.draw()
        this.update()
        this.process = setTimeout(() => {
            this.runloop()
        }, 1000 / this.fps);
    }

    run() {
        this.process = setTimeout(() => {
            this.runloop() 
        }, 1000 / this.fps);
    }

    __start() {
        this.replaceScene(SceneReset)
        this.callbackRun(this)
    }
}

class Game extends DrawingBoard {
    constructor(callback) {
        super('#field')
        this.blockSize = this.canvas.width / 10        
        this.process = null
        this.callbackRun = callback

        this.default()
        this.getComponent()
        this.init()
        this.setupEvent()
        this.__start()
    }
    
    default() {
        this.fps = 30
    }

    init() {
        this.speedUp = false
        this.scoreBoard.setTitle('Point')
        this.scoreBoard.setNumber(0)
        
        this.clearCountBoard.setNumber(0)
    }

    getComponent() {
        this.clock = Clock.new()
        this.storage = ScoreStorage.new()
        
        this.scoreBoard = GameBoard.new('#point span', '#point p')
        this.clearCountBoard = GameBoard.new('#cleans span', '#cleans p')
        this.pauseSign = PauseSign.new()

        this.field = Field.instance(this)
        this.field.init()
    }

    setupEvent() {
        this.eventUtil = EventUtil.instance(this)
    }

    setPauseKeyCode(keyCode) {
        this.eventUtil.setPauseKeyCode(keyCode)
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

    registerAction(keyCode, controller) {
        this.eventUtil.registerController(keyCode, controller)
    }

    removeAllActions() {
        this.eventUtil.removeAllCallbacks()
    }

    replaceScene(Scene, name) {
        // cancel the registered functions
        // this.removeAllActions()
        this.sceneName = name
        this.scene = Scene.new(this)
        // Scene.new will:
        //      1st: create a singular instance at the first time or
        //      2nd: just initialize the instance
        this.eventUtil.init()
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

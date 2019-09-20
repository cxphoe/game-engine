import CoreGame from '../../core/game'

import Clock from '../component/clock'
import PauseSign from '../component/pause_sign'
import ScoreStorage from '../storage/score_storage'

import GameBoard from './game_board'
import GameArea from './game_area'

import SceneReset from '../scene/reset'
import { keySettings } from '../const'

// 游戏主体
export default class Game extends CoreGame {
    constructor(callback) {
        // 得到 id 为 area 的 canvas 作为画板
        super('#area', keySettings)
        // 设置每个方块的大小
        this.blockSize = this.canvas.width / 10
        // 游戏初始完成之后执行的回调
        this.callbackRun = callback

        this.getComponents()
        this.__start()
        this._fps = 45

        this.debug()
    }

    get fps() {
        return this._fps
    }

    set fps(v) {
        this._fps = v
    }

    debug() {
        let $debug = document.querySelector('#debug')
        let input = document.createElement('input')
        input.type = 'range'
        input.max = 250
        input.min = 30
        input.valueAsNumber = this.fps
        input.addEventListener('change', () => {
            this.fps = input.valueAsNumber
            indicator.innerText = this.fps
        })

        let indicator = document.createElement('span')
        indicator.innerText = this.fps

        $debug.innerHTML = ''
        $debug.append(
            input,
            'fps：',
            indicator,
        )
    }

    getComponents() {
        this.clock = Clock.instance()
        this.storage = ScoreStorage.instance()
        
        // 分数板
        this.scoreBoard = GameBoard.new('#point span', '#point p')
        // 记录清除行数的面板
        this.lineCountBoard = GameBoard.new('#lines span', '#lines p')
        // 记录当前级别的面板
        this.levelBoard = GameBoard.new('#level span')
        // 暂停标志
        this.pauseSign = PauseSign.instance()

        this.area = GameArea.instance(this)
        this.area.init()
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

    setLineBoardTitle(str) {
        this.lineCountBoard.setTitle(str)
    }

    setScoreBoardTitle(str) {
        this.scoreBoard.setTitle(str)
    }

    getLines() {
        return this.lineCountBoard.getNumber()
    }

    setLines(num) {
        this.lineCountBoard.setNumber(num)
    }

    getLevel() {
        return this.levelBoard.getNumber()
    }

    setLevel(num) {
        this.levelBoard.setNumber(num)
    }

    getScore() {
        return this.scoreBoard.getNumber()
    }

    setScore(num) {
        this.scoreBoard.setNumber(num)
    }

    drawBlock(x, y, color) {
        let bs = this.blockSize
        let gap = bs / 15
        let space = bs / 10
        let ctx = this.ctx
        
        ctx.fillStyle = color
        // 画外框
        let offsetX = bs * x + gap
        let offsetY = bs * y + gap
        let length = bs - 2 * gap        
        ctx.fillRect(offsetX, offsetY, length, length)
        
        // 请空间隔
        offsetX += gap
        offsetY += gap
        length -= 2 * gap
        ctx.clearRect(offsetX, offsetY, length, length)

        // 画正中间方块
        length -= space * 2
        ctx.fillRect(offsetX + space, offsetY + space,
                     length, length)
    }

    __start() {
        this.replaceScene(SceneReset)
        this.callbackRun(this)
    }
}

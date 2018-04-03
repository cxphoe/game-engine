import EventUtil from '../utils/event_util'
import { keySettings, btnDownState, btnUpState } from '../const'
import { isMobile } from '../utils/function'

let log = console.log.bind()

export default class EventController extends EventUtil {
    constructor(game) {
        super()
        this.game = game
        // pauseKeyCode : a special key to unauthorize the use of all the other keys
        // 用于暂停所有事件的键码
        this.pauseKeyCode = null
        /* keyBinds     : will contain structure as follows 每个键码都会含有以下结构
                {
                    不同的场景会拥有不同的controller
                    sceneControllers: {
                        sceneName1 : controller1（ActionController实例）,
                        sceneName2 : controller2,
                        ...
                    },
                    component: 一个HTMLElement实例,
                    actived: Boolean 表示component有没有被激活,用于防止多次触发,
                }
        */
        this.keyBinds = {}
        
        // 处理设置好的 keySettings
        this.processSettings()
        this.setup()
    }

    setup() {
        // 通过 actived 确保按住键盘不放时，绑定的事件只会触发一次
        const down = (kc, controller) => {
            if (!this.keyBinds[kc].actived) {
                controller.down()
                this.keyBinds[kc].actived = true
            }
        }

        // 释放按键时触发controller的up函数
        const up = (kc, controller) => {
            this.keyBinds[kc].actived = false
            controller.up()
        }

        // 通过id为button的HTMLElement对所有按钮元素进行事件代理
        let buttons = document.querySelector('#button')
        this.addKBHandler(window, 'keydown', btnDownState, down)
        this.addKBHandler(window, 'keyup', btnUpState, up)

        let ism = isMobile()
        const start = ism ? 'touchstart' : 'mousedown'
        const out = 'mouseout'
        const end = ism ? 'touchend' : 'mouseup'
        this.addMouseHandler(buttons, start, btnDownState, down)
        this.addMouseHandler(buttons, end, btnUpState, up)
        this.addMouseHandler(buttons, out, btnUpState, up)
        // 当用户没有在按钮里面结束鼠标事件时，是不会触发 mouseup 事件的
        // 只有用 mouseout 才能保证按键能正常结束，恢复原来的按键状况
    }

    init() {
        for (let k in this.keyBinds) {
            if (this.keyBinds[k]) {
                this.keyBinds[k].actived = false
            }
        }
    }

    setPauseKeyCode(keycode) {
        this.pauseKeyCode = keycode.toString()
    }

    // 处理设置好的 bindings 得到 keyCodes 对应的元素
    processSettings() {
        let settings = keySettings
        const binds = {}
        for (let key in settings) {
            let { keyCode, sel } = settings[key]
            binds[keyCode] = {
                component: document.querySelector(sel),
                sceneControllers: {},
                actived: false,
            }
        }
        this.keyBinds = binds
    }

    // 根据当前的 game.sceneName 来设置 controller (EventController 实例)
    registerController(keyCode, controller) {
        let binds = this.keyBinds[keyCode]
        let sceneName = this.game.sceneName

        if (!binds) {
            binds = this.keyBinds[keyCode] = {
                sceneControllers: {},
                actived: false,
            }
        }
        let sctrls = binds.sceneControllers
        sctrls[sceneName] = controller
    }

    // 对 keybinds 里的对象添加键盘事件
    addKBHandler(element, type, state, callback) {
        log('add', type, 'handler of btns to', element.toString())
        let game = this.game
        this.addHandler(element, type, (event) => {
            this.keyboardHandler(event, state, callback)
        })
    }

    keyboardHandler(event, state, callback) {
        let kc = event.keyCode
        let game = this.game
        // 判断按下的键是否在绑定的键对中
        if (kc in this.keyBinds) {
            let bind = this.keyBinds[kc]
            let paused = game.isPaused()
            let cpn = bind.component
            let ctrl = bind.sceneControllers[game.sceneName] // 得到当前场景对应的注册controller
            if (cpn) {
                // 更新组件的状态
                cpn.className = state
            }
            if (!(paused && kc != this.pauseKeyCode) && ctrl) {
                callback(kc, ctrl)
            }
        }
    }

    // 对 keybinds 里的对象添加鼠标事件
    addMouseHandler(element, type, state, callback) {
        log('add', type, 'handler of btns to btns')
        this.addHandler(window, type, (event) => {
            this.mouseHandler(event, state, callback)
        })
    }

    mouseHandler(event, state, callback) {
        let tgt = this.getTarget(event)
        let paused = this.game.isPaused()
        // 遍历键值对，判断是否有相应的按钮被触发
        for (let kc in this.keyBinds) {
            let bind = this.keyBinds[kc]
            let cpn = bind.component
            let ctrl = bind.sceneControllers[this.game.sceneName]
            if (cpn !== tgt) {
                continue
            }

            cpn.className = state
            if (!(paused && kc !== this.pauseKeyCode) && ctrl) {
                return callback(kc, ctrl)
            }
        }
    }
}

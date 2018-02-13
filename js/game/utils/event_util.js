class EventUtil {
    constructor(game) {
        this.game = game
        // pauseKeyCode : a special key to unauthorize the use of all the other keys
        this.pauseKeyCode = null
        /* keyBinds     : will has attritutes as follows
                {
                    sceneControllers: { 
                        sceneName1 : controller1,
                        sceneName2 : controller2,
                        ... 
                    },
                    component: component,
                    actived: true or false,
                }
        */
        this.keyBinds = {}
        
        this.processRawBinds()
        this.setup()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    setup() {
        // 通过 actived 确保按住键盘不放时，绑定的事件只会触发一次
        const down = (kc, controller) => {
            if (!this.keyBinds[kc].actived) {
                controller.down()
                this.keyBinds[kc].actived = true
            }
        }
        const up = (kc, controller) => {
            this.keyBinds[kc].actived = false
            controller.up()
        }
        var buttons = document.querySelector('#button')
        this.addKBHandler(window, 'keydown', BTN_DOWN_STATE, down)
        this.addKBHandler(window, 'keyup', BTN_UP_STATE, up)
        
        var ism = isMobile()
        const start = ism ? 'touchstart' : 'mousedown'
        const out = 'mouseout'
        const end = ism ? 'touchend' : 'mouseup'
        this.addMouseHandler(buttons, 'mousedown', BTN_DOWN_STATE, down)
        this.addMouseHandler(buttons, 'mouseup', BTN_UP_STATE, up)
        this.addMouseHandler(buttons, 'mouseout', BTN_UP_STATE, up)
        // 当 user 没有在按钮里面结束鼠标事件时，如果是不会触发 mouseup 事件的
        // 只有用 mouseout 才能保证按键能正常结束，恢复原来的按键状况
    }

    init() {
        for (var k in this.keyBinds) {
            if (this.keyBinds[k]) {
                this.keyBinds[k].actived = false
            }
        }
    }

    setPauseKeyCode(keycode) {
        this.pauseKeyCode = keycode.toString()
    }

    // 处理设置好的 bindings 得到 keyCodes 对应的元素
    processRawBinds() {
        var rawBinds = BUTTON_BINDINGS,
            binds = {}
        for (var [keyCode, sel] of rawBinds) {
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
        var binds = this.keyBinds[keyCode],
            sceneName = this.game.sceneName

        if (!binds) {
            binds = this.keyBinds[keyCode] = {
                sceneControllers: {},
                actived: false,
            }
        }
        var sctrls = binds.sceneControllers
        sctrls[sceneName] = controller
    }

    // 对 keybinds 里的对象添加键盘事件
    addKBHandler(element, type, state, callback) {
        log('add', type, 'handler of btns to', element.toString())
        var game = this.game
        this.addHandler(element, type, (event) => {
            this.keyboardHandler(event, state, callback)
        })
    }

    keyboardHandler(event, state, callback) {
        var kc = event.keyCode,
            game = this.game
        if (kc in this.keyBinds) {
            var bind = this.keyBinds[kc],
                paused = game.isPaused(),
                cpn = bind.component,
                ctrl = bind.sceneControllers[game.sceneName] // 得到当前场景对应的注册controller
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
        var e = this.getTarget(event),
            paused = this.game.isPaused()
        log(e)
        for (var kc in this.keyBinds) {
            var bind = this.keyBinds[kc],
                cpn = bind.component,
                ctrl = bind.sceneControllers[this.game.sceneName]
            if (cpn !== e) {
                continue
            }

            cpn.className = state
            if (!(paused && k !== this.pauseKeyCode) && ctrl) {
                return callback(kc, ctrl)
            }
        }
    }

    getEvent() {
        return event ? event : window.event
    }

    getTarget(event) {
        return event.target || event.srcElement
    }

    preventDefault(event) {
        if (event.preventDefault) {
            event.preventDefault()
        } else {
            event.returnValue = false
        }
    }

    stopPropagation(event) {
        if (event.stopPropagation) {
            event.stopPropagation()
        } else {
            event.cancelBubble = true
        }
    }

    addHandler(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler)
        } else if (element.attachEvent) {
            element.attachEvent('on' + type, handler)
        } else {
            element['on' + type] = handler
        }
    }

    removeHandler(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler)
        } else if (element.detachEvent) {
            element.detachEvent('on' + type, handler);
        } else {
            element['on' + type] = handler
        }
    }

}
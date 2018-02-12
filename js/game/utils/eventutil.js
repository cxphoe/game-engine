class EventUtil {
    constructor(game) {
        this.game = game
        // pauseKeyCode : a special key to unauthorize the use of all the other keys
        this.pauseKeyCode = null
        
        this.processRawBinds()
        this.setup()
    }

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
    }

    setup() {
        this.addKBHandler(window, 'keydown', BTN_DOWN_STATE)
        this.addKBHandler(window, 'keyup', BTN_UP_STATE)
        this.addMouseHandler('mousedown', BTN_DOWN_STATE)
        this.addMouseHandler('mouseup', BTN_UP_STATE)
        this.addMouseHandler('mouseout', BTN_UP_STATE)
        // 当 user 没有在按钮里面结束鼠标事件时，如果是不会触发 mouseup 事件的
        // 只有用 mouseout 才能保证按键能正常结束，恢复原来的按键状况
    }

    setPauseKeyCode(keycode) {
        this.pauseKeyCode = keycode
    }

    processRawBinds() {
        var rawBinds = BUTTON_BINDINGS,
            binds = {}
        for (var [keyCode, sel] of rawBinds) {
            binds[keyCode] = {
                component: document.querySelector(sel),
            }
        }
        this.keyBinds = binds
    }

    registerCallback(keyCode, callback, allowed) {
        if (!allowed) {
            throw new Error('::allowed is ' + allowed.toString() + 
                            ' , an ARRAY containing some allowed types is needed to identify specific event types.')
        }
        
        var o = this.keyBinds[keyCode]
        var callback = {
            fn: callback,
            allowed: allowed,
        }
        if (!o) {
            this.keyBinds[keyCode] = {
                callbacks: [callback]
            }
        } else if (!o.callbacks) {
            o.callbacks = [callback]
        } else {
            o.callbacks.push(callback)
        }
    }

    removeAllCallbacks() {
        var cbs = this.keyBinds
        for (var k in cbs) {
            cbs[k].callbacks = null
        }
    }

    isAllowed(keyType, allowed) {
        return allowed.map(t => {
            return t == keyType
        }).reduce((prev, cond) => {
            return prev || cond
        })
    }

    findAllowedFn(event, callbacks) {
        var keyType = event.type
        if (!callbacks) {
            return
        }
        for (var i = 0; i < callbacks.length; i++) {
            var fn = callbacks[i].fn, 
                allowed = callbacks[i].allowed
            if (this.isAllowed(keyType, allowed)) {
                fn(event)
            }
        }
    }

    // 对 keybinds 里的对象添加键盘事件
    addKBHandler(element, type, state) {
        log('add', type, 'handler of btns to', element.toString())
        var game = this.game
        this.addHandler(element, type, (event) => {
            var k = event.keyCode
            if (k != 40) {
                game.speedUp = false
            }

            if (k in this.keyBinds) {
                var o = this.keyBinds[k],
                    paused = game.isPaused(),
                    cpn = o.component,
                    cs = o.callbacks
                if (cpn) {
                    // 更新组件的状态
                    cpn.setAttribute('class', state)
                }
                if (!(paused && k != this.pauseKeyCode) && cs) {
                    this.findAllowedFn(event, cs)
                }
            }
        })
    }

    // 对 keybinds 里的对象添加鼠标事件
    addMouseHandler(type, state) {
        log('add', type, 'handler of btns to btns')
        for (var k in this.keyBinds) {
            var o = this.keyBinds[k]
            if (!o) {
                continue
            }
            this.addBindMouseHandler(type, state, k, o)
        }
    }

    addBindMouseHandler(type, state, key, keyBind) {
        var cpn = keyBind.component
        this.addHandler(cpn, type, (event) => {
            var cs = keyBind.callbacks,
                game = this.game,
                paused = game.isPaused()
            cpn.setAttribute('class', state)
            // check if it is pause key
            if (!(paused && key != this.pauseKeyCode) && cs) {
                this.findAllowedFn(event, cs)
            }
        })
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
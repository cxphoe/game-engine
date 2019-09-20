// 《JS高级程序设计》中的源码
export default class EventUtil {
    constructor() {}

    static instance(...args) {
        this.i = this.i || new this(...args)
        return this.i
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

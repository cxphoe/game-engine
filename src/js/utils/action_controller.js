var events = {}

export default class ActionController {
    constructor(options) {
        this.key = options.key
        this.callback = options.callback || (() => {})
        this.begin = options.begin || 100
        this.interval = options.interval || 50
        this.once = options.once
    }

    static new(options) {
        return new this(options)
    }

    // 键盘按下
    down() {
        this.clearAll()
        this.callback(() => {
            this.up()
        })
        if (this.once === true) {
            return
        }
        this.start = this.begin
        this.loop()
    }

    // 键盘松开
    up() {
        clearTimeout(events[this.key])
        events[this.key] = null
    }

    loop() {
        events[this.key] = setTimeout(() => {
            this.start = null
            this.loop()
            this.callback(() => this.up())
        }, this.start || this.interval)
    }

    // 清除所有触发的回调
    clearAll() {
        for (var k in events) {
            var p = events[k]
            if (p) {
                clearTimeout(events[k])
                events[k] = null
            }
        }
    }
}
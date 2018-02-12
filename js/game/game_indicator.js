class GameIndicator {
    // 用来管理 状态指示器
    constructor(game, component) {
        this.game = game
        this.component = component
    }
    
    static new(...args) {
        return new this(...args)
    }

    setState(state) {
        var cpn = this.component,
            prev = cpn.className,
            vals = prev.split(' ')
        // vals 中是最后一个用来表示显示状态
        vals[vals.length - 1] = state
        cpn.className = vals.join(' ')
    }
}
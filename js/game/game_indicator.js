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
            prev = cpn.getAttribute('class'),
            vals = prev.split(' ')
        // vals 中最后一个用来表示显示状态
        vals[vals.length - 1] = state
        cpn.setAttribute('class', vals.join(' '))
    }
}
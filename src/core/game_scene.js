// 游戏场景的元类
export default class GameScene {
    constructor (game) {
        /** @type {import('./game').default} */
        this.game = game
        this.elements = []
        this.setup()
    }

    static instance(game) {
        this.i = this.i || new this(game)
        this.i.init()
        return this.i
    }

    setup() {}

    init() {}

    // 直接触发所有子元素的 draw
    draw() {
        for (var e of this.elements) {
            e.draw()
        }
    }

    update() {
        for (var e of this.elements) {
            e.update()
        }
    }

    pushElement(elt) {
        this.elements.push(elt)
    }

    removeElement(elt) {
        let index = this.elements.indexOf(elt)
        if (index > -1) {
            this.elements.splice(index, 1)
        }
    }
}

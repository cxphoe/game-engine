class GameScene {
    constructor (game) {
        this.game = game
        this.elements = []
    }

    static new(game) {
        this.i = this.i || new this(game)
        this.i.init()
        return this.i
    }

    setup() {}

    init() {}

    draw() {
        for (var e of this.elements) {
            e.draw()
        }
    }

    update() {}

    pushElement(elt) {
        this.elements.push(elt)
    }
}
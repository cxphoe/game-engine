import { imgs } from './const'
import Game from './game/game'
import debug from './debug'
import './style/index.less'

const preloadImgs = async () => {
    let keys = Object.keys(imgs)
    let count = keys.length
    return new Promise((resolve) => {
        if (count === 0) {
            return resolve()
        }
        const decrease = () => {
            count--
            if (count === 0) {
                resolve()
            }
        }
        for (let key of keys) {
            const image = new Image()
            image.src = imgs[key]
            image.onload = () => {
                imgs[key] = image
                decrease()
            }
            image.onerror = decrease
        }
    })
}

window.onload = async () => {
    await preloadImgs()
    debug()

    let g = new Game()
    g.run()
}

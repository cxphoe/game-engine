import bird0 from './img/bird_0.png'
import bird1 from './img/bird_1.png'
import bird2 from './img/bird_2.png'
import pipe from './img/bot_pipe.png'
import label from './img/label_bg.png'
import land from './img/land.png'
import sky from './img/sky.png'
import topPipe from './img/top_pipe.png'

const imgs = {
    bird0,
    bird1,
    bird2,
    pipe,
    label,
    land,
    sky,
    topPipe,
}

// 按键设置：
//     keyCode 为按键相应的键码
//     sel 为按键在 HTML 中的 id ，用于做选择器
const keySettings = {
    space: {
        keyCode: 32,            // 空格
    },
    reset: {
        keyCode: 82,            // R键
    },
}

export {
    imgs,
    keySettings,
}

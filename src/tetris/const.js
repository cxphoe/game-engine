// 方块组合的类型
const blockType = [ 
                    [[0, 0], [1, 0], [2, 0], [3, 0]],
                    [[0, 0], [0, 1], [1, 0], [1, 1]],
                    [[0, 1], [1, 0], [1, 1], [2, 1]],
                    [[0, 0], [0, 1], [1, 1], [2, 1]],
                    [[0, 1], [1, 1], [2, 0], [2, 1]],
                    [[0, 0], [1, 0], [1, 1], [2, 1]],
                    [[0, 1], [1, 0], [1, 1], [2, 0]],
]

// 计分规则：消除行数与相应的分数
const clearPoints = [100, 300, 500, 800]

// 游戏不同的级别相应的游戏速度；自动根据该数组判断最大级别
const speeds = [800, 650, 500, 400, 300, 200]

// 级别相对应的方块组合的在移动时的延迟
const delays = [50, 60, 70, 80, 90, 100]

// 代表每消除该数目的行数时，游戏会更新级别
const linesForEachLevel = 20

// 代表在游戏在每次更新级别后方块落地的分数增量
const blockScoreIncrement = 2

// 代表在随机生成方块时的概率
const generateBlockProb = 0.6

// 能够生成的最多的初始行数目
const maxStartLines = 10

// 按键设置：
//     keyCode 为按键相应的键码
//     sel 为按键在 HTML 中的 id ，用于做选择器
const keySettings = {
    rotate: {
        keyCode: 38,            // 方向键向上
        sel: '#rotate_btn',
    },
    speedUp: {
        keyCode: 40,            // 方向键向下
        sel: '#down_btn',
    },
    left: {
        keyCode: 37,            // 方向键向左
        sel: '#left_btn',
    },
    right: {
        keyCode: 39,            // 方向键向右
        sel: '#right_btn',
    },
    drop: {
        keyCode: 32,            // 空格
        sel: '#drop_btn',
    },
    pause: {
        keyCode: 80,            // P键
        sel: '#pause_btn',
    },
    reset: {
        keyCode: 82,            // R键
        sel: '#reset_btn',
    },
}

// 按钮按下，松开的类名
const btnDownState = 'pressed'
const btnUpState = ''

// 暂停标志暂停，不暂停的类名
const pauseState = 'paused'
const unpauseState = 'unpaused'

// 游戏时钟滴答的类名
const tikState = 'tik'
const tokState = 'tok'

const defaultColor = 'rgb(135, 147, 100)'    // 方块没有被占据时的颜色
const occupiedColor = 'rgb(0, 0, 0)'         // 方块被占据时的颜色
const indicateColor = 'rgb(180, 0, 0)'       // 高亮显示方块时的颜色

export {
    blockType,
    clearPoints,
    speeds,
    delays,
    linesForEachLevel,
    blockScoreIncrement,
    generateBlockProb,
    maxStartLines,
    keySettings,
    btnDownState,
    btnUpState,
    pauseState,
    unpauseState,
    tikState,
    tokState,
    defaultColor,
    occupiedColor,
    indicateColor,
}
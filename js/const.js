const BLOCKTYPE  = [[[0, 0], [1, 0], [2, 0], [3, 0]],
                    [[0, 0], [0, 1], [1, 0], [1, 1]],
                    [[0, 1], [1, 0], [1, 1], [2, 1]],
                    [[0, 0], [0, 1], [1, 1], [2, 1]],
                    [[0, 1], [1, 1], [2, 0], [2, 1]],
                    [[0, 0], [1, 0], [1, 1], [2, 1]],
                    [[0, 1], [1, 0], [1, 1], [2, 0]],
                ]

// button_bindings : contains [keyCode, sel] pairs
// sel             : the id of related button
const BUTTON_BINDINGS = [[38, '#rotate_btn'], // arrow up
                         [40,   '#down_btn'], // arrow down
                         [37,   '#left_btn'], // arrow left
                         [39,  '#right_btn'], // arrow right
                         [32,   '#drop_btn'], // space
                         [80,  '#pause_btn'], // p
                         [82,  '#reset_btn'], // r
                        ]

const BTN_DOWN_STATE = 'pressed'
const BTN_UP_STATE = ''

const PAUSE_STATE = 'paused'
const UNPAUSE_STATE = 'unpaused'

const TIK_STATE = 'tik'
const TOK_STATE = 'tok'

const DEFAULT_COLOR = 'rgb(135, 147, 100)'    // 方块没有被占据时的颜色
const OCCUPIED_COLOR = 'rgb(0, 0, 0)'         // 方块被占据时的颜色
const INDICATE_COLOR = 'rgb(180, 0, 0)'       // 高亮显示方块时的颜色

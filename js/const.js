const BLOCKTYPE  = [[[0, 0], [1, 0], [2, 0], [3, 0]],
                    [[0, 0], [0, 1], [1, 0], [1, 1]],
                    [[0, 1], [1, 0], [1, 1], [2, 1]],
                    [[0, 0], [0, 1], [1, 1], [2, 1]],
                    [[0, 1], [1, 1], [2, 0], [2, 1]],
                    [[0, 0], [1, 0], [1, 1], [2, 1]],
                    [[0, 1], [1, 0], [1, 1], [2, 0]],
                ]

// button_bindings : contains [keyCode, sel] pairs
// sel             : the id of container containing the button
const BUTTON_BINDINGS = [[38, 'rotate'], // arrow up
                         [40,   'down'], // arrow down
                         [37,   'left'], // arrow left
                         [39,  'right'], // arrow right
                         [32,   'drop'], // space
                         [80,  'pause'], // p
                         [82,  'reset'], // r
                        ]
// btnContainer    : a selector to find the exact same button
//                   container with different html element
const BTNCONTAINER = 'i'

const BTN_DOWN_STATE = 'pressed'
const BTN_UP_STATE = ''

const PAUSE_STATE = 'paused'
const UNPAUSE_STATE = 'unpaused'

const TIK_STATE = 'tik'
const TOK_STATE = 'tok'

const DEFAULT_COLOR = 'rgb(135, 147, 100)'    // 方块没有被占据时的颜色
const OCCUPIED_COLOR = 'rgb(0, 0, 0)'         // 方块被占据时的颜色
const INDICATE_COLOR = 'rgb(180, 0, 0)'       // 高亮显示方块时的颜色

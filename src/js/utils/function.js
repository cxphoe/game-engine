// 用于判断坐标组合组合是否会与游戏区域冲突
var collide = function (x, y, coors, area) {
    // x 为方块组合的 x 轴的基准坐标
    // y 为方块组合的 y 轴的基准坐标
    // 坐标数组是已经以 x 坐标也就是 coors[0] 为优先排序过了
    if (x + coors[0][0] < 0 || x + coors[3][0] >= area.column) {
        return true
    }

    return coors.map((c) => {
        // y + c[1] < 0 means the block is above the field
        // so literally it dosen't collides
        var coorY = y + c[1]
        return !(coorY < 0 || !area.board[coorY][x + c[0]].occupied)
    }).reduce((prev, cond) => {
        return prev || cond
    })
}

// 计算坐标组合的 x 坐标或 y 坐标的差
var coorDiff = function (coors, index) {
    var array = coors.map(c => {
        return c[index]
    })

    return Math.max(...array) - Math.min(...array)
}

var coorCompare = function (coor1, coor2) {
    return coor1[0] == coor2[0]
        ? coor1[1] - coor2[1]
        : coor1[0] - coor2[0]
}

// 判断是否为移动端
var isMobile = function () {
    const ua = navigator.userAgent
    const android = /Android (\d+\.\d+)/.test(ua)
    const iphone = ua.indexOf('iPhone') > -1
    const ipod = ua.indexOf('iPod') > -1
    const ipad = ua.indexOf('iPad') > -1
    const nokiaN = ua.indexOf('NokiaN') > -1
    return android || iphone || ipod || ipad || nokiaN
}

export {
    collide,
    coorDiff,
    coorCompare,
    isMobile,
}
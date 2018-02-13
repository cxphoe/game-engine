
var randBlockType = function () {
    var bt = BLOCKTYPE
    return bt[Math.floor(Math.random() * bt.length)]
}

var rotateCoors = function (coors) {
    // rotate coordinates
    var newCoors = coors.map(c => [-c[1], c[0]])
    // find the smallest one
    var m = newCoors.sort(function (c1, c2) {
        return c1[0] == c2[0] ? c1[1] - c2[1] : c1[0] - c2[0]
    })[0]
    // ensure the first one coor with 0 as x coordinate
    return newCoors.map(c => [c[0]-m[0], c[1]-m[1]])
}

var collide = function (x, y, coors, field) {
    if (x < 0 || x + coors[3][0] >= field.column) {
        return true
    }

    return coors.map((c) => {
        // y + c[1] < 0 means the block is above the field
        // so literally it dosen't collides
        var coorY = y + c[1]
        return !(coorY < 0 || !field.board[coorY][x + c[0]].occupied)
    }).reduce((prev, cond) => {
        return prev || cond
    })
}

var coorDiff = function (coors, index) {
    var array = coors.map(c => {
        return c[index]
    })
    return array.reduce((max, num) => {
        return Math.max(max, num)
    }) - array.reduce((min, num) => {
        return Math.min(min, num)
    })
}

var getLocalStorage = function () {
    if (typeof localStorage == 'object') {
        return localStorage
    } else if (typeof globalStorage == 'object') {
        return globalStorage[location.host]
    } else {
        console.warn('Local storage not available. Your record will be forgetted after leave')
        return {}
    }
}

var isMobile = function () {
    // 判断是否为移动端
    const ua = navigator.userAgent;
    const android = /Android (\d+\.\d+)/.test(ua);
    const iphone = ua.indexOf('iPhone') > -1;
    const ipod = ua.indexOf('iPod') > -1;
    const ipad = ua.indexOf('iPad') > -1;
    const nokiaN = ua.indexOf('NokiaN') > -1;
    return android || iphone || ipod || ipad || nokiaN;
}

var getBrowserInterfaceSize = function () {
    var pageWidth = window.innerWidth;
    var pageHeight = window.innerHeight;

    if (typeof pageWidth != "number") {
        //在标准模式下面
        if (document.compatMode == "CSS1Compat" ) {
            pageWidth = document.documentElement.clientWidth;
            pageHeight = document.documentElement.clientHeight;
        } else {
            pageWidth = document.body.clientWidth;
            pageHeight = window.body.clientHeight;
        }
    }

    return {
        pageWidth: pageWidth,
        pageHeight: pageHeight
    }
}

var nullFunc = function () {}

var log = console.log.bind()
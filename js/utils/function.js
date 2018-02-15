var collide = function (x, y, coors, area) {
    if (x < 0 || x + coors[3][0] >= area.column) {
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
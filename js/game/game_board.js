class GameBoard {
    // Board 用来管理跟数字有关的 elements
    constructor(components, titleCpn, defaultNum) {
        this.numElts = components
        this.titleCpn = titleCpn
        this.default(defaultNum)
        //log(this.defaultState)
    }

    static new(...args) {
        return new this(...args)
    }

    // 设置数字的默认状态
    default(defaultNum) {
        if (defaultNum == undefined) {
            this.defaultState = 'default'
        } else {
            this.defaultState = 'n' + defaultNum
        }
    }

    setTitle(str) {
        this.titleCpn.innerText = str
    }

    // 通过判断元素的样式来计算所显示的数字的大小
    getNumber() {
        var lastChar, eltClass, n, sum = 0
        for (var i = this.numElts.length - 1; i >= 0; i--) {
            eltClass = this.numElts[i].className
            lastChar = eltClass[eltClass.length-1]
            n = parseInt(lastChar)
            if (!isNaN(n)) {
                sum = 10 * sum + n
            }
        }
        return sum
    }

    // 通过改变元素的样式来改变显示的数字
    setNumber(num) {
        var r, length = this.numElts.length
        for (var i = 0; i < length && num > 0; i++) {
            r = num % 10
            this.setDigit(r, this.numElts[i])
            num = (num - r) / 10
        }

        if (i == 0) {
            this.setDigit(0, this.numElts[0])
            i++
        }
        for (; i < length; i++) {
            this.setDigit(null, this.numElts[i])
        }
    }

    // digit 为 null 时设置默认的数字状态
    // 否则就设置与 digit 相对应的数字状态
    setDigit(digit, elt) {
        // 得到原始的状态
        var state = elt.className.split(' ')
        if (digit != null) {
            // 将表示数字状态的 class 改为与 digit 相对应的 class
            state[state.length - 1] = 'n' + digit
        } else {
            // 将数字状态设置为默认
            state[state.length - 1] = this.defaultState
        }
        elt.className = state.join(' ')
    }
}
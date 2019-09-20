export default class GameBoard {
    // Board 用来管理跟数字有关的 HTMLElement 实例
    constructor(eltsSel, titleSel) {
        this.numElts = document.querySelectorAll(eltsSel)
        if (titleSel) {
            this.titleCpn = document.querySelector(titleSel)
        }
    }

    static new(...args) {
        return new this(...args)
    }

    setTitle(str) {
        this.titleCpn.innerText = str
    }

    // 通过判断元素的样式来计算所显示的数字的大小
    getNumber() {
        let lastChar, eltClass, n, sum = 0
        for (let i = this.numElts.length - 1; i >= 0; i--) {
            eltClass = this.numElts[i].className
            lastChar = eltClass == '' ? 0 : eltClass[eltClass.length-1]
            n = parseInt(lastChar)
            if (!isNaN(n)) {
                sum = 10 * sum + n
            }
        }
        return sum
    }

    // 通过改变元素的样式来改变显示的数字
    setNumber(num) {
        let r, length = this.numElts.length
        let i = 0
        for (; i < length && num > 0; i++) {
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

    // digit 为 null 时清除状态
    // 否则就设置与 digit 相对应的数字状态
    setDigit(digit, elt) {
        elt.className = digit == null ? '' : 'n' + digit
    }
}
const keys = {
    lastRecordKey: "tetris-last-record",
    maxRecordKey: "tetris-max-record",
}

export default class ScoreStorage {
    constructor() {
        this.storage = this.getLocalStorage()
    }

    static new() {
        return new this()
    }

    getLocalStorage() {
        if (typeof localStorage == 'object') {
            return localStorage
        } else if (typeof globalStorage == 'object') {
            return globalStorage[location.host]
        } else {
            console.warn('Local storage not available. Your record will be forgetted after leave')
            return {}
        }
    }

    getRecord(key) {
        var num = parseInt(this.storage[key])
        return isNaN(num) ? 0 : num
    }

    setRecord(key, val) {
        this.storage[key] = val
    }

    getLastRecord() {
        return this.getRecord(keys.lastRecordKey)
    }

    setLastRecord(num) {
        this.setRecord(keys.lastRecordKey, num)
    }

    getMaxRecord() {
        return this.getRecord(keys.maxRecordKey)
    }

    setMaxRecord(num) {
        this.setRecord(keys.maxRecordKey, num)
    }

}
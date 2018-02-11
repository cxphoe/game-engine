const keys = {
    lastRecordKey: "tetris-last-record",
    maxRecordKey: "tetris-max-record",
}

class ScoreStorage {
    constructor() {
        this.storage = getLocalStorage()
    }

    static new() {
        return new this()
    }

    getRecord(key) {
        var num = parseInt(this.storage.getItem(key))
        return isNaN(num) ? 0 : num
    }

    setRecord(key, val) {
        this.storage.setItem(key, val)
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
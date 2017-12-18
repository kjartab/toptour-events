const Event = require('./Event')

class UtnoEvent extends Event {}

const ChangeTypes = Object.freeze({
    UPDATE:   Symbol("update"),
    DELETE:  Symbol("delete"),
    CREATED: Symbol("created")
})

class UtnoChangeEvent extends Event {
    
    constructor(data, changeType, diff) {
        super(data)
        this.type = changeType
        this.diff = diff
    }
}
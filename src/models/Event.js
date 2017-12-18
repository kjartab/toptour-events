const uuidv4 = require('uuid/v4');

class Event {
    constructor(data) {
        super();            
        this.id = uuidv4()
        this.created = new Date().toISOString(),
        this.data = data;
    }
}
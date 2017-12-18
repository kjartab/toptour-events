const uuidv4 = require('uuid/v4')

const enqueueUpdates = async (utApi, messageHandler, type, parameters) => {
    
    var total = Infinity
    parameters = parameters || { limit : 50, skip : 0 }
    while (parameters.skip <= total) {
        var res = await utApi.getDocuments(type, parameters)
        var updates = res.body        
        total = updates.total
        parameters.skip += 50
        await publishEvents(utApi, messageHandler, type, updates.documents)
    }
}

const createEvent = (type, object) => ({ 
    id: uuidv4(),
    created: new Date().toISOString(),
    type: type,
    data : object
})

const publishEvents = async (utApi, messageHandler, type, updates) => {
    for (let update of updates) {
        var res = await utApi.getDocumentById(type, update._id)
        messageHandler.sendEvent(type, createEvent(res.body))
    }
}

module.exports = {
    enqueueUpdates : enqueueUpdates
}
const utnoPoller = require('../eventCreators/utnoPoller')
const utApi = require('../apis/utno')
const messageHandler = require('../messageHandlers/queues/utno')

var parameters = { after: '2017-11-01T00:00:38', skip: 0, limit: 50 }
try {
    utnoPoller.enqueueUpdates(utApi, messageHandler, parameters)
}
catch (e) {
    console.log(e)
}
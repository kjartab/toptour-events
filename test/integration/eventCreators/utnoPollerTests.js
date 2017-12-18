const utnoPoller = require('../../../src/eventCreators/utnoPoller')
const utApi = require('../../../src/apis/utno')

var params = { after : '2017-01-01T00:00:38', limit : 50, skip : 0 };

const postgresHandler = (() => {
    
})()

const messageHandler = (function() {

    events = []
    
    sendEvent = (event) => {
        events.push(event)
    }

    return {
        sendEvent: sendEvent,
        events: events
    }

})();

main = async () => {
    await utnoPoller.enqueueUpdates(utApi, messageHandler, 'turer', params)
}

main()

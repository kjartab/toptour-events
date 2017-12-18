const utnoDb = require('./utnoDb')

const sendEvent = async (event) => {
    await utnoDb.storeEvent(event)
}

export default sendEvent
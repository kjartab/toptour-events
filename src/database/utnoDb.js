const utnoDb = require('../database/utDb')

const getRowsByIds = async(table, ids) => {
    utnoDb.query()
}

const getRowById = async(table, id) => {
    utnoDb.query()
}

const storeEvent = async(table, event) => {
    utnoDb.storeRow(event.type, event.id, event.data, event.created)
}
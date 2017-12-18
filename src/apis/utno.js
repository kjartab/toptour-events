var request = require('request')
require('dotenv').config()
const host = process.env.API_URL
const apiKey = process.env.API_KEY
console.log(host)
const getDocuments = async (type, parameters) => { 
    var url = host + "/" + type
    return await get(url, parameters)
}

const getDocumentById = async (type, id) => {
    console.log(type, id)
    if (!id) {
        throw new Error("id undefined")
    }
    var url = host + "/" + type + "/" + id
    return await get(url)
}

const get = async (url, parameters) => {
    console.log(url)
    return new Promise(async (resolve, reject) => {
        parameters = parameters || {};
        parameters['api_key'] = apiKey;
        
        request.get({url:url, qs:parameters, json:true }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
              resolve({error, response, body})
            } else {
              reject({error, response, body})
            }
        })
    })
}

module.exports = {
    getDocuments : getDocuments, 
    getDocumentById : getDocumentById
}
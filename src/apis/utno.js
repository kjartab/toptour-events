var request = require('request')
var host = "https://dev.nasjonalturbase.no"
var apiKey = ""

const getDocuments = async (type, parameters) => { 
    var url = host + "/" + type
    return await get(url, parameters)
}

const getDocumentById = async (type, id) => {
    if (!id) {
        throw new Error("id undefined")
    }
    var url = host + "/" + type + "/" + id
    console.log(url)
    return await get(url)
}

const get = async (url, parameters) => {
    
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
const utApi = require('./utApi.js');
const utDb = {}

const updateDocument = (type, id) => {
    return new Promise( async (resolve, reject) => {
        try {
            var doc = await utApi.getDocument(type, id);
            await utDb.updateDocument(type, id, doc);
            resolve({type: type, updated: id});
        } catch (error) {
            if (error.httpStatusCode) {
                switch (error.httpStatusCode) {
                    case 404:
                        try {
                            await utDb.deleteDocument(type, id);
                            resolve({ type : type, deleted: id});
                        } catch (error) {
                            reject(error);
                        }
                        
                    default:
                        reject(error);
                }
            } else {
                reject(error);
            }
        }
    });
}

function insertDocument(type, id) {
    return new Promise( async (resolve, reject) => {
        try {
            var doc = await utApi.getDocument(type, id);
            await utDb.insertDocument(type, id, doc);
            resolve({ type: type, inserted: id});
        } catch (error) {
            reject(error);
        }
    });
}

const mergeInUpdates = async (type, docUpdates, onUpdateCallback) => {

    return new Promise(async (resolve, reject) => {

        try {

             var ids = docUpdates.map((upd) => upd._id);

            if (ids.length === 0) {
                resolve({ type: type, "message" : "no IDs" });
            } else {

                var updateDocPromises = [];
                var dbDocs = {};
                var dbDocArray = await utDb.getDocumentsByIds(type, ids);

                for (let row of dbDocArray) {
                    dbDocs[row.id] = row.attribs;
                }

                for (let upd of docUpdates) {

                    if (dbDocs.hasOwnProperty(upd._id)) { 

                        if (dbDocs[upd._id].endret !== upd.endret) {
                            updateDocPromises.push(updateDocument(type, upd._id));
                        }

                    } else {
                        updateDocPromises.push(insertDocument(type, upd._id));
                    }
                }


                Promise.all(updateDocPromises)
                .then((data) => { resolve(); })
                .catch((error) => { console.log(error); reject(error); });

                // updateDocPromises
                // if update actually happened: send message

            }
        } catch (error) {
            console.log(error);
            reject(error);

        }    
    
    });
}

const handleUpdates = async (type, since, onUpdateCallback) => {

    let total;
    var parameters = parameters || { after : since, limit : 50, skip : 0 };

    while (parameters.skip < ( total || Infinity )) {

        try {
            var updates = await utApi.getDocuments(type, parameters);
            await mergeInUpdates(type, updates.documents, onUpdateCallback);
            total = updates.total;
            parameters.skip += 50;
        } catch (error) {
            break;
        }
    }
}

// utDb.createGeomJsonbTable("turer");
// utDb.createGeomJsonbTable("omrader");
// utDb.createGeomJsonbTable("steder");
// utDb.createGeomJsonbTable("bilder");
// utDb.createGeomJsonbTable("grupper");

// var since = '2017-05-27T00:00:38';
// // var now = new Date();
// // var since = new Date(now - (3600*1000*24*1));

// handleUpdates("turer", since);
// handleUpdates("omrader", since);
// handleUpdates("steder", since);
// handleUpdates("bilder", since);
// handleUpdates("grupper", since);



// console.log(d.getFullYear() + '-' + d.getMonth()+1 + '-' + d.getDate());
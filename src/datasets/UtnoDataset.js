const Dataset = require('./Dataset')

class UtnoDataset extends Dataset {
    
    async fetchUpdates(utDb, api, minUpdateTime, parameters) {
        
        let total;
        let parameters = parameters || { after : minUpdateTime, limit : 50, skip : 0 };
        
        while (parameters.skip < ( total || Infinity )) {
            
            try {
                var updates = await api.getDocuments(type, parameters);
                await mergeInUpdates(type, updates.documents, onUpdateCallback);
                total = updates.total;
                parameters.skip += 50;
            } catch (error) {
                break;
            }
        }
    }
    
    async deleteObject(id) {
        await utDb.deleteRow(this.tableName, id);
    }

    async insertObject(id) {
        var object = await api.getDocumentById(this.name, id);
        await utDb.insertRow(this.tableName, object);
    }

    async updateObject(id) {
        var object = await api.getDocumentById(this.name, id);
        await utDb.updateRow(this.tableName, object)
    }

    async getObjectsById(ids) {
        return await utDb.getRows(this.tableName, ids);
    }

    async mergeInUpdates(type, apiUpdates, onUpdateCallback) {
    
        return new Promise(async (resolve, reject) => {
            
            var ids = apiUpdates.map((updates) => update._id);
            var dbDocs = await getObjectsById(ids);
            var updateDbRowPromises = []; 
            
            for (let update of apiUpdates) {

                if (dbDocs.hasOwnProperty(update._id)) { 
                    if (dbDocs[update._id].endret !== update.endret) {
                        updateDbRowPromises.push(updateDocument(type, update._id));
                        continue;
                    }
                }

                updateDbRowPromises.push(insertDocument(type, update._id));
            }

            Promise.all(updateDbRowPromises)
            .then((data) => { resolve(); })
            .catch((error) => { console.log(error); reject(error); });
            
        });
    }
}


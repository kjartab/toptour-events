const utnoApi = require('../../../src/apis/utno')
var expect = require("chai").expect

describe('Utno get request tests', () => {

    it('Get document by id', async () => {
        var res = await utnoApi.getDocumentById('turer', '524081f9b8cb77df15000b51')
        expect(res.response.statusCode).to.equal(200)
    })
    
    it('Get documents after date', async () => {
        let params = { after : '2017-01-01T00:00:00', limit : 10, skip : 0 }
        var res = await utnoApi.getDocuments('turer', params)
        expect(res.response.statusCode).to.equal(200)
        expect(res.body.documents.length).to.equal(10)
        res.body.documents.forEach((d) => {
            expect(new Date(d.endret)).to.be.above(new Date( '2017-01-01T00:00:00'))
        })
    })
    
})

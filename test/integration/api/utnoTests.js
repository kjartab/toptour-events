const utnoApi = require('../../src/apis/utno')
var expect = require("chai").expect

describe('sample tests:', () => {

    it('Get document by id', async () => {
        var res = await utnoApi.getDocumentById('turer', '524081f9b8cb77df15000b51')
        expect(res.response.statusCode).to.equal(200)
    })
    
})

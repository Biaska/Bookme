const request = require("supertest");
const app = require("../index.js");
const Connection = require('../db/db.js')
const queries = require('../db/sql-queries.cjs')

describe('Test the create business method', async () => {
    beforeAll(async() => {
        const con = new Connection();
        await con.connect()
    });
    it("Test create a business", async () => {
        try {
            const res = await con.openQuery(queries.tests.createBusiness);
        } catch(e) {
            console.log(e);
            expect(false).toBe(true);
        } finally {
            expect(res.rowCount).toBe(1);
        }
    });
    it("Test delete a business", async () => {
        try
        {
            const res = await con.openQuery(queries.tests.deleteBusiness)
        } catch(e) {
            console.log(e);
            expect(false).toBe(true);
        } finally {
            expect(res.rowCount).toBe(1)
        }
    })
    afterAll(async (done) => {
        await con.end();
        done();
    });
})
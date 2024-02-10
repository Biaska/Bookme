const { Client } = require('pg')
const fs = require('fs');
const queries = require('./sql-queries.cjs')

class Connection {

    constructor() {
        this.client = new Client({
            user: process.env.POSTGRESQL_USER,
            host: process.env.POSTGRESQL_HOST,
            database: process.env.POSTGRESQL_DB,
            password: process.env.POSTGRESQL_PASSWORD,
            port: process.env.POSTGRESQL_PORT,
            ssl: true,
        })
    }

    async resetDatabase() {
        await this.client.connect();

        try {
            let res = await this.client.query(queries.foreignChecks.off)
            console.log(res)
            res = await this.client.query(queries.drop)
            console.log(res)
            res = await this.client.query(queries.createDatabase)
            console.log(res)
            res = await this.client.query(queries.foreignChecks.on)
            console.log(res)
            console.log("DATABASE RESET")
        } catch(e) {
            console.error(e);
        } finally {
            await this.client.end();
        }
    } 

    async insertSampleData() {
        await this.client.connect();

        try {
            let res = await this.client.query(queries.foreignChecks.off)
            console.log(res)
            res = await this.client.query(queries.insertSampleData)
            console.log(res)
            res = await this.client.query(queries.foreignChecks.on)
            console.log(res)
            console.log("Sample Data Inserted")
        } catch(e) {
            console.error(e);
        } finally {
            await this.client.end();
        }
    } 

    async query(stringQuery, parameters) {

        await this.client.connect();       

        let res;

        try {
            if (parameters === undefined) {
                res = await this.client.query(stringQuery);
            } else {
                res = await this.client.query(stringQuery, parameters);
            }
         } catch (err) {
            console.error(err);
            return err
         } finally {
            await this.client.end();
            return res;
         } 
    }

    
}

module.exports = Connection
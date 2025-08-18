const { Client } = require('pg')
const fs = require('fs');
const queries = require('./sql-queries.cjs');
const { env, pgSsl } = require("./config");

class Connection {

    // Connect to database and save client
    constructor() {
        this.client = new Client({
            user: env.POSTGRESQL_USER,
            host: env.POSTGRESQL_HOST,
            database: env.POSTGRESQL_DB,
            password: env.POSTGRESQL_PASSWORD,
            port: Number(env.POSTGRESQL_PORT),
            ssl: pgSsl,
        })
    }

    async resetDatabase() {

        // USED FOR DEVELOPMENT
        // Resets the database to it's initial state
        await this.client.connect();

        try {
            let res = await this.client.query(queries.foreignChecks.off);
            console.log(res);
            res = await this.client.query(queries.drop);
            console.log(res);
            res = await this.client.query(queries.createDatabase);
            console.log(res);
            res = await this.client.query(queries.insertSampleData);
            console.log(res);
            res = await this.client.query(queries.foreignChecks.on);
            console.log(res);
            console.log("DATABASE RESET");
        } catch(e) {
            console.error(e);
        } finally {
            await this.client.end();
        }
    }

    async connect() {

        // Connect to saved client

        await this.client.connect();
    }

    async openQuery(query, parameters) {

        // Query database
        // Optional: pass in parameters to make a call using pq library's
        // parameterized queries

        if (parameters === undefined) {
            res = await this.client.query(query);
        } else {
            res = await this.client.query(query, parameters);
        }
        return res
    }

    async end() {

        await this.client.end();
    }

    async insertSampleData() {

        // insert sample data for testing

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

        // Query database
        // Optional: pass in parameters to make a call using pq library's
        // parameterized queries

        await this.client.connect();

        // response
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
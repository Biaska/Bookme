const { Client } = require('pg')
const fs = require('fs');

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
        const sql = fs.readFileSync("./bookme-definitions-postgre.sql", "utf8");
        return this.query(sql)
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
         } finally {
            await this.client.end();
            return res;
         } 
    }

    
}

module.exports = Connection
const db = require("./../mysql")
const fs = require("fs")


const createDatabaseSchema = async () => {
    const sql = fs.readFileSync("db_schema.sql").toString()
    const resp = await db.execute(sql)
    return resp
}

module.exports = {createDatabaseSchema}

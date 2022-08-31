const db = require("./../mysql")
const fs = require("fs")

export const createDatabaseSchema = () => {
    const sql = fs.readFileSync("db_schema.sql").toString()
    db.execute(sql)
}


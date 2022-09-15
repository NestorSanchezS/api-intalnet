const db = require("../database/mysql")


async function connectDatabase() {
    let attempts = 1
    while (attempts <= 10) {
        console.log(`Try to connect to db, attempt: ${attempts}`)
        try {
            await db.connect()
            console.log("Database connected successfully")
            return 
        } catch (error) {
            console.log("WARNING: db not connected")
            await new Promise(r => setTimeout(r, 2000)); // sleep
        }
        attempts++
    }

    throw Error("Database not connected")
}


module.exports = {
    connectDatabase
}
const { listPlans } = require("./plans")

const db = require("./../database/mysql")


async function createCity(name) {
    const sql = "INSERT INTO cities (NAME) VALUES (?)"
    const resp = await db.execute(sql, [name])
    const city = {id: resp.insertId, name}
    return city
}


async function listCities() {
    const sql = "SELECT * FROM cities"
    const cities = await db.execute(sql)
    return cities
}

async function retrieveCityByName(name) {
    const sql = "SELECT * FROM cities WHERE name = ? LIMIT 1"
    const cities = await db.execute(sql, [name])
    return cities.length > 0 ? cities[0] : undefined
}

async function retrieveCity(id) {
    const sql = "SELECT * FROM cities WHERE id = ? LIMIT 1"
    const cities = await db.execute(sql, [id])

    if (cities.length == 0)
        return undefined
    
    const city = cities[0]
    city.plans = await listPlans(city.id)

    return city
}


async function updateCity(id, name) {
    const sql = "UPDATE cities SET name = ? WHERE id = ?"
    const resp = await db.execute(sql, [name, id])
    if (resp.affectedRows > 0) {
        city = retrieveCity(id)
        return city
    }
    return undefined
}


async function deleteCity(id) {
    const sql = "DELETE FROM cities WHERE id = ?"
    const resp = await db.execute(sql, [id])
    return resp.affectedRows > 0
}


module.exports = {
    createCity, listCities, retrieveCity, updateCity, deleteCity,
    retrieveCityByName
}

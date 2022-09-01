const { listPlans } = require("./plans")

const db = require("../database/mysql")


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


async function addPlanToCity(city_id, plan_id, price) {
    const sql = `
        INSERT INTO cities_plans (city_id, plan_id, price)
        VALUES (?, ?, ?)
    `
    resp = await db.execute(sql, [city_id, plan_id, price])

    if (resp.affectedRows > 0) {
        city = retrieveCity(city_id)
        return city
    }
    return undefined
}


async function setCityPlanPrice(city_id, plan_id, price) {
    const sql = `
        UPDATE cities_plans SET price = ?
        WHERE city_id = ? AND plan_id = ?
    `
    resp = await db.execute(sql, [price, city_id, plan_id])
    return retrieveCity(city_id)
}


async function removeCityPlanRelation(city_id, plan_id) {
    const sql = `
        DELETE FROM cities_plans 
        WHERE city_id = ? AND plan_id = ?
    `
    await db.execute(sql, [city_id, plan_id])
    return retrieveCity(city_id)
}


module.exports = {
    createCity, listCities, retrieveCity, updateCity, deleteCity,
    retrieveCityByName, addPlanToCity, setCityPlanPrice,
    removeCityPlanRelation
}

const db = require("../database/mysql")


async function createService({name, type}) {
    const sql = "INSERT INTO services (name, type) VALUES (?, ?)"
    const resp = await db.execute(sql, [name, type])
    return await retrieveService(resp.insertId)
}


async function retrieveServiceBy(name, type) {
    const sql = "SELECT * FROM services WHERE name = ? AND type = ? LIMIT 1"
    const services = await db.execute(sql, [name, type])
    return services.length > 0 ? services[0] : undefined
}


async function retrieveService(id) {
    const sql = "SELECT * FROM services WHERE id = ? LIMIT 1"
    const services = await db.execute(sql, [id])
    return services.length > 0 ? services[0] : undefined
}


async function listServices(plan_id) {
    const sql = `
        SELECT s.* FROM services AS s
        INNER JOIN services_plans sp 
            ON s.id = sp.service_id AND sp.plan_id = ?
    `
    const services = await db.execute(sql, [plan_id])
    return services
}


async function allServices() {
    const sql = "SELECT * FROM services"
    return await db.execute(sql)
}


async function updateService(id, {name, type}) {
    const sql = "UPDATE services SET name = ?, type = ? WHERE id = ?"
    await db.execute(sql, [name, type, id])
    return await retrieveService(id)
}


async function deleteService(id) {
    const sql = "DELETE FROM services WHERE id = ?"
    const resp = await db.execute(sql, [id])
    return resp
}


module.exports = {
    createService, listServices, deleteService,
    allServices, retrieveServiceBy, retrieveService, updateService
}

const db = require("./../database/mysql")


async function createService({name, type}) {
    sql = "INSERT INTO services (name, type) VALUES (?, ?)"
    resp = await db.execute(sql, [name, type])
    const service = {id: resp.insertId, name, type}
    return service
}


async function listServices(plan_id) {
    sql = `
        SELECT s.* FROM services AS s
        INNER JOIN services_plans sp 
            ON s.id = sp.service_id AND sp.plan_id = ?
    `
    services = await db.execute(sql, [plan_id])
    return services
}


async function deleteService(id) {
    sql = "DELETE FROM services WHERE id = ?"
    resp = await db.execute(sql, [id])
    return resp
}


module.exports = {createService, listServices, deleteService}

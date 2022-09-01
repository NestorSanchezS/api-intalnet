const { listServices } = require("./services")

const db = require("./../database/mysql")


async function createPlan(name) {
    sql = "INSERT INTO plans (NAME) VALUES (?)"
    resp = await db.execute(sql, [name])
    const plan = {id: resp.insertId, name}
    return plan
}


async function listPlans(city_id) {
    plans = []
    if (city_id) {
        sql = `
            SELECT p.*, cp.price FROM plans AS p
            INNER JOIN cities_plans AS cp 
                ON cp.plan_id = p.id AND cp.city_id = ?
        `
        plans = await db.execute(sql, [city_id])
    } else {
        sql = "SELECT * FROM plans"
        plans = await db.execute(sql)
    }

    for (const plan of plans) {
        plan.services = await listServices(plan.id)
    }
    return plans
}


async function allPlans() {
    return listPlans(undefined)
}


async function retrievePlan(id) {
    sql = "SELECT * FROM plans WHERE id = ? LIMIT 1"
    plans = await db.execute(sql, [id])

    if (plans.length > 0)
        return plans[0]
    return undefined
}


async function updatePlan(id, name) {
    sql = "UPDATE plans SET name = ? WHERE id = ?"
    resp = await db.execute(sql, [name, id])
    return resp
}


async function deletePlan(id) {
    sql = "DELETE FROM plans WHERE id = ?"
    resp = await db.execute(sql, [id])
    return resp
}


module.exports = {
    createPlan, listPlans, allPlans, retrievePlan, updatePlan, deletePlan
}
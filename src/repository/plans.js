const { listServices } = require("./services")

const db = require("../database/mysql")


async function createPlan({name, services}) {
    sql = "INSERT INTO plans (NAME) VALUES (?)"
    let resp = await db.execute(sql, [name])
    const plan_id = resp.insertedId

    if (services) {
        for (const service in services) {
            await addServiceToPlan(plan_id, service.id)
        }
    }

    return await retrievePlan(plan_id)
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


async function retrievePlanByName(name) {
    sql = "SELECT * FROM plans WHERE name = ? LIMIT 1"
    plans = await db.execute(sql, [name])
    return plans.length > 0 ? plans[0] : undefined
}


async function retrievePlan(id) {
    sql = "SELECT * FROM plans WHERE id = ? LIMIT 1"
    plans = await db.execute(sql, [id])
    return plans.length > 0 ? plans[0] : undefined
}


async function updatePlan(id, name, services) {
    sql = "UPDATE plans SET name = ? WHERE id = ?"
    resp = await db.execute(sql, [name, id])

    if (services) {
        await removeAllPlanServices(id)
        for (const service of services)
            await addServiceToPlan(id, service.id)
    }
    return resp
}


async function deletePlan(id) {
    sql = "DELETE FROM plans WHERE id = ?"
    resp = await db.execute(sql, [id])
    return resp
}


async function addServiceToPlan(plan_id, service_id) {
    const servicePlans = await listPlanServices(plan_id)
    if (servicePlans.find(e => e.id == service_id)) {
        return undefined
    }

    const sql = `
        INSERT INTO services_plans (plan_id, service_id) 
        VALUES (?, ?)
    `
    return await db.execute(sql, [plan_id, service_id])
}


async function listPlanServices(plan_id) {
    const sql = `
        SELECT * FROM services AS s
        INNER JOIN services_plans AS sp
        ON s.id = sp.services_id AND sp.plan_id = ?
    `
    const resp = await db.execute(sql, [plan_id])
    return resp
}


async function removeAllPlanServices(plan_id) {
    const sql = "DELETE FROM services_plans WHERE plan_id = ?"
    await db.execute(sql, [plan_id])
}


module.exports = {
    createPlan, listPlans, allPlans, retrievePlan,
    updatePlan, deletePlan, retrievePlanByName
}
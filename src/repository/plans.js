const { listServices, retrieveService } = require("./services")

const db = require("../database/mysql")


async function createPlan({name, ui_params, services}) {
    const sql = "INSERT INTO plans (NAME, UI_PARAMS) VALUES (?, ?)"
    let resp = await db.execute(sql, [name, JSON.stringify(ui_params)])
    const plan_id = resp.insertId
    await setPlanServices(plan_id, services)
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
    const sql = "SELECT * FROM plans WHERE id = ? LIMIT 1"
    const plans = await db.execute(sql, [id])
    const plan = plans.length > 0 ? plans[0] : undefined
    if (plan) plan.services = await listPlanServices(id)
    return plan
}


async function updatePlan(id, {name, ui_params, services}) {
    sql = "UPDATE plans SET name = ?, ui_params = ? WHERE id = ?"
    resp = await db.execute(sql, [name, JSON.stringify(ui_params), id])
    await setPlanServices(id, services)
    return await retrievePlan(id)
}


async function setPlanServices(plan_id, services) {
    if (services) {
        await removeAllPlanServices(plan_id)
        for (const service of services) {
            const serviceInDb = await retrieveService(service.id)
            if (serviceInDb) await addServiceToPlan(plan_id, service.id)
        }
    }
}

async function deletePlan(id) {
    sql = "DELETE FROM plans WHERE id = ?"
    resp = await db.execute(sql, [id])
    return resp.affectedRows > 0
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
        ON s.id = sp.service_id AND sp.plan_id = ?
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
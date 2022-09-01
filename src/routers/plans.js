const { Router } = require("express")
const { allPlans, deletePlan, retrievePlan, updatePlan } = require("../controllers/plans")


const router = Router()


router.get("", async (req, res) => {
    const plans = await allPlans()
    res.json(plans)
})


router.get("/:id", async (req, res) => {
    const plan = await retrievePlan(req.params.id)
    if (plan) res.json(plan)
    else res.status(404).send()
})


router.put("/:id", async (req, res) => {
    const resp = await updatePlan(req.params.id, req.body.name)
    res.json(resp)
})


router.delete("/:id", async (req, res) => {
    const resp = await deletePlan(req.params.id)
    res.json(resp)
})


module.exports = router

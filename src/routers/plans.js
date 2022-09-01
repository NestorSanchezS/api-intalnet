const { Router } = require("express")
const { 
    allPlans, deletePlan, retrievePlan, updatePlan,
    createPlan,
    retrievePlanByName
} = require("../repository/plans")


const router = Router()


router.get("", async (req, res) => {
    const plans = await allPlans()
    res.json(plans)
})


router.post("", async (req, res) => {
    const planInDb = await retrievePlanByName(req.body.name)
    if (planInDb) {
        return res.status(400).json({
            error: "this plan already exists"
        })
    }
    const plan = await createPlan(req.body)
    res.json(plan)
})


router.get("/:id", async (req, res) => {
    const plan = await retrievePlan(req.params.id)
    if (plan) res.json(plan)
    else res.status(404).send()
})


router.put("/:id", async (req, res) => {
    const resp = await updatePlan(
        req.params.id, req.body.name, req.body.services
    )
    res.json(resp)
})


router.delete("/:id", async (req, res) => {
    const resp = await deletePlan(req.params.id)
    res.json(resp)
})


module.exports = router

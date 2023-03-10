const { Router } = require("express")
const { levelAdmin, levelStaff, levelSuperUser } = require("../middlewares/permissions")
const { 
    createCity, deleteCity, listCities, retrieveCity,
    updateCity, retrieveCityByName, addPlanToCity, setCityPlanPrice, removeCityPlanRelation
} = require("../repository/cities")
const { listPlans, retrievePlan } = require("../repository/plans")


const router = Router()


router.get("", async (req, res) => {
    const cities = await listCities()
    res.json(cities)
})


router.get("/:id", async (req, res) => {
    const city = await retrieveCity(req.params.id)
    if (city)
        res.json(city)
    else
        res.status(404).send()
})


router.post("", [levelStaff], async (req, res) => {
    if (await retrieveCityByName(req.body.name)) {
        return res.json({error: "this city already exists"})
    }
    const city = await createCity(req.body.name)
    res.json(city)
})


router.put("/:id", [levelAdmin], async (req, res) => {
    const cityInDb = await retrieveCityByName(req.body.name)
    if (cityInDb && cityInDb.id != req.params.id) {
        return res.json({error: `The city ${cityInDb.id} has this name`})
    }

    const city = await updateCity(req.params.id, req.body.name)
    if (city) res.json(city)
    else res.status(500).send()
})


router.delete("/:id", [levelSuperUser], async (req, res) => {
    const city = await retrieveCity(req.params.id)
    if (!city) return res.status(404).send()

    const deleted = await deleteCity(req.params.id)
    if (deleted) res.status(204).send()
    else res.status(400).json({error: "Error on delete"})
})

// CITIES PLANS

router.post("/:id/plans/:plan_id/", [levelStaff], async (req, res) => {
    let city = await retrieveCity(req.params.id)
    if (!city) return res.status(400).json({error: "City does not exists"})

    const plan = await retrievePlan(req.params.plan_id)
    if (!plan) return res.status(400).json({error: "Plan does not exists"})

    const actualPlans = await listPlans(req.params.id)
    if (actualPlans.find(e => e.id == req.params.plan_id))
        return res.status(400).json({error: "Plan already attached"})

    city = await addPlanToCity(
        req.params.id, req.params.plan_id, req.body.price
    )
    res.json(city)
})


router.put("/:id/plans/:plan_id/", [levelStaff], async (req, res) => {
    const city = await setCityPlanPrice(
        req.params.id, req.params.plan_id, req.body.price
    )
    res.json(city)
})


router.delete("/:id/plans/:plan_id/", [levelSuperUser], async (req, res) => {
    const city = await removeCityPlanRelation(
        req.params.id, req.params.plan_id
    )
    res.json(city)
})


module.exports = router

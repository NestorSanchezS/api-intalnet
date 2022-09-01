const { Router } = require("express")
const { createCity, deleteCity, listCities, retrieveCity, updateCity, retrieveCityByName } = require("../controllers/cities")


const router = Router()


router.get("", async (req, res) => {
    const cities = await listCities()
    res.json(cities)
})


router.get("/:id", async (req, res) => {
    const city = await retrieveCity(req.params.id)
    res.json(city)
})

router.post("", async (req, res) => {
    if (await retrieveCityByName(req.body.name)) {
        return res.json({error: "this city already exists"})
    }
    const city = await createCity(req.body.name)
    res.json(city)
})


router.put("/:id", async (req, res) => {
    const cityInDb = await retrieveCityByName(req.body.name)
    if (cityInDb && cityInDb.id !== req.params.id) {
        return res.json({error: `The city ${cityInDb.id} has this name`})
    }

    const city = await updateCity(req.params.id, req.body.name)
    if (city) res.json(city)
    else res.status(500).send()
})


router.delete("/:id", async (req, res) => {
    const city = await retrieveCity(req.params.id)
    if (!city)
        return res.status(404).send()

    const deleted = await deleteCity(req.params.id)
    if (deleted) 
        res.status(204).send()
    else
        res.status(400).json({error: "Error on delete"})
})


module.exports = router

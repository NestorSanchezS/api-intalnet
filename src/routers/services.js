const { Router } = require("express")
const { retrieveCityByName } = require("../repository/cities")
const { createService, allServices, deleteService, retrieveServiceBy } = require("../repository/services")


const router = Router()


router.get("", async (req, res) => {
    const services = await allServices()
    res.json(services)
})


router.post("", async (req, res) => {
    const serviceInDb = await retrieveServiceBy(req.body.name, req.body.type)
    if (serviceInDb) {
        return res.status(404).json({
            error: "Service with this name and type already exists: " + serviceInDb.id
        })
    }
    const service = await createService(req.body)
    res.json(service)
})


router.delete("/:id", async (req, res) => {
    await deleteService(req.params.id)
    res.status(204).send()
})


module.exports = router

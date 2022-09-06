const { Router } = require("express")
const { levelStaff, levelSuperUser } = require("../middlewares/permissions")
const { createService, allServices, deleteService, retrieveServiceBy, retrieveService, updateService } = require("../repository/services")


const router = Router()


router.get("", async (req, res) => {
    const services = await allServices()
    res.json(services)
})


router.post("", [levelStaff], async (req, res) => {
    const serviceInDb = await retrieveServiceBy(req.body.name, req.body.type)
    if (serviceInDb) {
        return res.status(404).json({
            error: "Service with this name and type already exists: " + serviceInDb.id
        })
    }
    const service = await createService(req.body)
    res.json(service)
})


router.put("/:id", async (req, res) => {
    if (!await retrieveService(req.params.id)) {
        return res.status(404).send()
    }

    const service = await updateService(req.params.id, req.body)
    res.json(service)
})


router.delete("/:id", [levelSuperUser], async (req, res) => {
    await deleteService(req.params.id)
    res.status(204).send()
})


module.exports = router

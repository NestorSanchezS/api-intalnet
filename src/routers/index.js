const { Router } = require("express")

const citiesRoutes = require("./cities")
const plansRoutes = require("./plans")
const servicesRoutes = require("./services")
const questionsRoutes = require("./questions")

const router = Router()

router.use("/cities", citiesRoutes)
router.use("/plans", plansRoutes)
router.use("/services", servicesRoutes)
router.use("/questions", questionsRoutes)

module.exports = router

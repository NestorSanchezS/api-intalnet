const { Router } = require("express")

const cityRoutes = require("./cities")
const planRoutes = require("./plans")
const serviceRoutes = require("./services")

const router = Router()

router.use("/cities", cityRoutes)
router.use("/plans", planRoutes)
router.use("/services", serviceRoutes)

module.exports = router

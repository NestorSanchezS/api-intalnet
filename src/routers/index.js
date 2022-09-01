const { Router } = require("express")

const cityRoutes = require("./cities")
const planRoutes = require("./plans")

const router = Router()

router.use("/cities", cityRoutes)
router.use("/plans", planRoutes)

module.exports = router

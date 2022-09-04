const { Router } = require("express")

const citiesRoutes = require("./cities")
const plansRoutes = require("./plans")
const servicesRoutes = require("./services")
const questionsRoutes = require("./questions")
const productsRoutes = require("./products")


const router = Router()


router.use("/cities", citiesRoutes)
router.use("/plans", plansRoutes)
router.use("/services", servicesRoutes)
router.use("/questions", questionsRoutes)
router.use("/products", productsRoutes)


module.exports = router

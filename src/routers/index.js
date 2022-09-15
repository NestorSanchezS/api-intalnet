const { Router } = require("express")

const router = Router()

router.use("/cities", require("./cities"))
router.use("/plans", require("./plans"))
router.use("/services", require("./services"))
router.use("/questions", require("./questions"))
router.use("/products", require("./products"))
router.use("/categories", require("./categories"))
router.use("/auth", require("./auth"))
router.use("/users", require("./users"))

module.exports = router

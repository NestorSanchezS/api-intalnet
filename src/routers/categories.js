const { Router } = require("express")
const { listCategories, createCategory, retrieveCategory, deleteCategory } = require("../repository/categories")


const router = Router()


router.get("", async (req, res) => {
    const categories = await listCategories()
    res.json(categories)
})


router.post("", async (req, res) => {
    if (await retrieveCategory(req.body.name))
        return res.status(400).json({error: "Name is being used"})

    const category = await createCategory(req.body.name)
    res.json(category)
})


router.delete("/:name", async (req, res) => {
    if (!await retrieveCategory(req.params.name))
        return res.status(404).json({error: "Not found"})

    await deleteCategory(req.params.name)
    res.status(204).send()
})


module.exports = router

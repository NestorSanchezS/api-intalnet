const fs = require("fs")
const { Router } = require("express")
const { createImage, updateImage, retrieveImage, deleteImage } = require("../repository/images")

const { listProducts, retrieveProduct, retrieveProductByName, createProduct, updateProduct, deleteProduct, addProductImage, detachProductImage } = require("./../repository/products")
const { levelStaff, levelAdmin, levelSuperUser } = require("../middlewares/permissions")


const router = Router()


router.get("", async (req, res) => {
    const products = await listProducts()
    res.json(products)
})


router.get("/:id", async (req, res) => {
    const product = await retrieveProduct(req.params.id)
    if (product) res.json(product)
    else res.status(404).json({error: "Not found"})
})


router.post("", [levelStaff], async (req, res) => {
    const productInDb = await retrieveProductByName(req.body.name)
    if (productInDb)
        return res.status(400)
                  .json({error: `Product ${productInDb.id} has this name`})
    
    const product = await createProduct(req.body)
    res.json(product)
})


router.put("/:id", [levelAdmin], async (req, res) => {
    if (!await retrieveProduct(req.params.id))
        return res.status(404).json({error: "Not found"})
    // validate if this name exist
    const productInDb = await retrieveProductByName(req.body.name)
    if (productInDb && productInDb.id != req.params.id)
        return res.status(400).json({error: `Product ${productInDb.id} has this name`})

    const product = await updateProduct(req.params.id, req.body)
    res.json(product)
})


router.delete("/:id", [levelSuperUser], async (req, res) => {
    if (!retrieveProduct(req.params.id))
        return res.status(404).json({error: "Not found"})

    await deleteProduct(req.params.id)
    res.status(204).send()
})

// IMAGES

router.post("/:id/images", [levelStaff], async (req, res) => {
    if (!await retrieveProduct(req.params.id))
        return res.status(404).send()

    for (const [_, image] of Object.entries(req.files)) {
        let imageInDb = await createImage("")

        // move to product images folder
        const ext = image.name.split(".")[1]
        const imageName = `product_${req.params.id}_img_${imageInDb.id}.${ext}`
        const path = `./src/public/products/${imageName}`
        image.mv(path)

        // update image to set path
        imageInDb = await updateImage(imageInDb.id, `/products/${imageName}`)
        await addProductImage(req.params.id, imageInDb.id)
    }

    const product = await retrieveProduct(req.params.id)
    res.json(product)
})


router.delete("/:id/images/:image_id", [levelAdmin], async (req, res) => {
    if (!await retrieveProduct(req.params.id))
        return res.status(404).send()

    const image = await retrieveImage(req.params.image_id)
    if (!image) return res.status(404).send()

    const imageName = image.path.split("/products/")[1]
    try {
        fs.unlinkSync(`./src/public/products/${imageName}`)

        await detachProductImage(req.params.id, req.params.image_id)
        await deleteImage(req.params.image_id)
        const product = await retrieveProduct(req.params.id)
        res.json(product)
    } catch (error) {
        res.status(500).json({error})
    }
})


module.exports = router

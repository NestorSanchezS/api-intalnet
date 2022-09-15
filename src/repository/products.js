const db = require("../database/mysql")
const { retrieveCategory } = require("./categories")


async function createProduct(
    {name, description, price, previous_price, categories}
) {
    const sql = `
        INSERT INTO products (name, description, price, previous_price)
        VALUES (?, ?, ?, ?)
    `
    const resp = await db.execute(sql, [name, description, price, previous_price])
    const id = resp.insertId
    if (categories) await resetProductCategories(id, categories)
    return await retrieveProduct(id)
}


async function attachRelations(product) {
    product.images = await listProductImages(product.id)
    product.categories = await listProductCategories(product.id)
    return product
}


async function listProducts() {
    const sql = "SELECT * FROM products"
    let products = await db.execute(sql)
    products = await Promise.all(products.map(p => attachRelations(p)))
    return products
}


async function retrieveProduct(id) {
    const sql = "SELECT * FROM products WHERE id = ?"
    const products = await db.execute(sql, [id])
    let product = products.length > 0 ? products[0] : undefined
    if (product) product = attachRelations(product)
    return product
}


async function retrieveProductByName(name) {
    const sql = "SELECT * FROM products WHERE name = ?"
    const products = await db.execute(sql, [name])
    const product = products.length > 0 ? products[0] : undefined
    if (product) attachRelations(product)
    return product
}


async function updateProduct(
    id, {name, description, price, previous_price, categories}
) {
    const sql = `
        UPDATE products 
        SET name = ?, description = ?, price = ?, previous_price = ?
        WHERE id = ?
    `
    await db.execute(sql, [name, description, price, previous_price, id])

    if (categories) await resetProductCategories(id, categories)
    return await retrieveProduct(id)
}


async function deleteProduct(id) {
    const sql = "DELETE FROM products WHERE id = ?"
    const resp = await db.execute(sql, [id])
    return resp.affectedRows > 0
}

// IMAGES 

async function addProductImage(product_id, image_id) {
    const sql = `
        INSERT INTO product_images (product_id, image_id)
        VALUES (?, ?)
    `
    await db.execute(sql, [product_id, image_id])
}


async function detachProductImage(product_id, image_id) {
    const sql = `
        DELETE FROM product_images
        WHERE product_id = ? AND image_id = ?
    `
    await db.execute(sql, [product_id, image_id])
}


async function listProductImages(id) {
    const sql = `
        SELECT i.* FROM images AS i
        INNER JOIN product_images AS pi
            ON pi.image_id = i.id AND pi.product_id = ?
    `
    const resp = await db.execute(sql, [id])
    return resp
}

// CATEGORIES

async function listProductCategories(id) {
    const sql = `
        SELECT c.name FROM categories AS c
        INNER JOIN products_categories AS pc
            ON pc.category_name = c.name AND pc.product_id = ?
    `
    const resp = await db.execute(sql, [id])
    const categoryNames = resp.map(c => c.name)
    return categoryNames
}


async function removeAllProductCategory(product_id) {
    const sql = `
        DELETE FROM products_categories 
        WHERE product_id = ?
    `
    await db.execute(sql, [product_id])
}


async function resetProductCategories(product_id, categories) {
    await removeAllProductCategory(product_id)
    for (const category of categories) {
        const categoryInDb = await retrieveCategory(category)
        if (!categoryInDb) {
            console.log(`WARN: Category ${category} not found`)
            continue
        }

        const sql = `
            INSERT INTO products_categories 
                (product_id, category_name)
            VALUES (?, ?)
        `
        await db.execute(sql, [product_id, category])
    }
}


module.exports = {
    retrieveProduct, createProduct, retrieveProductByName,
    updateProduct, deleteProduct, listProducts, addProductImage,
    listProductImages, detachProductImage, removeAllProductCategory
}

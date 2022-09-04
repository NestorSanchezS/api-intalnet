const db = require("../database/mysql")

const { createImage } = require("./images")


async function createProduct({name, description, price}) {
    const sql = `
        INSERT INTO products (name, description, price)
        VALUES (?, ?, ?)
    `
    const resp = await db.execute(sql, [name, description, price])
    return await retrieveProduct(resp.insertId)
}


async function listProducts() {
    const sql = "SELECT * FROM products"
    const products = await db.execute(sql)
    for (const product of products) {
        product.images = await listProductImages(product.id)
    }
    return products
}


async function retrieveProduct(id) {
    const sql = "SELECT * FROM products WHERE id = ?"
    const products = await db.execute(sql, [id])
    const product = products.length > 0 ? products[0] : undefined
    product.images = await listProductImages(product.id)
    return product
}


async function retrieveProductByName(name) {
    const sql = "SELECT * FROM products WHERE name = ?"
    const products = await db.execute(sql, [name])
    const product = products.length > 0 ? products[0] : undefined
    if (product) product.images = await listProductImages(product.id)
    return product
}


async function updateProduct(id, {name, description, price}) {
    const sql = `
        UPDATE products SET name = ?, description = ?, price = ?
        WHERE id = ?
    `
    await db.execute(sql, [name, description, price, id])
    return await retrieveProduct(id)
}


async function deleteProduct(id) {
    const sql = "DELETE FROM products WHERE id = ?"
    const resp = await db.execute(sql, [id])
    return resp.affectedRows > 0
}


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


module.exports = {
    retrieveProduct, createProduct, retrieveProductByName,
    updateProduct, deleteProduct, listProducts, addProductImage,
    listProductImages, detachProductImage
}

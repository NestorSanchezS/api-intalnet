const db = require("./../database/mysql")


async function listCategories() {
    const sql = "SELECT * FROM categories"
    return await db.execute(sql)
}


async function retrieveCategory(name) {
    const sql = "SELECT * FROM categories WHERE name = ?"
    const resp = await db.execute(sql, [name])
    return resp.length > 0 ? resp[0] : undefined
}


async function createCategory(name) {
    const sql = "INSERT INTO categories (name) VALUES (?)"
    const resp = await db.execute(sql, [name])
    console.log("insert resp", resp)
    if (resp.affectedRows > 0)
        return {name}
    return undefined
}


async function deleteCategory(name) {
    let sql = "DELETE FROM products_categories WHERE category_name = ?"
    await db.execute(sql, [name])

    sql = "DELETE FROM categories WHERE name = ?"
    await db.execute(sql, [name])
}


module.exports = {
    listCategories, deleteCategory, createCategory, retrieveCategory
}
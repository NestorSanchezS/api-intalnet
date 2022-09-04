const db = require("../database/mysql")


async function createImage(path) {
    const sql = "INSERT INTO images (path) VALUES (?)"
    const resp = await db.execute(sql, [path])
    return await retrieveImage(resp.insertId)    
}


async function retrieveImage(id) {
    const sql = "SELECT * FROM images WHERE id = ?"
    const resp = await db.execute(sql, [id])
    return resp.length > 0 ? resp[0] : undefined
}


async function updateImage(id, path) {
    const sql = "UPDATE images SET path = ? WHERE id = ?"
    await db.execute(sql, [path, id])
    return await retrieveImage(id)
}


async function deleteImage(id) {
    const sql = "DELETE FROM images WHERE id = ?"
    const resp = await db.execute(sql, [id])
    return resp.affectedRows > 0
}


module.exports = {
    createImage, retrieveImage, deleteImage, updateImage
}
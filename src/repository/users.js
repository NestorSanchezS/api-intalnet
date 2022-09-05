const bcrypt = require('bcryptjs')
const db = require('./../database/mysql')


async function createUser({name, email, password, rol}) {
    const sql = `
        INSERT INTO users (name, email, password, rol, is_active)
        VALUES (?, ?, ?, ?, ?)
    `
    const hashed_pass = bcrypt.hashSync(password, 10)
    const resp = await db.execute(sql, [name, email, hashed_pass, rol, true])
    return retrieveUser(resp.insertId)
}


async function listUsers() {
    const sql = "SELECT id, name, email, rol, is_active FROM users"
    return await db.execute(sql)
}


async function retrieveUserByEmail(email) {
    const sql = "SELECT id, name, email, rol, password, is_active FROM users WHERE email = ?"
    const resp = await db.execute(sql, [email])
    return (resp.length > 0) ? resp[0] : undefined
}


async function retrieveUser(id) {
    const sql = "SELECT id, name, email, rol, is_active FROM users WHERE id = ?"
    const resp = await db.execute(sql, [id])
    return (resp.length > 0) ? resp[0] : undefined
}


async function updateUser(id, {name, email, password, rol}) {
    if (password) {
        const sql = `
            UPDATE users 
            SET name = ?, email = ?, password = ?, rol = ?
            WHERE id = ?
        `
        const hashed_pass = bcrypt.hashSync(password, 10);
        await db.execute(sql, [name, email, hashed_pass, rol, id])
    } else {
        const sql = `
            UPDATE users 
            SET name = ?, email = ?, rol = ?
            WHERE id = ?
        `
        await db.execute(sql, [name, email, rol, id])
    }

    return await retrieveUser(id)
}


async function updateIsActive(id, is_active) {
    const sql = "UPDATE users SET is_active = ? WHERE id = ?"
    await db.execute(sql, [is_active, id])
}


async function disableUser(id) {
    await updateIsActive(id, false)
}


async function enableUser(id) {
    await updateIsActive(id, true)
}


module.exports = {
    createUser, retrieveUser, updateUser, updateIsActive,
    disableUser, enableUser, retrieveUserByEmail, listUsers
}

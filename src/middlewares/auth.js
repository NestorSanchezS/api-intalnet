const jwt = require("jsonwebtoken")
const { retrieveUser } = require("../repository/users")

async function extractUser(headers) {
    const bearer = headers.authorization
    if (!bearer) return false

    const split = bearer.split(" ")
    if (split.length <= 1)
        return false

    const token = split[1]
    try {
        const payload = jwt.verify(token, process.env.SECRET);
        const user = await retrieveUser(payload.user.id)
        return user
    } catch (error) {
        console.log("JWT Error", error)
        return false
    }
}


async function auth(req, res, next) {
    const user = await extractUser(req.headers)
    if (user) req.user = user
    next()
}


module.exports = auth

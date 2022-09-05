const { SUPERUSER } = require("../middlewares/permissions")
const { createUser, retrieveUserByEmail } = require("../repository/users")


async function createRootUserIfNotExists() {
    const user = await retrieveUserByEmail(process.env.ROOT_EMAIL)
    if (user) return

    await createUser({
        name: "Root",
        email: process.env.ROOT_EMAIL,
        password: process.env.ROOT_PASSWORD,
        rol: SUPERUSER
    })
    console.log("User root created")
}


module.exports = createRootUserIfNotExists

const { Router, json } = require("express")
const { listUsers, retrieveUser, createUser, disableUser, enableUser, retrieveUserByEmail, updateUser } = require("../repository/users")


const router = Router()


router.get("", async (req, res) => {
    const users = await listUsers()
    res.json(users)
})


router.get("/:id", async (req, res) => {
    const user = await retrieveUser(req.params.id)
    if (user) res.json(user)
    else res.status(404).json({error: "Not found"})
})


router.post("", async (req, res) => {
    const userInDb = await retrieveUserByEmail(req.body.email)
    if (userInDb)
        return res.status(400).json({error: "Email ocupado"})

    const user = await createUser(req.body)
    res.json(user)
})


router.put("/:id", async (req, res) => {
    if (!await retrieveUser(req.params.id))
        return res.status(404).send()

    const userInDb = await retrieveUserByEmail(req.body.email)
    if (userInDb.id != req.params.id)
        return res.status(400).json({error: "Email ocupado"})

    await updateUser(req.params.id, req.body)

    const user = await retrieveUser(req.params.id)
    res.json(user)
})


router.post("/:id/disable", async (req, res) => {
    await disableUser(req.params.id)
    res.status(204).send()
})


router.post("/:id/enable", async (req, res) => {
    await enableUser(req.params.id)
    const user = await retrieveUser(req.params.id)
    res.json(user)
})


module.exports = router

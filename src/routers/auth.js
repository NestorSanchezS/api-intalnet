const bcrypt = require('bcryptjs')
const { Router } = require("express")
const { retrieveUserByEmail } = require('../repository/users')


const router = Router()


router.post("/login", async (req, res) => {
    const ERROR = {error: "Credenciales incorrectas"}

    const {email, password} = req.body

    const user = await retrieveUserByEmail(email)
    if (!user) return res.status(400).json(ERROR)

    console.log("body", req.body)
    const resp = bcrypt.compareSync(password, user.password)
    console.log("resp pass", resp)
    if (!bcrypt.compareSync(password, user.password))
        return res.status(400).json(ERROR)

    res.json({okay: true})
})


module.exports = router

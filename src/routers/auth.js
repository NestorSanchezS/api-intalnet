const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const { Router } = require("express")
const { retrieveUserByEmail } = require('../repository/users')


const router = Router()


router.post("/login", async (req, res) => {
    const ERROR = {error: "Credenciales incorrectas"}

    const {email, password} = req.body

    const user = await retrieveUserByEmail(email)
    if (!user) return res.status(400).json(ERROR)

    if (!bcrypt.compareSync(password, user.password))
        return res.status(400).json(ERROR)

    delete user.password
    const token = jwt.sign(
        {user},
        process.env.SECRET,
        { expiresIn: process.env.JWT_EXPIRE_TIME_MINUTES * 60 }
    )
    res.json({access_token: token})
})


module.exports = router

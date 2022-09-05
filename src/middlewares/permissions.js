const SUPERUSER = "superuser"
const ADMIN = "admin"
const STAFF = "staff"


function validatePermission(permissions) {
    return async (req, res, next) => {
        if (!req.user) return res.status(401).send()

        if (!permissions.find(p => p === req.user.rol))
            return res.status(403).json(
                {error: `You don't have permissions to perform this action: ${permissions}`}
            )

        next()
    }
}


const levelSuperUser = validatePermission([SUPERUSER])
const levelAdmin = validatePermission([ADMIN, SUPERUSER])
const levelStaff = validatePermission([STAFF, ADMIN, SUPERUSER])


module.exports = {
    levelAdmin, levelStaff, levelSuperUser, SUPERUSER, ADMIN, STAFF
}
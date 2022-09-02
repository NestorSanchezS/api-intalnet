
async function errors(error, req, res, next) {
    console.error(error)
    res.status(500).json({error: error})
}


module.exports = {errors}

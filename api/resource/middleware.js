const Resource = require('./model')

async function validateName(req, res, next) {
    const { resource_name } = req.body
    try {
        const resource = await Resource.getResourceByName(resource_name)
        if (!resource) {
            next()
        } else {
            next({
                status: 400, message: "Resource name is not unique"
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = { validateName }
const router = require('express').Router()
const Resource = require('../resource/model')


router.get('/', (req, res, next) => {
    Resource.getAllResources()
        .then(reso => {
            res.status(200).json(reso);
        })
        .catch(err => {
            next(err);
        });
})


router.post('/', async (req, res, next) => {
    try {

        const { resource_name, resource_description } = req.body

        if (!resource_name) {
            return res.status(400).json({
                message: 'resource name required'
            })
        }

        const newRes = await Resource.insertNewResource({
            resource_name,
            resource_description
        })

        if (newRes.resource_name === req.body.resource_name) {
            return res.status(400).json({
                message: 'resource name must be unique'
            })
        }

        const result = { ...newRes }

        res.status(201).json(result)
    } catch (err) {
        next(err)
    }
})


router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: "something went wrong within the Resources router",
        errorMessage: err.message,
        stack: err.stack
    })
})

module.exports = router
const router = require('express').Router()
const Resource = require('../resource/model')
const { validateName } = require('./middleware')


router.get('/', (req, res, next) => {
    Resource.getAllResources()
        .then(reso => {
            res.status(200).json(reso);
        })
        .catch(err => {
            next(err);
        });
})


router.post('/', validateName, async (req, res, next) => {
    const newData = await Resource.insertNewResource(req.body)
    try {
        res.status(201).json(newData)
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
const router = require('express').Router()
const Project = require('./model')

router.get('/:project_id', (req, res, next) => {
    Project.getProjectById(req.params.project_id)
        .then(resource => {
            res.status(200).json(resource)
        })
        .catch(next)
})

router.get('/api/projects', (req, res, next) => {
    Project.getAllProjects()
        .then(proj => {
            res.status(200).json(proj)
        })
        .catch(next)
})

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: "something went wrong within the Projects router",
        errorMessage: err.message,
        stack: err.stack
    })
})

module.exports = router
const router = require('express').Router()
const Project = require('./model')


router.get('/', (req, res, next) => {
    Project.getAllProjects()
        .then(proj => {
            res.status(200).json(proj);
        })
        .catch(err => {
            next(err);
        });
})

router.post('/', async (req, res, next) => {
    try {
        const { project_name, project_description, project_completed } = req.body
        if (!project_name) {
            return res.status(400).json({
                message: 'Project name required'
            })
        }

        const newProj = await Project.insertNewProject({
            project_name,
            project_description,
            project_completed
        })

        const result = {
            ...newProj,
            project_completed: !!newProj.project_completed,
        }

        res.status(201).json(result)


    } catch (err) {
        next(err)
    }
})



router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: "something went wrong within the Projects router",
        errorMessage: err.message,
        stack: err.stack
    })
})

module.exports = router
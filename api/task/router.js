const router = require('express').Router()
const Task = require('../task/model')
const { validateTask } = require('./middleware')

router.post('/', validateTask, async (req, res, next) => {
    try {
        const newTask = await Task.insertNewTask(req.body)
        res.status(201).json(newTask)
    } catch (err) {
        next(err)
    }
})

router.get("/", async (req, res) => {
    try {
        const tasks = await Task.getAllTasks()
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: "something went wrong within the Tasks router",
        errorMessage: err.message,
        stack: err.stack
    })
})

module.exports = router
const router = require('express').Router()
const Task = require('../task/model')

router.post('/', validateTask, async (req, res, next) => {
    try {
        const data = req.body
        const newTask = await Task.insertNewTask(data)
        res.status(201).json(newTask)
    } catch (err) {
        next(err)
    }
})

router.get("/", async (req, res) => {
    try {
      const tasks = await Task.getAllTasks()
      res.json(tasks);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Failed to get tasks", error: error.message });
    }
  });

function validateTask(req, res, next) {
    const {task_description, project_id} = req.body
    if(!project_id){
        return res.status(400).json({
            message: "project_id is require"
        })
    }
    if(!task_description) {
        return res.status(400).json({
            message: "task_description is required"
        })
    }
    if(typeof project_id !== 'number'){
        return res.status(400).json({
            message: "project_id must be a number"
        })
    }
    next()
}

router.use((err, req, res, next) => { //eslint-disable-line
    res.status(500).json({
        customMessage: "something went wrong within the Tasks router",
        errorMessage: err.message,
        stack: err.stack
    })
})

module.exports = router
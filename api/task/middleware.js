function validateTask(req, res, next) {
    const { task_description, project_id } = req.body
    if (!project_id) {
        return res.status(400).json({
            message: "project_id is required"
        })
    }
    if (!task_description) {
        return res.status(400).json({
            message: "task_description is required"
        })
    }
    if (typeof project_id !== 'number') {
        return res.status(400).json({
            message: "project_id must be a number"
        })
    }
    next()
}

module.exports = { validateTask }
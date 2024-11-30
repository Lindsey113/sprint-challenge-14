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
    next()
}

module.exports = { validateTask }
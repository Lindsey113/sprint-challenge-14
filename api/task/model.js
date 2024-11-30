const db = require('../../data/dbConfig')

async function getAllTasks() {
    return db("tasks as t")
        .join("projects as p", "t.project_id", "p.project_id")
        .select(
            "t.task_id",
            "t.task_description",
            "t.task_notes",
            db.raw(
                "CASE WHEN t.task_completed = 0 THEN 0 ELSE 1 END as task_completed"
            ),
            "p.project_name",
            "p.project_description"
        )
        .then((tasks) =>
            tasks.map((task) => ({
                ...task,
                task_completed: task.task_completed === 1,
            }))
        );
}

async function getTaskById(task_id) {
    const rows = await db('tasks as t')
        .where('task_id', task_id);

    return rows
}

async function insertNewTask(task) {
    try {
        const proj = await db('projects')
            .where('project_id', task.project_id).first()

        if (!proj) {
            throw new Error('project_id must be valid')
        }

        const data = {
            ...task,
            task_completed: task.task_completed ? 1 : 0
        }

        const [taskID] = await db('tasks').insert(data)
        const newTask = await getTaskById(taskID)
        return newTask
    } catch (err) {
        console.error(err)
    }
}

async function getTaskByName(task_name) {
    const res = await db('tasks').where({ task_name }).first();
    return res
}


module.exports = {
    getAllTasks,
    getTaskById,
    getTaskByName,
    insertNewTask
}
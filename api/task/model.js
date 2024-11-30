const db = require('../../data/dbConfig')

async function getAllTasks() {
    const rows = await db("tasks as t")
        .leftJoin("projects as p", "t.project_id", "p.project_id")
        .select(
            "task_id",
            "task_description",
            "task_notes",
            "task_completed",
            "p.project_name",
            "p.project_description"
        )
    const result = rows.map((task) => {
        return { ...task, task_completed: task.task_completed ? true : false, }

    });



    return result
}



async function insertNewTask(task) {

    const [task_id] = await db('tasks').insert(task)
    const newTask = await db('tasks').where({ task_id }).first()
    if (!newTask) {
        return null
    }
    newTask.task_completed = newTask.task_completed ? true : false

    return newTask

    // const proj = await db('projects')
    //     .where('project_id', task.project_id).first()

    // if (!proj) {
    //     throw new Error('project_id must be valid')
    // }

    // const data = {
    //     ...task,
    //     task_completed: task.task_completed ? 1 : 0
    // }

    //  catch (err) {
    //     console.error(err)
    // }
}

async function getTaskByName(task_name) {
    const res = await db('tasks').where({ task_name }).first();
    return res
}


module.exports = {
    getAllTasks,
    getTaskByName,
    insertNewTask
}
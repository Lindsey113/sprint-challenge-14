const tasks = [
    {task_description: 'stuff' , task_notes: 'about stuff', task_completed: true, project_id: 1},
    {task_description: 'more stuff' , task_notes: 'wow more stuff', task_completed: false, project_id: 3},
    {task_description: 'more stuff??!!', task_notes: 'you know it', task_completed: true, project_id: 2},
]

exports.tasks = tasks

exports.seed = function (knex) {
    return knex('tasks').insert(tasks)
}
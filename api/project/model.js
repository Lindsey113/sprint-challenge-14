const db = require('../../data/dbConfig')

async function getAllProjects() {
    const rows = await db("projects")
    const result = rows.map((project) => {
        return {
            ...project,
            project_completed: project.project_completed ? true : false
        }

    })
    return result
}

async function insertNewProject(project) {
    const [project_id] = await db('projects').insert(project)
    const newProject = await db('projects').where({ project_id }).first()
    if (!newProject) {
        return null
    }
    newProject.project_completed = newProject.project_completed ? true : false
    return newProject
}

module.exports = {
    getAllProjects,
    insertNewProject
}
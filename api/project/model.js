const db = require('../../data/dbConfig')

async function getProjectById(project_id){
    const rows = await db('projects as p')
        .where('project_id', project_id)

   return rows
}

async function getAllProjects() {
    try {
        const rows = await db('projects as p')
        return rows
    } catch (error) {
        console.log("Error getting projects", error)
    }
}

module.exports = {
    getProjectById,
    getAllProjects
}
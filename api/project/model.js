const db = require('../../data/dbConfig')

async function getProjectById(project_id){
    const rows = await db('projects as p')
        .where('project_id', project_id);

   return rows
}

async function getProjectByName(project_name){
    const proj = await db('projects').where({project_name}).first();
    return proj
}

async function getAllProjects() {
    return db("projects").then((projects) =>
        projects.map((project) => ({
          ...project,
          project_completed: !!project.project_completed,
        }))
      );
}

async function insertNewProject(project) {
    try {
        const {project_name, project_description, project_completed} = project
        const projectExists = await getProjectByName(project_name)

        if(projectExists){
            return projectExists
        }

        const newProj = {
            project_name,
            project_description,
            project_completed: project_completed ? 1 : 0
        }

        const [id] = await db('projects').insert(newProj, 'project_id')
        const projectId = id.project_id ? id.project_id : id
        

        return getProjectById(projectId)

    } catch(err) {
        console.error(err)
        throw new Error('Failed to insert new Project')
    }
}

module.exports = {
    getProjectById,
    getAllProjects,
    insertNewProject,
    getProjectByName
}
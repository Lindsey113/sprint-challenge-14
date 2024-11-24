const db = require('../../data/dbConfig')

function getProjectById(project_id){
    return Promise.resolve(`This is project number ${project_id}`)
}

module.exports = {
    getProjectById
}
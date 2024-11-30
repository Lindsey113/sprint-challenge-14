const db = require('../../data/dbConfig')

async function getAllResources() {
    return db("resources")
}

async function insertNewResource(resource) {
    const [resource_id] = await db('resources').insert(resource)
    const newResource = await db('resources').where({ resource_id }).first();

    return newResource
}

async function getResourceByName(resourceName) {
    const res = await db('resources').where({ resource_name: resourceName }).first();
    return res
}



module.exports = {
    getAllResources,
    getResourceByName,
    insertNewResource
}
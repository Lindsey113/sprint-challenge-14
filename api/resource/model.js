const db = require('../../data/dbConfig')

async function getAllResources() {
    return db("resources").then((resources) =>
        resources.map((resource) => ({
            ...resource,
            resource_completed: !!resource.resource_completed,
        }))
    );
}

async function getResourceById(resource_id) {
    const rows = await db('resources as p')
        .where('resource_id', resource_id);

    return rows
}

async function insertNewResource(resource) {
    try {
        const { resource_name, resource_description } = resource
        const resourceExists = await getResourceByName(resource_name)

        if (resourceExists) {
            return resourceExists
        }

        const newResource = {
            resource_name,
            resource_description
        }

        const [id] = await db('resources').insert(newResource, 'resource_id')
        const resId = id.resource_id ? id.resource_id : id

        return getResourceById(resId)
    } catch (err) {
        console.error(err)
    }
}

async function getResourceByName(resource_name) {
    const res = await db('resources').where({ resource_name }).first();
    return res
}



module.exports = {
    getAllResources,
    getResourceByName,
    insertNewResource
}
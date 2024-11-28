const projects = [
    {project_name: 'History Project', project_description: 'The fur trade in Canada', project_completed: false},
    {project_name: 'Math Project', project_completed: true},
    {project_name: 'Science Project', project_description: 'Global Warming', project_completed: true},
    {project_name: 'Biology Project', project_description: 'The Powerhouse of the Cell', project_completed: false},
]

exports.projects = projects

exports.seed = function (knex) {
    return knex('projects').insert(projects)
}
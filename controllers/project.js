const Project = require('../models/project');

function getProjects(req, res) {

    Project.find({}, function(err, projectData) {
        if (err) {
            res.status(500).send({code: 500, message: "Error del servidor"})
        } else if (!projectData) {
            res.status(404).send({code: 404, message: "No se ha encontrado ningún proyecto"})
        } else {
            res.status(200).send({code: 200, projects: projectData})
        }
    })
}

function postProject(req, res) {

    const { project, excerpt, img, github, gitlab, website } = req.body;

    const new_project = new Project();

    new_project.project = project;
    new_project.excerpt = excerpt;
    new_project.img = img;
    new_project.github = github;
    new_project.gitlab = gitlab;
    new_project.website = website;

    if (!project || !excerpt || !img) {
        res.status(403).send({code: 403, messsage: "Por favor, rellena todos los campos que son obligatorios"});
    } else {
        new_project.save((err, projectData) => {
            if (err) {
                res.status(500).send({code: 500, message: "Error del servidor"})
            } else if (!projectData) {
                res.status(404).send({code: 400, message: "Error al crear proyecto"})
            } else {
                res.status(200).send({code: 200, project: projectData});
            }
        })
    }
}

module.exports = {
    getProjects: getProjects,
    postProject: postProject
}
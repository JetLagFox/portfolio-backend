const Express = require("express");
const projectController = require("./../controllers/project");

const api = Express();

api.get("/projects", projectController.getProjects);
api.post("/add-project", projectController.postProject);

module.exports = api;
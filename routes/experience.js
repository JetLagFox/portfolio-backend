const Express = require("express");
const ExperienceController = require("./../controllers/experience");

const api = Express();

api.get("/experiences", ExperienceController.getExperiences);
api.get("/experiences/:id", ExperienceController.getExperienceById);
api.post("/add-experience", ExperienceController.postExperience);

module.exports = api;

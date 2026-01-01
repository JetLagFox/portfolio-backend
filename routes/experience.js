const Express = require("express");
const ExperienceController = require("./../controllers/experience");

const api = Express();

api.get("/experiences", ExperienceController.getExperiences);
api.get("/experiences/:page", ExperienceController.getExperiencesPaginated);
api.get("/experience/:id", ExperienceController.getExperienceById);
api.get("/search-experiences/:title/:page", ExperienceController.getExperienceByTitle);
api.post("/add-experience", ExperienceController.postExperience);
api.put("/update-experience/:id", ExperienceController.updateExperience);
api.post("/delete-experience/:id", ExperienceController.deleteExperience);

module.exports = api;

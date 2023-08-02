const Experience = require("./../models/experience");

function getExperiences(req, res) {
  Experience.find({}, function (err, experiencesData) {
    if (err) {
      res.status(500).send({ code: 500, message: "Error del servidor" });
    } else if (!experiencesData) {
      res.status(404).send({
        code: 404,
        message: "No se ha encontrado ninguna experiencia",
      });
    } else {
      res.status(200).send({ code: 200, experiences: experiencesData });
    }
  });
}

function getExperienceById(req, res) {
  const id = req.params.id;

  Experience.findById(id, function (err, ExperienceData) {
    if (err) {
      res
        .status(500)
        .send({ code: 500, message: "Error de servidor", error: err });
    } else if (!ExperienceData) {
      res
        .status(404)
        .send({ code: 404, message: "No se han encontrado datos" });
    } else {
      res.status(200).send({ code: 200, experience: ExperienceData });
    }
  });

  return;
}

function postExperience(req, res) {
  const {
    job,
    city,
    country,
    startDate,
    finishDate,
    description,
    company,
    tags,
  } = req.body;

  const experience = new Experience();

  experience.job = job;
  experience.city = city;
  experience.country = country;
  experience.startDate = startDate;
  experience.finishDate = finishDate;
  experience.description = description;
  experience.company = company;
  experience.tags = tags;

  if (!job || !city || !country || !description || !company || !tags) {
    res.status(403).send({
      code: 403,
      message: "Por favor, introduce todos los valores necesarios",
    });
  } else {
    experience.save((err, experienceData) => {
      if (err) {
        res.status(500).send({ code: 500, message: "Error del servidor" });
      } else if (!experienceData) {
        res
          .status(404)
          .send({ code: 404, message: "Error al crear experiencia" });
      } else {
        res.status(200).send({ code: 200, experience: experienceData });
      }
    });
  }
}

module.exports = {
  getExperiences,
  getExperienceById,
  postExperience,
};

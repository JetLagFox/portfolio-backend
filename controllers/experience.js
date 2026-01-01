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

function getExperiencesPaginated(req, res) {
  const pageBreadcrumbs = [
    {
      href: "/admin",
      title: "Admin",
    },
    {
      title: "Experiencias",
    },
  ];

  const page = req.params.page || 1;

  const params = {
    page: page,
    limit: 10,
  };

  Experience.paginate({}, params)
    .then((response) =>
      res.send({
        code: response.status,
        breadcrumbs: pageBreadcrumbs,
        experiences: response,
      })
    )
    .catch((err) => {
      res.send({
        code: 500,
        message: "Algo salió mal",
      });
    });
}

function getExperienceById(req, res) {
  const id = req.params.id;

  Experience.findById(id, function (err, ExperienceData) {
    if (err) {
      res.status(500).send({ code: 500, message: "Error de servidor", error: err });
    } else if (!ExperienceData) {
      res.status(404).send({ code: 404, message: "No se han encontrado datos" });
    } else {
      const pageBreadcrumbs = [
        {
          href: "/admin",
          title: "Admin",
        },
        {
          href: "/admin/experiences",
          title: "Experiencias",
        },
        {
          title: ExperienceData.job,
        },
      ];

      res.status(200).send({
        code: 200,
        experience: ExperienceData,
        breadcrumbs: pageBreadcrumbs,
      });
    }
  });

  return;
}

function getExperienceByTitle(req, res) {
  const search = req.params.title;
  const page = req.params.page;
  const pageBreadcrumbs = [
    {
      href: "/admin",
      title: "Admin",
    },
    {
      title: "Experiencias",
    },
  ];

  const params = {
    page: page,
    limit: 1,
  };

  Experience.paginate({ job: { $regex: search, $options: "i" } }, params)
    .then((response) =>
      res.send({
        code: response.status,
        experiences: response,
        breadcrumbs: pageBreadcrumbs,
      })
    )
    .catch((err) => {
      res.send({
        code: 500,
        message: "Algo salió mal eeeeeee",
      });
    });

  // Experience.find({ job: { $regex: search, $options: "i" } }, (err, experiencesData) => {
  //   if (err) {
  //     res.status(500).send({ code: 500, message: "Error de servidor" });
  //   } else if (!experiencesData) {
  //     res.status(404).send({ code: 404, message: "Ningún registro que mostrar" });
  //   } else {
  //     res.status(200).send({ code: 200, experiences: experiencesData });
  //   }
  // });
}

function postExperience(req, res) {
  const { job, city, country, startDate, finishDate, description, company, tags, published } = req.body;

  const experience = new Experience();

  experience.job = job;
  experience.city = city;
  experience.country = country;
  experience.startDate = startDate;
  experience.finishDate = finishDate;
  experience.description = description;
  experience.company = company;
  experience.tags = tags;
  experience.published = published;

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
        res.status(404).send({ code: 404, message: "Error al crear experiencia" });
      } else {
        res.status(200).send({ code: 200, experience: experienceData });
      }
    });
  }
}

function deleteExperience(req, res) {
  const id = req.params.id;

  Experience.findByIdAndDelete(id, (err, experienceData) => {
    if (err) {
      res.status(500).send({ code: 500, message: err.message });
    } else if (!experienceData) {
      res.status(404).send({ code: 404, message: "No se encontró el registro" });
    } else {
      res.status(200).send({ code: 200, message: "Mensaje borrado" });
    }
  });
}

function updateExperience(req, res) {
  const id = req.params.id;

  console.log("Esto sería ID: ", id);

  const { job, city, country, startDate, finishDate, description, company, tags, published } = req.body;

  const updatedData = {
    job,
    city,
    startDate,
    finishDate,
    description,
    company,
    tags,
    published,
  };

  console.log(updatedData);

  if (!job || !city || !description || !company || !tags) {
    res.status(403).send({
      code: 403,
      message: "Por favor, introduce todos los valores necesarios",
    });
  } else {
    Experience.findByIdAndUpdate(id, updatedData, { new: true }, (err, updatedExperience) => {
      if (err) {
        res.status(500).send({ code: 500, message: err.message });
      } else if (!updatedExperience) {
        res.status(404).send({ code: 404, message: "Algo salió mal" });
      } else {
        res.status(200).send({ code: 200, message: "Registro actualizado" });
      }
    });
  }
}

module.exports = {
  getExperiences,
  getExperiencesPaginated,
  getExperienceById,
  getExperienceByTitle,
  postExperience,
  updateExperience,
  deleteExperience,
};

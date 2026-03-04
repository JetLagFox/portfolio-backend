const supabase = require("./../supabase");

async function getExperiences(req, res) {
  const { data, error } = await supabase.from("experiences").select("*");

  if (error) {
    res.status(500).send({ code: 500, message: "Error del servidor" });
  } else if (!data || data.length === 0) {
    res.status(404).send({ code: 404, message: "No se ha encontrado ninguna experiencia" });
  } else {
    res.status(200).send({ code: 200, experiences: data });
  }
}

async function getExperiencesPaginated(req, res) {
  const pageBreadcrumbs = [
    { href: "/admin", title: "Admin" },
    { title: "Experiencias" },
  ];

  const page = parseInt(req.params.page) || 1;
  const limit = 1;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("experiences")
    .select("*", { count: "exact" })
    .range(from, to);

  if (error) {
    res.send({ code: 500, message: "Algo salió mal" });
  } else {
    res.send({
      code: 200,
      breadcrumbs: pageBreadcrumbs,
      experiences: { docs: data, total: count, page, pages: Math.ceil(count / limit) },
    });
  }
}

async function getExperienceById(req, res) {
  const id = req.params.id;

  const { data, error } = await supabase.from("experiences").select("*").eq("id", id).single();

  if (error) {
    res.status(500).send({ code: 500, message: "Error de servidor", error });
  } else if (!data) {
    res.status(404).send({ code: 404, message: "No se han encontrado datos" });
  } else {
    const pageBreadcrumbs = [
      { href: "/admin", title: "Admin" },
      { href: "/admin/experiences", title: "Experiencias" },
      { title: data.job },
    ];

    res.status(200).send({
      code: 200,
      experience: data,
      breadcrumbs: pageBreadcrumbs,
    });
  }
}

async function getExperienceByTitle(req, res) {
  const search = req.params.title;
  const page = parseInt(req.params.page) || 1;

  const pageBreadcrumbs = [
    { href: "/admin", title: "Admin" },
    { title: "Experiencias" },
  ];

  const limit = 1;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("experiences")
    .select("*", { count: "exact" })
    .ilike("job", `%${search}%`)
    .range(from, to);

  if (error) {
    res.send({ code: 500, message: "Algo salió mal" });
  } else {
    res.send({
      code: 200,
      experiences: { docs: data, total: count, page, pages: Math.ceil(count / limit) },
      breadcrumbs: pageBreadcrumbs,
    });
  }
}

async function postExperience(req, res) {
  const { job, city, country, startDate, finishDate, description, company, tags, published } = req.body;

  if (!job || !city || !country || !description || !company || !tags) {
    res.status(403).send({
      code: 403,
      message: "Por favor, introduce todos los valores necesarios",
    });
    return;
  }

  console.log("Received experience data:", req.body);

  const newExperience = {
    job,
    city,
    country,
    description,
    company,
    tags,
    published,
    startdate: startDate,
    finishdate: finishDate,
  };

  const { data, error } = await supabase.from("experiences").insert([newExperience]).select().single();

  if (error) {
    console.error("Supabase error:", error);
    res.status(500).send({ code: 500, message: "Error del servidor", error: error.message });
  } else if (!data) {
    res.status(404).send({ code: 404, message: "Error al crear experiencia" });
  } else {
    res.status(200).send({ code: 200, experience: data });
  }
}

async function deleteExperience(req, res) {
  const id = req.params.id;

  const { error } = await supabase.from("experiences").delete().eq("id", id);

  if (error) {
    res.status(500).send({ code: 500, message: error.message });
  } else {
    res.status(200).send({ code: 200, message: "Mensaje borrado" });
  }
}

async function updateExperience(req, res) {
  const id = req.params.id;
  const { job, city, country, startDate, finishDate, description, company, tags, published } = req.body;

  if (!job || !city || !description || !company || !tags) {
    res.status(403).send({
      code: 403,
      message: "Por favor, introduce todos los valores necesarios",
    });
    return;
  }

  const updatedData = {
    job,
    city,
    country,
    startdate: startDate,
    finishdate: finishDate,
    description,
    company,
    tags,
    published,
  };

  const { data, error } = await supabase.from("experiences").update(updatedData).eq("id", id).select().single();

  if (error) {
    res.status(500).send({ code: 500, message: error.message });
  } else if (!data) {
    res.status(404).send({ code: 404, message: "Algo salió mal" });
  } else {
    res.status(200).send({ code: 200, message: "Registro actualizado" });
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

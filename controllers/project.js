const supabase = require("./../supabase");

async function getProjects(req, res) {
  const { data, error } = await supabase.from("projects").select("*");

  if (error) {
    res.status(500).send({ code: 500, message: "Error del servidor" });
  } else if (!data || data.length === 0) {
    res.status(404).send({ code: 404, message: "No se ha encontrado ningún proyecto" });
  } else {
    res.status(200).send({ code: 200, projects: data });
  }
}

async function postProject(req, res) {
  const { project, excerpt, img, github, gitlab, website } = req.body;

  if (!project || !excerpt || !img) {
    res.status(403).send({ code: 403, message: "Por favor, rellena todos los campos que son obligatorios" });
    return;
  }

  const newProject = {
    project,
    excerpt,
    img,
    github,
    gitlab,
    website,
  };

  const { data, error } = await supabase.from("projects").insert([newProject]).select().single();

  if (error) {
    res.status(500).send({ code: 500, message: "Error del servidor" });
  } else if (!data) {
    res.status(400).send({ code: 400, message: "Error al crear proyecto" });
  } else {
    res.status(200).send({ code: 200, project: data });
  }
}

module.exports = {
  getProjects,
  postProject,
};

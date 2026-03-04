const supabase = require("./../supabase");
const bcrypt = require("bcrypt");

async function getUsers(req, res) {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    res.status(500).send({ code: 500, error, message: "Algo salió mal" });
  } else if (!data || data.length === 0) {
    res.status(404).send({ code: 404, message: "No hay datos que mostrar" });
  } else {
    res.status(200).send({ code: 200, users: data });
  }
}

async function getUserById(req, res) {
  const id = req.params.id;

  const { data, error } = await supabase.from("users").select("*").eq("id", id).single();

  if (error) {
    res.status(500).send({ code: 500, message: "Algo salió mal" });
  } else if (!data) {
    res.status(404).send({ code: 404, message: "No hay ningún registro que mostrar" });
  } else {
    res.status(200).send({ code: 200, user: data });
  }
}

async function getUserByName(req, res) {
  const name = req.params.name;

  const { data, error } = await supabase.from("users").select("*").ilike("name", name);

  if (error) {
    res.status(500).send({ code: 500, message: "Algo salió mal" });
  } else if (!data || data.length === 0) {
    res.status(404).send({ code: 404, message: "No hay ningún registro que mostrar" });
  } else {
    res.status(200).send({ code: 200, user: data });
  }
}

async function getUserByEmail(req, res) {
  const email = req.params.email;

  const { data, error } = await supabase.from("users").select("*").ilike("email", email);

  if (error) {
    res.status(500).send({ code: 500, message: "Algo salió mal" });
  } else if (!data || data.length === 0) {
    res.status(404).send({ code: 404, message: "No hay ningún registro que mostrar" });
  } else {
    res.status(200).send({ code: 200, user: data });
  }
}

async function addUser(req, res) {
  const { user, email, password } = req.body;

  if (!user || !email || !password) {
    res.status(404).send({ code: 404, message: "Todos los campos son obligatorios" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    name: user,
    email,
    password: hashedPassword,
    register_date: new Date().toISOString(),
  };

  const { data, error } = await supabase.from("users").insert([newUser]).select().single();

  if (error) {
    res.status(500).send({ code: 500, error, message: "Algo salió mal" });
  } else if (!data) {
    res.status(404).send({ code: 404, message: "No hay datos que mostrar" });
  } else {
    res.status(200).send({ code: 200, user: data });
  }
}

module.exports = {
  getUsers,
  getUserById,
  getUserByName,
  getUserByEmail,
  addUser,
};

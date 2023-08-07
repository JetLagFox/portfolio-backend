const User = require("./../models/user");
const bcrypt = require("bcrypt");

function getUsers(req, res) {
  User.find({}, function (err, UsersData) {
    if (err) {
      res
        .status(500)
        .send({ code: 500, error: err, message: "Algo salió mal" });
    } else if (!UsersData) {
      res.status(404).send({ code: 404, message: "No hay datos que mostrar" });
    } else {
      res.status(200).send({ code: 200, users: UsersData });
    }
  });
}

function getUserById(req, res) {
  const id = req.params.id;

  User.findById(id, (err, userData) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Algo salió mal" });
    } else if (!userData) {
      res
        .status(404)
        .send({ code: 404, message: "No hay ningún registro que mostrar" });
    } else {
      res.status(200).send({ code: 200, user: userData });
    }
  });
}

function getUserByName(req, res) {
  const name = req.params.name;

  User.find({ name }, (err, userData) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Algo salió mal" });
    } else if (!userData) {
      res
        .status(404)
        .send({ code: 404, message: "No hay ningún registro que mostrar" });
    } else {
      console.log(userData);
      res.status(200).send({ code: 200, user: userData });
    }
  });
}

function getUserByEmail(req, res) {
  const email = req.params.email;

  User.find({ email }, (err, userData) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Algo salió mal" });
    } else if (!userData) {
      res
        .status(404)
        .send({ code: 404, message: "No hay ningún registro que mostrar" });
    } else {
      res.status(200).send({ code: 200, user: userData });
    }
  });
}

async function addUser(req, res) {
  const { user, email, password } = req.body;

  let newUser = new User();

  newUser.name = user;
  newUser.email = email;
  newUser.password = await bcrypt.hash(password, 10);

  console.log(newUser);

  if (!user || !email || !password) {
    res
      .status(404)
      .send({ code: 404, message: "Todos los campos son obigatorios" });
  } else {
    newUser.save((err, UserData) => {
      if (err) {
        res
          .status(500)
          .send({ code: 500, error: err, message: "Algo salió mal" });
      } else if (!UserData) {
        res
          .status(404)
          .send({ code: 404, message: "No hay datos que mostrar" });
      } else {
        res.status(200).send({ code: 200, user: UserData });
      }
    });
  }
}

module.exports = {
  getUsers,
  getUserById,
  getUserByName,
  getUserByEmail,
  addUser,
};

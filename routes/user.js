const Express = require("express");
const UserController = require("./../controllers/user");

const api = Express();

api.get("/users", UserController.getUsers);
api.post("/add-user", UserController.addUser);
api.get("/user/:id", UserController.getUserById);
api.get("/user-by-name/:name", UserController.getUserByName);
api.get("/user-by-email/:email", UserController.getUserByEmail);

module.exports = api;

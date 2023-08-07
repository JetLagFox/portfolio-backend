const Express = require("express");
const PostController = require("./../controllers/post");

const api = Express();

api.get("/posts", PostController.getPosts);
api.get("/post/:slug", PostController.getPostBySlug);
api.post("/add-post", PostController.addPost);

module.exports = api;

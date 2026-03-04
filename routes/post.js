const Express = require("express");
const PostController = require("./../controllers/post");

const api = Express();

api.get("/posts", PostController.getPosts);
api.get("/posts/:page", PostController.getPostsPaginated);
api.get("/search-post/:title/:page", PostController.getPostsByTitle);
api.get("/post-id/:id", PostController.getPostById);
api.get("/post/:slug", PostController.getPostBySlug);
api.get("/published-posts", PostController.getPublishedPosts);
api.get("/search-published/:title/:page", PostController.searchPublishedPosts);
api.post("/add-post", PostController.addPost);
api.post("/update-post/:id", PostController.updatePost);
api.post("/delete-post/:id", PostController.deletePost);

module.exports = api;

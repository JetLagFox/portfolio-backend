const Post = require("./../models/post");
const { getCurrentDate } = require("./../utils/getCurrentDate");

function getPosts(req, res) {
  Post.find({}, (err, PostsData) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Error de servidor" });
    } else if (!PostsData) {
      res
        .status(404)
        .send({ code: 404, message: "Ningún registro que mostrar" });
    } else {
      res.status(200).send({ code: 200, posts: PostsData });
    }
  });
}

function getPostBySlug(req, res) {
  const slug = req.params.slug;

  Post.find({ slug }, (err, PostData) => {
    if (err) {
      res.status(500).send({ code: 500, message: "Algo salió mal" });
    } else if (!PostData) {
      res
        .status(404)
        .send({ code: 404, message: "Ningún registro que mostrar" });
    } else {
      res.status(200).send({ code: 200, post: PostData });
    }
  });
}

function addPost(req, res) {
  const { title, excerpt, content, img, slug, published, post_type } = req.body;

  const newPost = new Post();

  newPost.slug = slug;
  newPost.title = title;
  newPost.excerpt = excerpt;
  newPost.content = content;
  newPost.img = img;
  newPost.date_published = getCurrentDate();
  newPost.published = published;
  newPost.post_type = post_type;

  if (
    !title ||
    !slug ||
    !excerpt ||
    !content ||
    !img ||
    !published ||
    !post_type
  ) {
    res
      .status(403)
      .send({ code: 403, message: "Todos los campos son obligatorios" });
  } else {
    newPost.save(newPost, (err, PostData) => {
      if (err) {
        res.status(500).send({ code: 500, message: err.message });
      } else if (!PostData) {
        res.status(404).send({
          code: 404,
          message: "Hubo algún problema al guardar el registro",
        });
      } else {
        res.status(200).send({ code: 200, post: PostData });
      }
    });
  }
}

module.exports = {
  getPosts,
  getPostBySlug,
  addPost,
};

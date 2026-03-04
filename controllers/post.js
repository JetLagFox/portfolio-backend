const supabase = require("./../supabase");
const { getCurrentDate } = require("./../utils/getCurrentDate");

async function getPosts(req, res) {
  const { data, error } = await supabase.from("posts").select("*");
  
  if (error) {
    res.status(500).send({ code: 500, message: "Error de servidor" });
  } else if (!data || data.length === 0) {
    res.status(404).send({ code: 404, message: "Ningún registro que mostrar" });
  } else {
    res.status(200).send({ code: 200, posts: data });
  }
}

async function getPostsPaginated(req, res) {
  const pageBreadcrumbs = [
    { href: "/admin", title: "Admin" },
    { title: "Posts" },
  ];

  const page = parseInt(req.params.page) || 1;
  const limit = 10;
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .range(from, to);

  if (error) {
    res.send({ code: 500, message: "Algo salió mal" });
  } else {
    res.send({
      code: 200,
      breadcrumbs: pageBreadcrumbs,
      posts: { docs: data, total: count, page, pages: Math.ceil(count / limit) },
    });
  }
}

async function getPostsByTitle(req, res) {
  const { title, page } = req.params;

  const pageBreadcrumbs = [
    { href: "/admin", title: "Admin" },
    { title: "Posts" },
  ];

  const pageNum = parseInt(page) || 1;
  const limit = 1;
  const from = (pageNum - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("posts")
    .select("*", { count: "exact" })
    .ilike("title", `%${title}%`)
    .range(from, to);

  if (error) {
    res.send({ code: 500, message: "Algo salió mal" });
  } else {
    res.send({
      code: 200,
      posts: { docs: data, total: count, page: pageNum, pages: Math.ceil(count / limit) },
      breadcrumbs: pageBreadcrumbs,
    });
  }
}

async function updatePost(req, res) {
  const id = req.params.id;
  const { title, excerpt, content, img, slug, published, post_type, tags, hero_style, hero_config } = req.body;

  if (!title || !slug || !excerpt || !content || !img || !post_type) {
    res.status(403).send({ code: 403, message: "Todos los campos son obligatorios" });
    return;
  }

  const { data, error } = await supabase
    .from("posts")
    .update({ title, excerpt, content, img, slug, published, post_type, tags, hero_style, hero_config, date_updated: getCurrentDate() })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    res.status(500).send({ code: 500, message: error.message });
  } else if (!data) {
    res.status(404).send({ code: 404, message: "Hubo algún problema al actualizar el registro" });
  } else {
    res.status(200).send({ code: 200, post: data });
  }
}

async function getPostById(req, res) {
  const id = req.params.id;

  const { data, error } = await supabase.from("posts").select("*").eq("id", id).single();

  if (error) {
    res.status(500).send({ code: 500, message: "Algo salió mal" });
  } else if (!data) {
    res.status(404).send({ code: 404, message: "Post no encontrado" });
  } else {
    res.status(200).send({ code: 200, post: data });
  }
}

async function getPostBySlug(req, res) {
  const slug = req.params.slug;

  const { data, error } = await supabase.from("posts").select("*").eq("slug", slug);

  if (error) {
    res.status(500).send({ code: 500, message: "Algo salió mal" });
  } else if (!data || data.length === 0) {
    res.status(404).send({ code: 404, message: "Ningún registro que mostrar" });
  } else {
    res.status(200).send({ code: 200, post: data });
  }
}

async function addPost(req, res) {
  const { title, excerpt, content, img, slug, published, post_type, tags, hero_style, hero_config } = req.body;

  if (!title || !slug || !excerpt || !content || !img || !post_type) {
    res.status(403).send({ code: 403, message: "Todos los campos son obligatorios" });
    return;
  }

  const newPost = {
    slug,
    title,
    excerpt,
    content,
    img,
    date_published: getCurrentDate(),
    published,
    post_type,
    tags,
    hero_style: hero_style || "compact",
    hero_config: hero_config || null,
  };

  const { data, error } = await supabase.from("posts").insert([newPost]).select().single();

  if (error) {
    res.status(500).send({ code: 500, message: error.message });
  } else if (!data) {
    res.status(404).send({ code: 404, message: "Hubo algún problema al guardar el registro" });
  } else {
    res.status(200).send({ code: 200, post: data });
  }
}

async function deletePost(req, res) {
  const id = req.params.id;

  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    res.status(500).send({ code: 500, message: error.message });
  } else {
    res.status(200).send({ code: 200, message: "Mensaje borrado" });
  }
}

async function getPublishedPosts(req, res) {
  const { data, error } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, img, post_type, date_published, tags")
    .eq("published", true)
    .order("date_published", { ascending: false })
    .limit(9);

  if (error) {
    res.status(500).send({ code: 500, message: "Algo salió mal" });
  } else {
    res.status(200).send({ code: 200, posts: data || [] });
  }
}

async function searchPublishedPosts(req, res) {
  const { title, page } = req.params;
  const pageNum = parseInt(page) || 1;
  const limit = 10;
  const from = (pageNum - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from("posts")
    .select("id, slug, title, excerpt, img, post_type, date_published, tags", { count: "exact" })
    .eq("published", true)
    .ilike("title", `%${title}%`)
    .range(from, to);

  if (error) {
    res.status(500).send({ code: 500, message: "Algo salió mal" });
  } else {
    res.status(200).send({
      code: 200,
      posts: { docs: data, total: count, page: pageNum, pages: Math.ceil(count / limit) },
    });
  }
}

module.exports = {
  getPosts,
  getPostsPaginated,
  getPostsByTitle,
  getPostById,
  getPostBySlug,
  addPost,
  updatePost,
  deletePost,
  getPublishedPosts,
  searchPublishedPosts,
};

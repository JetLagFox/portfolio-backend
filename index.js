const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const supabase = require("./supabase");

require("dotenv").config();

const port = process.env.BACKEND_PORT || 8000;

const app = express();

const experiencesRoutes = require("./routes/experience");
const projectsRoutes = require("./routes/project");
const userRoutes = require("./routes/user");
const postsRoutes = require("./routes/post");

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use(cors());
app.use(bodyParser.json());

app.use(`/api`, experiencesRoutes);
app.use(`/api`, projectsRoutes);
app.use(`/api`, userRoutes);
app.use(`/api`, postsRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

require("dotenv").config();

const port = process.env.BACKEND_PORT;
const uri = process.env.MONGODB_URL;

const app = express();

//routes
const experiencesRoutes = require("./routes/experience");
const projectsRoutes = require("./routes/project");
const userRoutes = require("./routes/user");

//middlewares
app.use(express.urlencoded({ extended: true }));

// Configue http
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

mongoose.set("strictQuery", false);
mongoose.connect(
  uri,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("La conexión a la base de datos es correcta.");
    }
  }
);

app.use(`/api`, experiencesRoutes);
app.use(`/api`, projectsRoutes);
app.use(`/api`, userRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

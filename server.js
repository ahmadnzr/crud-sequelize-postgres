const express = require("express");
const cors = require("cors");
const db = require("./app/models");

const app = express();

const corsOpotion = {
  origin: "http://localhost:8080",
};

// setup
app.use(cors(corsOpotion));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize.sync();

// db.sequelize.sync({ force: true }).then(() => {
//     console.log("Drop and re-sync db.");
//   });

// route
app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

require("./app/routes/tutorial.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.clear();
  console.log(`server is running on http://localhost:${PORT}`);
});

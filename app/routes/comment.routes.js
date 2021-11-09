module.exports = (app) => {
  const comment = require("../controllers/comment.controller.js");

  const router = require("express").Router();

  router.post("/:tutorialId/comment", comment.create);

  app.use("/api/tutorials", router);
};

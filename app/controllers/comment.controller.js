const db = require("../models");
const Comment = db.comments;

exports.create = (req, res) => {
  const { tutorialId } = req.params;
  const { name, text } = req.body;

  if (!name || !text) {
    return res.status(400).json({
      message: "Content can not be empty!",
    });
  }

  const comment = {
    name,
    text,
    tutorialId,
  };

  Comment.create(comment)
    .then((data) => {
      return res.status(201).json(data);
    })
    .catch((err) => {
      return res.status(500).json({
        message:
          err.message || "Something went wrong while creating the comment",
      });
    });
};

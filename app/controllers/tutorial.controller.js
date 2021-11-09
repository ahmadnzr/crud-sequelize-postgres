const db = require("../models");
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const { title, description, published } = req.body;
  if (!title) {
    return res.status(400).json({
      message: "Content can not be empty!",
    });
  }

  const tutorial = {
    title,
    description,
    published: published ? published : false,
  };

  Tutorial.create(tutorial)
    .then((data) => {
      return res.status(201).json(data);
    })
    .catch((err) => {
      return res.status(500).json({
        message:
          err.message || "Something went wrong while creating the tutorial",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  const condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Tutorial.findAll({ where: condition })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json({ message: err });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findByPk(id, { include: ["comments"] })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Tutorial.update(req.body, {
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        return res
          .status(201)
          .json({ message: "Tutorial was updated successfully." });
      }
      return res.status(400).json({ message: "cannot update tutorial" });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Tutorial.destroy({
    where: { id },
  })
    .then((num) => {
      if (num == 1) {
        return res
          .status(201)
          .json({ message: "Tutorial was deleted successfully." });
      }
      return res.status(400).json({ message: "cannot delete tutorial" });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.deleteAll = (req, res) => {
  Tutorial.destroy({
    where: {},
    trancate: false,
  })
    .then((num) => {
      return res.status(200).json({ message: `${num} tutorials were deleted` });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

exports.findAllPublished = (req, res) => {
  Tutorial.findAll({ where: { published: true } })
    .then((data) => {
      return res.status(200).json(data);
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
};

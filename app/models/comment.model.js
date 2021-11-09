module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comments", {
    name: {
      type: Sequelize.STRING,
    },
    text: {
      type: Sequelize.STRING,
    },
  });

  return Comment;
};

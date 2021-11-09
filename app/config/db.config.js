module.exports = {
  HOST: "localhost",
  USER: "ahmad",
  PASSWORD: "root",
  DB: "tutorial_post",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

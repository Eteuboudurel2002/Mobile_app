module.exports = {
    HOST: "i2hm-psql.postgres.database.azure.com",
    USER: "i2hm",
    PASSWORD: "ProjetS10",
    DB: "malariai2hm",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
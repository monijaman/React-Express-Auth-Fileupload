require("dotenv").config(); // Load environment variables from a .env file

module.exports = {
  development: {
    username: process.env.DB_USERNAME || "root", // Default to "root" if not in .env
    password: process.env.DB_PASSWORD || null, // Default to null if not in .env
    database: process.env.DB_NAME || "database_dev", // Default to "database_dev"
    host: process.env.DB_HOST || "127.0.0.1", // Default to localhost
    dialect: "sqlite", // You can change this to "mysql" if using MySQL
    storage: process.env.DB_STORAGE || "./database.sqlite", // Path for SQLite file
  },
  test: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "database_test",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "sqlite",
    storage: "./test.sqlite", // Separate test database for SQLite
  },
  production: {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || null,
    database: process.env.DB_NAME || "database_prod",
    host: process.env.DB_HOST || "127.0.0.1",
    dialect: "sqlite", // You can change this to "mysql" if using MySQL
    storage: "./production.sqlite", // Production SQLite path (or use MySQL connection string)
  },
};

/**
 * App
 */
const PORT = process.env.PORT;

/**
 * Database env variables
 */
const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_DIALECT = process.env.DB_DIALECT;
const DB_POOL_MAX = parseInt(process.env.DB_POOL_MAX);
const DB_POOL_MIN = parseInt(process.env.DB_POOL_MIN);
const DB_POOL_ACQUIRE = process.env.DB_POOL_ACQUIRE;
const DB_POOL_IDLE = process.env.DB_POOL_IDLE;

module.exports = {
  PORT,

  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_DIALECT,
  DB_POOL_MAX,
  DB_POOL_MIN,
  DB_POOL_ACQUIRE,
  DB_POOL_IDLE,
};

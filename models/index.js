const Sequelize = require('sequelize');

const db = {};
const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_DIALECT,
  DB_POOL_MAX,
  DB_POOL_MIN,
  DB_POOL_ACQUIRE,
  DB_POOL_IDLE,
} = require('../config/constants');

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  operatorsAliases: false,

  pool: {
    max: DB_POOL_MAX,
    min: DB_POOL_MIN,
    acquire: DB_POOL_ACQUIRE,
    idle: DB_POOL_IDLE,
  },
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Exam = require('./exam.js')(sequelize, Sequelize);
db.QuestionGroup = require('./question_group')(sequelize, Sequelize);
db.QuestionBody = require('./question_body')(sequelize, Sequelize);
db.Question = require('./question')(sequelize, Sequelize);

/**
 * Associations of tables
 */
db.Exam.hasMany(db.QuestionGroup);
db.QuestionGroup.belongsTo(db.Exam);

db.QuestionGroup.hasMany(db.QuestionBody);
db.QuestionBody.belongsTo(db.QuestionGroup);

db.QuestionBody.hasMany(db.Question);
db.Question.belongsTo(db.QuestionBody);

module.exports = db;

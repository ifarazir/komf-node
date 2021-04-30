module.exports = (sequelize, Sequelize) => {
  const Exam = sequelize.define(
    'exam',
    {
      duration: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  return Exam;
};

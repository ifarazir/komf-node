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
      is_deleted: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      underscored: true,
    }
  );

  return Exam;
};

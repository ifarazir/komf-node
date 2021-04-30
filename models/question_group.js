module.exports = (sequelize, Sequelize) => {
  const QuestionQroup = sequelize.define(
    'question_group',
    {
      exam_id: {
        type: Sequelize.INTEGER,
      },
      type: {
        type: Sequelize.ENUM('reading', 'writing', 'speaking', 'listening'),
      },
    },
    {
      underscored: true,
    }
  );

  return QuestionQroup;
};

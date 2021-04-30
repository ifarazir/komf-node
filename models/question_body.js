module.exports = (sequelize, Sequelize) => {
  const QuestionBody = sequelize.define(
    'question_body',
    {
      question_group_id: {
        type: Sequelize.INTEGER(11),
      },
      content: {
        type: Sequelize.STRING(500),
      },
      file: {
        type: Sequelize.STRING(500),
      },
    },
    {
      underscored: true,
    }
  );

  return QuestionBody;
};

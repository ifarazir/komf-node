module.exports = (sequelize, Sequelize) => {
  const QuestionQroup = sequelize.define(
    'question',
    {
      question_body_id: {
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.STRING(5000),
      },
      q_number: {
        type: Sequelize.INTEGER(10),
      },
      type: {
        type: Sequelize.ENUM('multi', 'single', 'order'),
      },
      lists: {
        type: Sequelize.STRING(5000),
      },
      options: {
        type: Sequelize.STRING(5000),
      },
    },
    {
      underscored: true,
    }
  );

  return QuestionQroup;
};

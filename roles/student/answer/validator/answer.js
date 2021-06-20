const Joi = require('joi');
const Error = require('../errors/index');

const errors = new Error();

const { QuestionInstance } = require('../../../../models');

class AnswerValidator {
  async validateAnswers(answers, examSection, examInstanceId) {
    switch (examSection) {
      case 'reading':
        await this.validateReadingAnswers(answers, examInstanceId);
        break;
      case 'listening':
        await this.validateListeningAnswers(answers, examInstanceId);
        break;
      case 'speaking':
        await this.validateSpeakingAnswers(answers, examInstanceId);
        break;
      case 'writing':
        await this.validateWritingAnswers(answers, examInstanceId);
        break;
    }
  }

  async validateReadingAnswers(answers, examInstanceId) {
    for (let index = 0; index < answers.length; index++) {
      const answer = answers[index];

      const questionInstance = await QuestionInstance.findOne({
        _id: answer.questionInstanceId,
        examInstanceId,
        questionParentId: { $exists: true },
      });
      if (!questionInstance) errors.questionInstanceNotFound(index);

      const questionBodyParent = await QuestionInstance.findById(
        questionInstance.questionParentId
      );
      if (questionBodyParent.section !== 'reading')
        errors.sameQuestionType(index, 'reading');

      switch (questionInstance.type) {
        case 'singleChoice':
          this.validateSingleChoiceAnswer(answer);
          break;
        case 'multiChoice':
          this.validateMultiChoiceAnswer(answer);
          break;
        case 'ordering':
          this.validateOrderingAnswer(answer);
          break;
      }

      switch (questionInstance.type) {
        case 'singleChoice':
          this.giveScoreSingleChoiceAnswer(answer, questionInstance);
          break;
        case 'multiChoice':
          this.giveScoreMultiChoiceAnswer(answer, questionInstance);
          break;
        case 'ordering':
          this.giveScoreOrderingAnswer(answer, questionInstance);
          break;
      }
    }
  }

  async validateListeningAnswers(answers, examInstanceId) {
    for (let index = 0; index < answers.length; index++) {
      const answer = answers[index];
      const questionInstance = await QuestionInstance.findOne({
        _id: answer.questionInstanceId,
        examInstanceId,
        questionParentId: { $exists: true },
      });
      if (!questionInstance) errors.questionInstanceNotFound(index);

      const questionBodyParent = await QuestionInstance.findById(
        questionInstance.questionParentId
      );
      if (questionBodyParent.section !== 'listening')
        errors.sameQuestionType(index, 'listening');

      switch (questionInstance.type) {
        case 'singleChoice':
          this.validateSingleChoiceAnswer(answer);
          break;
        case 'multiChoice':
          this.validateMultiChoiceAnswer(answer);
          break;
        case 'ordering':
          this.validateOrderingAnswer(answer);
          break;
      }

      switch (questionInstance.type) {
        case 'singleChoice':
          this.giveScoreSingleChoiceAnswer(answer, questionInstance);
          break;
        case 'multiChoice':
          this.giveScoreMultiChoiceAnswer(answer, questionInstance);
          break;
        case 'ordering':
          this.giveScoreOrderingAnswer(answer, questionInstance);
          break;
      }
    }
  }

  async validateSpeakingAnswers(answers, examInstanceId) {
    for (let index = 0; index < answers.length; index++) {
      const answer = answers[index];
      const questionInstance = await QuestionInstance.findOne({
        _id: answer.questionInstanceId,
        examInstanceId,
      });
      if (!questionInstance) errors.questionInstanceNotFound(index);

      if (questionInstance.section !== 'speaking')
        errors.sameQuestionType(index, 'speaking');

      this.validateSpeakingAnswer(answer);
    }
  }

  async validateWritingAnswers(answers, examInstanceId) {
    for (let index = 0; index < answers.length; index++) {
      const answer = answers[index];
      const questionInstance = await QuestionInstance.findOne({
        _id: answer.questionInstanceId,
        examInstanceId,
      });
      if (!questionInstance) errors.questionInstanceNotFound(index);

      if (questionInstance.section !== 'writing')
        errors.sameQuestionType(index, 'writing');

      this.validateWritingAnswer(answer);
    }
  }

  validateSingleChoiceAnswer(answer) {
    const singleChoiceSchema = Joi.object().keys({
      questionInstanceId: Joi.objectId().required(),
      choices: Joi.array()
        .items(Joi.string().valid('A', 'B', 'C', 'D'))
        .min(1)
        .max(1)
        .required(),
    });

    schemaValidator(singleChoiceSchema, answer);
  }

  validateMultiChoiceAnswer(answer) {
    const multiChoiceSchema = Joi.object().keys({
      questionInstanceId: Joi.objectId().required(),
      choices: Joi.array()
        .items(Joi.string().valid('A', 'B', 'C', 'D', 'E'))
        .min(2)
        .max(5)
        .required(),
    });

    schemaValidator(multiChoiceSchema, answer);
  }

  validateOrderingAnswer(answer) {
    const orderSchema = Joi.object().keys({
      questionInstanceId: Joi.objectId().required(),
      choices: Joi.array()
        .items(Joi.string().valid('A', 'B', 'C', 'D', 'E'))
        .min(2)
        .max(5)
        .required(),
    });

    schemaValidator(orderSchema, answer);
  }

  validateSpeakingAnswer(answer) {
    const speakingSchema = Joi.object().keys({
      questionInstanceId: Joi.objectId().required(),
      file: Joi.string().max(1000000).required(),
    });

    schemaValidator(speakingSchema, answer);
  }

  validateWritingAnswer(answer) {
    const writingSchema = Joi.object().keys({
      questionInstanceId: Joi.objectId().required(),
      content: Joi.string().max(999999999999).required(),
    });

    schemaValidator(writingSchema, answer);
  }

  giveScoreSingleChoiceAnswer(answer, questionInstance) {
    answer.score = 20; // TODO: Change it later
  }
  giveScoreMultiChoiceAnswer(answer, questionInstance) {
    answer.score = 20; // TODO: Change it later
  }
  giveScoreOrderingAnswer(answer, questionInstance) {
    answer.score = 20; // TODO: Change it later
  }
}

const schemaValidator = (schema, data) => {
  const resultValidation = schema.validate(data);
  if (resultValidation.error) errors.inputIsNotValid(resultValidation.error);
  data = resultValidation.value;
};

module.exports = AnswerValidator;

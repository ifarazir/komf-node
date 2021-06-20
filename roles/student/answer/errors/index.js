const generalErrors = require('../../../../errors');

class errors extends generalErrors {
  noExamInProgress() {
    this.generateError({
      status: 400,
      msgEn: 'There is no exam in progress',
    });
  }

  questionInstanceNotFound(index) {
    this.generateError({
      status: 404,
      msgEn: `Question instance not found (index: ${index})`,
    });
  }

  sameQuestionType(index, type) {
    this.generateError({
      status: 400,
      msgEn: `All question must have ${type} type (index: ${index})`,
    });
  }
}

module.exports = errors;

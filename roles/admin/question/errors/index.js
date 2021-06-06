const generalErrors = require('../../../../errors');

class errors extends generalErrors {
  examDoesNotExist() {
    this.generateError({
      status: 404,
      msgEn: 'Exam not found!',
    });
  }

  parentNotExist() {
    this.generateError({
      status: 404,
      msgEn: 'Parent not found!',
    });
  }

  parentShouldBody() {
    this.generateError({
      status: 400,
      msgEn: 'Parent should be body!',
    });
  }
}

module.exports = errors;

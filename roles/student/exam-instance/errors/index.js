const generalErrors = require('../../../../errors');

class errors extends generalErrors {
  anotherExamInProgress() {
    this.generateError({
      status: 400,
      msgEn: 'Another exam in progress!',
    });
  }

  referenceExamNotFound() {
    this.generateError({
      status: 400,
      msgEn: 'Reference exam not found',
    });
  }
}

module.exports = errors;

const generalErrors = require('../../../../errors');

class errors extends generalErrors {
  noExamInProgress() {
    this.generateError({
      status: 400,
      msgEn: 'There is no exam in progress',
    });
  }
}

module.exports = errors;

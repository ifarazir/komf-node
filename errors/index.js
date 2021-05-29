class errors {
  notFoundError() {
    this.generateError({
      status: 404,
      msgEn: 'Not found',
    });
  }

  badRequestError() {
    this.generateError({
      msgEn: 'Bad request',
      status: 400,
    });
  }

  inputIsNotValid(error) {
    this.generateError({
      status: 409,
      msgEn: 'Input is not valid',
      error,
    });
  }

  generateError(errObj) {
    const error = new Error(errObj.message);
    error.msgEn = errObj.msgEn;
    error.status = errObj.status;
    if (process.env.NODE_ENV === 'development') {
      error.errorDetail = errObj.error;
    }
    throw error;
  }
}

module.exports = errors;

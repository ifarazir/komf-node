class GeneralErrors {
  notFoundError() {
    this.generateError({
      message: 'Not Found',
      status: 404,
      msgFa: 'یافت نشد !',
      msgEn: 'Not found',
    });
  }

  badRequestError() {
    this.generateError({
      message: 'Bad request',
      msgFa: 'خطا رخ داد',
      msgEn: 'Bad request',
      status: 400,
    });
  }

  inputIsNotValid(error) {
    this.generateError({
      message: 'Input is not valid',
      status: 409,
      msgFa: 'ورودی معتبر نیست',
      msgEn: 'Input is not valid',
      error,
    });
  }

  generateError(errObj) {
    const error = new Error(errObj.message);
    error.msgFa = errObj.msgFa;
    error.msgEn = errObj.msgEn;
    error.status = errObj.status;
    if (process.env.NODE_ENV === 'development') {
      error.errorDetail = errObj.error;
    }
    throw error;
  }
}

module.exports = GeneralErrors;

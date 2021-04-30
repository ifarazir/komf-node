class Response {
  constructor({ message, data }) {
    this.status = 200;
    this.message = message || '';
    this.data = data || {};
    this.timeStmp = Date.now();
  }
}

module.exports = Response;

class ApiError extends Error {
  constructor(statusCode, msg="Something went wrong", errors = [], stac = "") {
    super(msg);
    this.statusCode = statusCode
    this.data = null
    this.message = msg
    this.success = false
    this.erros = errors
  }
}
export default ApiError
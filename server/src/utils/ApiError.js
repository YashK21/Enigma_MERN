class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went wrong",
    errors = [],
    stac = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.errorMessage = message;
    this.success = false;
    this.errors = errors;
  }
}
export default ApiError;

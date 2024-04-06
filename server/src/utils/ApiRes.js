class ApiRes{
    constructor(statusCode, msg="User Response", data)
    {
        this.statusCode = statusCode
        this.message = msg
        this.data = data
        this.success = true || statusCode < 400
    }
}
export default ApiRes
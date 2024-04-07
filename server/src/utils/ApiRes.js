class ApiRes{
    constructor(statusCode, msg="User Response", data)
    {
        this.statusCode = statusCode
        this.data = data
        this.message = msg
        this.success = true || statusCode < 400
    }
}
export default ApiRes
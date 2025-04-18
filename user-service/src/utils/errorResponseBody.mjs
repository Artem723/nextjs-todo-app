export default function errorResponseBody(msg, fields) {
    return {
        message: msg,
        errors: fields
    }
}
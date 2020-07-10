module.exports = function(err, _, res, _) {
    let statusCode = 500;
    let message = "Internal Server Error"

    console.log(err);

    if (err.name === "SequelizeValidationError") {
        statusCode = 400;
        message = err.errors[0].message
    } else if (err.errCode === 'TOKEN_NOT_FOUND' || err.errCode === 'USER_NOT_FOUND' || err.errCode === 'DATA_NOT_FOUND') {
        statusCode = 404
        message = err.message
    } else if (err.errCode === "UNAUTHORIZED") {
        statusCode = 403;
        message = err.errors[0].message
    } else if (err.name === "JsonWebTokenError") {
        statusCode = 401;
        message = err.message
    } else if (err.errCode === "INVALID_EMAIL" || err.errCode === "INVALID_PASSWORD") {
        statusCode = 400;
        message = err.message
    } else if (err.errCode === "FORBIDEN_ACCESS") {
        statusCode = 403
        message = err.message
    }
    return res.status(statusCode).json({ message });
}
import logger from "../logger/index.mjs";


export default function requestLogger(req, res, next) {
    const logMsg = `${req.method} ${req.host} ${req.originalUrl}`;
    logger.http(logMsg);
    next();
}
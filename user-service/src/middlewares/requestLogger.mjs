import logger from "../logger/index.mjs";


export default function requestLogger(req, res, next) {
    const logMsg = `${req.method} ${req.hostname} ${req.originalUrl}`;
    logger.http(logMsg);
    next();
}
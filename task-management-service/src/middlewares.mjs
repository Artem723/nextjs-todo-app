import logger from "./logger/index.mjs";

export function placeUserData(req, res, next) {
    logger.info('Middleware executed');
    throw new Error("Not implemented!");
    next();
}
import logger from "./logger/index.mjs";

export function placeUserData(req, res, next) {
    const token = req.cookies?.token;
    console.log('token: ', token)
    if (!token) {
        res.status(401).end('Unauthorized.');
        return;
    }
    let payload = null;
    try {
        payload = JSON.parse(atob(token.split('.')[0]));
        if (!payload.id) {
            logger.error(`JWT payload doesn't contain user ID. payload: ${JSON.stringify(payload)}`);
            res.status(401).end("Unauthorized!");
            return;
        }
        res.locals.userID = payload.id;
        next();    
    } catch(e) {
        logger.error(e);
        logger.error(`Cannot parse the JWT payload: ${token.split('.')[0]}`)
        res.status(401).end("Unauthorized.");
        return;
    }
}

export function requestErrorHandler(err, req, res, next) {
    if (err instanceof mongoose.Error.ValidationError) {
        logger.debug(`Request is invalid: ${e.errors}`)
        res.status(400).end(err.message);
        return;
    } else {
        logger.error(`Internal error: ${err.message}`)
        logger.error(err);
        res.status(500).end('Internal Error.')
        return;
    }
}
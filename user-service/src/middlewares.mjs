import User from './db/Models/UserModel.mjs'

export async function checkToken(req, res, next) {
    const token = req.cookies?.token;
    if (!token) {
        res.status(401).end('Unauthorized.');
        return;
    }
    const user = await User.verifyAndGetUserByToken(token);
    if (!user) {
        console.log('In middleware. User is unverified.')
        res.status(401).end('Unauthorized.');
        return;
    }
    req.locals.user = user;
    next();
}
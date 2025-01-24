import User from '../db/Models/UserModel.mjs'

export default async function checkToken(req, res, next) {
    const token = req.cookies?.token;
    console.log('token: ', token)
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
    res.locals.user = user;
    next();
}
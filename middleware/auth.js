const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError } = require("../expressError");



// Authenticate User
function authenticateJWT(req, res, next){
    try {
        const authHeader = req.headers && req.headers.authorization;
        if(authHeader){
            const token = authHeader.replace(/^[Bb]earer /, "").trim();
            res.locals.user = jwt.verify(token, SECRET_KEY);
        }
        return (next);
    } catch (err) {
        return next();
    }
}


// user must be logged in, if not gets an Unauthorized Error
function ensureLoggedIn(req, res, next) {
    try{
        if(!res.locals.user) throw new UnauthorizedError();
        return next();
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    authenticateJWT,
    ensureLoggedIn,
}
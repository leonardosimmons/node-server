"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env;
function isAuth(req, res, next) {
    let decodedToken;
    const authHeader = req.header('auth-token');
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            decodedToken = jwt.verify(token, TOKEN_SECRET);
        }
        catch (err) {
            err.statusCode = 500;
        }
        if (!decodedToken) {
            const error = new Error('Not Authenticated. Token not recognzied');
            error.statusCode = 401;
            res.status(401).json({ message: 'Token not recognized' });
        }
        res.locals.u_id = decodedToken.u_id;
    }
    next();
}
exports.isAuth = isAuth;
;
//# sourceMappingURL=is-auth.js.map
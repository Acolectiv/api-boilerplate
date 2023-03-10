const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    const token = req.headers.authorization;

    if(!token) {
        return res.status(401).send({ success: false, error: "no token provided" });
    };

    try {
        const decoded = jwt.verify(token, process.env.JWT_TOKEN);
        req.userId = decoded.userId;
        next();
    } catch(e) {
        res.status(400).send({ success: false, error: "invalid token" });
    };
};

module.exports = auth;
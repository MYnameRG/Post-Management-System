const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) return res.status(500).json({ message: 'Not Authorized' });
    const token = authHeader;
    let decodeToken;
    try {
        decodeToken = jwt.verify(token, 'secret');
        if(!decodeToken) {
            return res.status(500).json({ message: 'Not Authorized' });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
    req.id = decodeToken.id;
    next();
}
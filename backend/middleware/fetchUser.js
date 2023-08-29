var jwt = require('jsonwebtoken');
const jwt_secKey = "pushkarNamberdar"

const fetchUser = (req, res, next) => {
    token = req.header("authtoken")
    const data = jwt.verify(token, jwt_secKey)
    req.user = data.user
    next()
}

module.exports = fetchUser
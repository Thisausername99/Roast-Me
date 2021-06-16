const jwt = require('jsonwebtoken');
const {token} = require('./../config');

//generate token for username
function generateToken(username){
    return jwt.sign(username, token, {expiresIn: '1800s'});
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const userToken = authHeader && authHeader.split(' ')[1]

    if (userToken == null) return res.sendStatus(401)
    jwt.verify(userToken, token, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

    req.user = user
    next()
    })
}
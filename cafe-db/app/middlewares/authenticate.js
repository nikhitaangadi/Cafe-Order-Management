require('dotenv').config()
const jwt = require('jsonwebtoken')

const authenticateUser = (req, res, next) => {
    console.log(req.header)
    let token = req.header('Authorization').split(' ')[1]
    if (token) {
        try {
            const tokenData = jwt.verify(token, process.env['JWT_SECRET'])
            req.user = tokenData
            console.log(tokenData)
            next()
        } catch (e) {
            res.json(e.message)
        }
    } else {
        res.status(401).json({
            errors: 'invalid token'
        })
    }
}

const authenticateStore = (req, res, next) => {
    let token = req.header('Authorization').split(' ')[1]
    if (token) {
        try {
            const tokenData = jwt.verify(token, process.env['JWT_SECRET'])
            req.store = tokenData
            next()
        } catch (e) {
            res.json(e.message)
        }
    } else {
        res.status(401).json({
            errors: 'invalid token'
        })
    }
}

const authorizeUser=(req,res,next)=>{
    console.log(req.user)
    if(req.user.role==='admin'){
        next()
    }
    else{
        res.status(403).json({
            errors:"page doesn\'t exist"
        })
    }
}

module.exports={
    authenticateUser,
    authorizeUser,
    authenticateStore
}
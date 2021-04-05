const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Customer = mongoose.model('Customer');
const {jwtkey} = require('../db_con');


module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).send({error:"You must be Login_1"})
    }
    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, jwtkey, async(err, payload) => {
        if(err){
            return res.status(401).send({error:"You must be Login_2"})
        }

        const {userId} = payload;
        const user = await Customer.findById(userId);
        req.user = user;
        next();
    })
}
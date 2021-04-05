const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const {jwtkey} = require('../db_con');
const router = express.Router();
const createUser = mongoose.model('Customer');

router.post('/signup', async (req,res)=>{
    console.log(req.body);
    const {firstname, middlename, lastname, email, password, contact, hostelName, roomNo} = req.body;
    try {

        const user = new createUser({
            name:{firstname, middlename, lastname}, 
            email, 
            password, 
            contact, 
            address:{hostelName, roomNo}
        });
        await user.save();
        const token = jwt.sign({userId : user._id}, jwtkey);
        res.send({token});

    } catch (err) {

        return res.status(422).send("Error : ",err.message);

    }
    
  })


  router.post('/signin', async (req, res) => {

    const {email, password} = req.body
    if(!email || !password){
        return res.status(422).send({error : "Must provide email or password"})
    }

    const user = await createUser.findOne({email})
    if(!user){
        return res.status(422).send({error : "Must provide email or password"})
    }

    try {
        await user.comparePassword(password);
        const token = jwt.sign({userId : user._id}, jwtkey);
        res.send({token});
    } catch (err) {
        return res.status(422).send({error : "Must provide email or password"})
    }

  })

  module.exports =  router
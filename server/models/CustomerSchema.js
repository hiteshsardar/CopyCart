const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { has } = require('lodash');

const Schema = mongoose.Schema;
const customerSchema = new Schema({
  customerId:Schema.Types.ObjectId,
  name:
  {   firstname:{
        type:String,
        required:true
      },
      middlename:String,
      lastname:{
        type:String,
        required:true
      }
  },
  email:{
    type:String,
    unique: true,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  contact:{
    type:String,
    required:true
  },
  address:{
    hostelName:String,
    roomNo:String
  },
  // userType:{
  //   type:String,
  //   enum:['Buyer','Developer'],
  // },
  placedOrder:[{
    type:Schema.Types.ObjectId,
    ref:'Order'
  }],
  createdAt:{
    type:Date,
    default:Date.now()
  }
});

customerSchema.pre('save', function(next){

  const user = this
  if(!user.isModified('password')){
    return next()
  }

  bcrypt.genSalt(10,(err,salt) =>{
    if(err){
      return next(err);
    }

    bcrypt.hash(user.password, salt, (err, hash) =>{
      if(err){
        return next(err);
      }

      user.password = hash;
      next();

    })

  })

})

customerSchema.methods.comparePassword = function (userPassword){

  const user = this;

  return new Promise((resolve, reject) => {

    bcrypt.compare(userPassword, user.password, (err, isMatch) => {

      if(err){
        return reject(err);
      }
      if(!isMatch){
        return reject(err);
      }
      resolve(true)

    })

  })

}
 
module.exports = mongoose.model('Customer',customerSchema);
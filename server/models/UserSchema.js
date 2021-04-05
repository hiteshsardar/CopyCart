const mongoose = require('mongoose');

//creating refrence userSchema to user collection
const Schema = mongoose.Schema;
const userSchema = new Schema({

  user_id:Schema.Types.ObjectId,
  
  email:String,
  password:String,
  name:
  {firstname:String,
    middlename:String,
    lastname:String
  },
  contact:String,
  address:{
    area:String,
    state:String,
    country:String,
    code:Number,
  },
  usertype:{
    type:String,
     enum:['buyer','seller','Developer'],
  },
  createdAt:Date
});

 
module.exports = mongoose.model('Users',userSchema);
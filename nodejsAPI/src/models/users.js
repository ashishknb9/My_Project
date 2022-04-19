const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name : {
        type:String,
        required:true,
    },
    email:{
        type:String,
       required:true,
        unique:[true,"Email already present!"],
        validator(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email");
            }
        }
    },
    phone:{
        type:Number,
       required:true,
        unique:true
    },
    address:{
        type:String,
       required:true
    }
});
// we will  create a new collection
const users = new mongoose.model('users',userSchema);

module.exports = users;
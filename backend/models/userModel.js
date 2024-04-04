const mongoose = require('mongoose')
const validator = require('validator');
const jwt = require('jsonwebtoken')
const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        validate:[validator.isEmail,"Please enter a valid email"]
    },
    avatar:{
        public_id:{
            type:String,
        },
        url:{
            type:String,
        }
    },
    password:{
        type:String
    },
    history:[{
        result:Boolean,
        checked:{type:Date,default:Date.now()}
    }],
    otp:{
        type:Number
    }
})

userSchema.methods.generateToken = function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET)
}

module.exports= mongoose.model('User',userSchema);

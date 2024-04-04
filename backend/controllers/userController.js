const User = require("../models/userModel")
const {sendEmail} = require("../utils/sendEmail")
const cloudinary = require("cloudinary") ;
const fs =require("fs") ;
const axios = require('axios')
const path = require('path')
const FormData = require('form-data');

exports.getOtp = async(req,res)=>{
    try {
        console.log(1)
        const {name,email} = req.body;
        console.log(2)
        const avatar = req.files.avatar.tempFilePath;
        console.log(3)
        let user = await User.findOne({email});
        console.log(4)
        if(user){
            console.log(5)
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        else{
            console.log(6)
            const otp = Math.floor(Math.random()* 100000 );
            const mycloud = await cloudinary.v2.uploader.upload(avatar,{
                folder:`braintumor/users/${email}`
              });
              console.log(7)
              fs.rmSync("./tmp",{recursive:true});
            const user = await User.create({
                name,email,otp,avatar: {
                    public_id: mycloud.public_id,
                    url: mycloud.secure_url,
                  },
            });
            console.log(8)
            const subject = 'Your OTP for BrainTumor Site'
            const link = `http://127.0.0.1:3000/register/${email}`
            await sendEmail({name,email,subject,otp,link})
            console.log(9)
            const token = await user.generateToken();
            res.status(200).cookie("token",token,{expires:new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)}).json({
                success:true,
                message:"otp sent successfully",
                id:user._id
                
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.register = async(req,res)=>{
    try {
        const {email}=req.query;
        const user = await User.findOne({email});
        const {otp,password} = req.body;
        
        if(otp == user.otp){
            user.password = password;
            user.otp = null;
            await user.save();
            const token = await user.generateToken();

            res.status(200).cookie("token",token,{expires:new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)}).json({
                success:true,
                message:'User created successfully'
            })
        }
        else{
            res.status(400).json({
                success:false,
                message:"Invalid Otp"
            })
        }
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.login = async(req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(!user){
            res.status(400).json({
                success:false,
                message:'Please register first!'
            })
        }
        else{
            if(user.password == password){
                const token = await user.generateToken();

                res.status(200).cookie("token",token,{expires:new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),httpOnly: true}).json({
                    success:true,
                    message:"Logged in",
                    user:user,
                    token:token
                })
            }
            else{
                res.status(400).json({
                    success:false,
                    message:"Invalid Password"
                })
            }
            
        }
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
//get profile
exports.getProfile = async(req,res)=>{
    try {
        
        const user = await User.findOne({_id:req.user._id});
        res.status(200).json({
            success:true,
            user:user
        })
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


exports.deleteProfile = async(req,res)=>{
    try {
        
        const user = await User.findById(req.user._id);
        
        await user.deleteOne();
        res.status(200).clearCookie("token").json({
            success:true,
            message:"User deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.logout = async(req,res)=>{
    try {
        
        res.status(200).clearCookie("token").json({
            success:true,
            message:"User deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.uploadPhoto = async(req,res)=>{
    try {   
        const user = await User.findById(req.user.id);
        const photo = req.files.image
        
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        const formData = new FormData();

        // Append the image file to the FormData object
        formData.append('image', fs.createReadStream(photo.tempFilePath));
        console.log(formData)
        const {data} = await axios.post('http://127.0.0.1:5000/predict',formData,config)

        let result = await (data.prediction===1) ? true : false

        fs.rmSync("./tmp",{recursive:true});
        user.history.push({result})
        await user.save()
       
        res.status(200).json({
            success:true,
            message:"Success",
            result:result
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
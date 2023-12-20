const express = require("express");
const {UserModel} = require("../models/user.model")
const userRouter = express.Router()
const bcrypt = require("bcrypt");  //used for pass hashing / securing
const jwt  = require("jsonwebtoken");

userRouter.post("/register",async(req,res)=>{
    const {username , email, pass } = req.body
    try{
        bcrypt.hash(pass, 5, async(err, hash)=> {
                if(err){
                     res.status(200).send({"error":err})
                }else{
                    const user = new UserModel({username,email,pass:hash})
                    await user.save()
                    res.status(200).send({"msg":"A new user has been registered"})
                }
        });
    }catch(err){
        res.status(400).send({"error":err})
    }
})

userRouter.post("/login",async(req,res)=>{
     const {email,pass} = req.body
     try{
         const user = await UserModel.findOne({email})
         // Load hash from your password DB.
        bcrypt.compare(pass, user.pass, (err, result)=> {
             if(result){
                const token = jwt.sign({userID:user._id,username:user.username},"masai")
                res.status(200).send({"msg":"login success ful", "token":token})
             }else{
                res.status(200).send({"msg":"wrong credentials"})
             }
        });
     }catch(err){
        res.status(400).send({"error":err})
     }
})
module.exports = {
    userRouter
}
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/User');
const SECRET_KEY = "UsWeThem";

// User Signup
const Signup = async (req,res) => {
    const{username,email, password} = req.body;
    try {
        const existingUser = await Users.findOne({email:email});
            if(existingUser){
                return res.status(400).json({message:"Email Already Registered"});
            }
            const hashedPassword = await bcrypt.hash(password,10);
            const user = new Users({ username,email,password : hashedPassword});
            await user.save();
            res.json({user});
        } catch (error){
            res.status(500).json({error:error.message});
        } 
    };

    // User SignIn

    const SingIn = async (req,res) => {

        const {email,password} = req.body;

        try {
            const user = await Users.findOne({email});
            if(!user){
                return res.status(401).json({error : 'Invalid Credentials...'});
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if(!isPasswordValid){
                return res.status(401).json({error : 'Invalid Credentials...'})
            }

            const token = jwt.sign({email : user.email ,userId : user._id},SECRET_KEY);
            res.status(200).json({user:user,token:token});
        }
        catch(error){
            console.log(error);
            res.status(500).json({message:"something went wrong"});
        }
    }
    module.exports = {Signup, SingIn};

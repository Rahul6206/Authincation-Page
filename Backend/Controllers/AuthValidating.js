const UserModel = require('../Models/Schema');
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')

const SingUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "Email is Already Registered", success: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'SignUp Successfully', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error, success: false });
    }
};
const SingIn = async (req, res) => {
    try {
        const {  email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "Cannot find User Please SingUP first", success: false });
        }
        const IsCorrectPass= await bcrypt.compare(password,user.password)
        if(!IsCorrectPass){
            res.status(403).json({message: "Incorrect Password",sucess: false})
        }

        const jwtToken=jwt.sign(
            {email: user.email , _id: user._id},process.env.JWT_SECRET,{expiresIn: '6h'}
        );
        res.status(200).json({ message: 'SingIN Success', success: true,jwtToken,name: user.name,email });
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error', error, success: false });
    }
};

module.exports = {
    SingUp,
    SingIn
};
const { SingUp, SingIn } = require('../Controllers/AuthValidating');
const { SingUPValidation, SingINValidation } = require('../Middlewares/SingIN_SingUP_Validation');

const Router=require('express').Router();

Router.post('/login',SingINValidation,SingIn);

Router.post('/Singup',SingUPValidation,SingUp)

module.exports=Router;
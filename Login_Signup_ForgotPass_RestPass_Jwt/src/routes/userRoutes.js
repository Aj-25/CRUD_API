var router = require('express').Router();
const validator = require("../utils/validator")
const userCntrl = require("../controller/userController")



router.get('/',function(req,res,next){
  res.send("Ok check");
});

router.post("/api/register", function (req, res, next) {
  validator.validateUserRegistration(req, res, next);
}, function (req, res, next) {
  userCntrl.createUser(req, res);
});


router.post('/api/login', (req, res, next) => {
  validator.validateUserLogin(req, res, next);
}, function (req, res, next) {
  userCntrl.login(req.body, res);
});


router.post('/api/forgotPassword', (req, res, next) => {
  validator.forgotPasswordEmailValidation(req, res, next);
}, function (req, res, next) {
  userCntrl.validateEmailIdandSendOtp(req.body, res);
});


router.put('/api/varifyOtpAndUpdatePassword',(req,res,next)=>{
  validator.varifyOtpAndUpdatePassword(req,res,next);
},function(req,res,next){
  userCntrl.varifyOtpAndUpdatePassword(req,res);
});


module.exports = router;







var router = require('express').Router();
const userCntrl = require('../controller/userCtrl')
const validator = require("../utils/validator")


router.post("/api/register", function (req, res, next) {
   validator.validateUserRegistration(req, res, next);
 }, function (req, res, next) {
    userCntrl.createUser(req, res);
 });

router.get('/api/viewUserProfile', (req, res, next) => {
    validator.viewListbyId(req, res, next);
}, function (req, res) {
    userCntrl.viewUserProfile(req, res);
});

router.post('/api/login',(req,res,next)=>{
    validator.validateUserLogin(req,res,next);
},function(req,res,next){
    userCntrl.login(req.body,res);
});

router.put('/api/updateUserProfile',(req,res,next)=>{
    validator.updateUserProfile(req,res,next);
},function(req,res,next){
    userCntrl.updateUserProfile(req,res);
});


module.exports = router
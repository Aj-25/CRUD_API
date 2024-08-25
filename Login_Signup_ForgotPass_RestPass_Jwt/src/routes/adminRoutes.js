var router = require('express').Router();
const validator = require("../utils/validator")
const adminCntrl = require("../controller/adminController")
router.get('/',function(req,resp,next){
    resp.send("Ok check");
});


router.get('/api/getUserDetails',(req,res,next)=>{
    validator.getUserDetails(req,res,next);
},function(req,res,next){
    adminCntrl.getUserdetails(req.query,res);
});


router.put('/api/updateUserProfile',(req,res,next)=>{
    validator.updateUserProfile(req,res,next);
},function(req,res,next){
    adminCntrl.updateUserProfile(req,res);
});


router.put('/api/deleteUser',(req,res,next)=>{
    validator.deleteUserbyid(req,res,next);
},function(req,res,next){
    adminCntrl.deleteUserbyId(req,res);
});




module.exports = router;



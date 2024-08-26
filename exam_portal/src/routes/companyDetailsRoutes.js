var router = require('express').Router();

const companyDetailCntrl = require('../controller/companyDetailsCtrl')
const validator = require("../utils/validator")


router.post('/api/addcompanyDetails', (req, res, next) => {
    console.log("Come to route");
    validator.validateaddcompanyDetails(req, res, next);
}, function (req, res) {
    companyDetailCntrl.addCompanyDetails(req.body, res);
})


router.get('/api/getcompanyList', (req, res, next) => {
    console.log("Come to route");
    validator.viewList(req, res, next);
}, function (req, res) {
    companyDetailCntrl.viewCompanyList(req, res);
})

router.get('/api/getcompanyDetails/:id', (req, res, next) => {
    console.log("Come to route");
    validator.viewListbyId(req, res, next);
}, function (req, res) {
    companyDetailCntrl.viewcompanyDetailsbyId(req, res);
})


router.put('/api/editcompanyDetails/:id', (req, res, next) => {
    console.log("Come to route");
    validator.validateeditcompanyDetails(req, res, next);
}, function (req, res) {
    companyDetailCntrl.editCompanyDetails(req, res);
})



router.put('/api/deleteCompanyDetails/:id', function(req, res, next) {
    validator.deletedetailsbyId(req, res, next);
}, function(req, res, next) {
    companyDetailCntrl.deleteCompanyDetailsById(req, res);
});




module.exports = router
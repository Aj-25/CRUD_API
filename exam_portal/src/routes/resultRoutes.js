var router = require('express').Router();

const resultCntrl = require('../controller/resultCtrl')
const validator = require("../utils/validator")


router.post('/api/addresultdetails', (req, res, next) => {
    console.log("Come to route");
    validator.validateaddresult(req, res, next);
}, function (req, res) {
    resultCntrl.addresultdetails(req.body, res);
})
router.get('/api/getresultList', (req, res, next) => {
    console.log("Come to route");
    validator.viewList(req, res, next);
}, function (req, res) {
    resultCntrl.viewresultList(req, res);
})

router.get('/api/getresultdetails/:id', (req, res, next) => {
    console.log("Come to route");
    validator.viewListbyId(req, res, next);
}, function (req, res) {
    resultCntrl.viewResultbyId(req, res);
})

router.put('/api/editresultbyId/:id', (req, res, next) => {
    console.log("Come to route");
    validator.validateeditresultbyID(req, res, next);
}, function (req, res) {
    resultCntrl.editresultbyID(req, res);
})

router.put('/api/deleteresultdetails/:id', function(req, res, next) {
    validator.deletedetailsbyId(req, res, next);
}, function(req, res, next) {
    resultCntrl.deleteresultdetailsById(req, res);
});


module.exports = router
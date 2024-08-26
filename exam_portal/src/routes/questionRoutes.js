var router = require('express').Router();
const validator = require("../utils/validator")
const questionCntrl = require('../controller/questionCtrl')


router.post('/api/addquestionsdetails', (req, res, next) => {
    console.log("Come to route");
    validator.validateaddquestion(req, res, next);
}, function (req, res) {
    questionCntrl.addQuestions(req.body, res);
})

router.get('/api/getquestionsList', (req, res, next) => {
    console.log("Come to route");
    validator.viewList(req, res, next);
}, function (req, res) {
    questionCntrl.viewquestionsList(req, res);
})

router.get('/api/getquestionsDetailsbyID/:id', (req, res, next) => {
    console.log("Come to route");
    validator.viewListbyId(req, res, next);
}, function (req, res) {
    questionCntrl.viewquestiondetailsbyId(req, res);
})

router.put('/api/editquestionbyId/:id', (req, res, next) => {
    console.log("Come to route");
    validator.validateeditquestionbyID(req, res, next);
}, function (req, res) {
    questionCntrl.editquestionbyID(req, res);
})

router.put('/api/deleteqestiondetails/:id', function(req, res, next) {
    validator.deletedetailsbyId(req, res, next);
}, function(req, res, next) {
    questionCntrl.deletequestiondetailsById(req, res);
});


module.exports = router


var router = require('express').Router();

const answerCntrl = require('../controller/answerCtrl')
const validator = require("../utils/validator")



router.post('/api/addanswerDetails', (req, res, next) => {
    console.log("Come to route");
    validator.validateAddAnswer(req, res, next);
}, function (req, res) {
    answerCntrl.addAnswer(req, res);
})

router.get('/api/getanswerlist', (req, res, next) => {
    console.log("Come to route");
    validator.viewList(req, res, next);
}, function (req, res) {
    answerCntrl.viewAnswerList(req, res);
})

router.get('/api/getanswerDetailsbyID/:id', (req, res, next) => {
    console.log("Come to route");
    validator.viewListbyId(req, res, next);
}, function (req, res) {
    answerCntrl.viewanswerDetailsbyId(req, res);
})

router.put('/api/editanswerdetailsbyId/:id', (req, res, next) => {
    console.log("Come to route");
    validator.EditAnswerDetailsbyID(req, res, next);
}, function (req, res) {
    answerCntrl.editAnswerDetailsbyID(req, res);
})

router.put('/api/deleteanswerdetails/:id', function(req, res, next) {
    validator.deletedetailsbyId(req, res, next);
}, function(req, res, next) {
    answerCntrl.deleteAnswerdetailsById(req, res);
});




module.exports = router
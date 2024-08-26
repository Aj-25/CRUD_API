var router = require('express').Router();
const validator = require("../utils/validator")
const optionCntrl = require('../controller/optionCtrl')



router.post('/api/addoptiondetails', (req, res, next) => {
    console.log("Come to route");
    validator.validateaddoptionDetails(req, res, next);
}, function (req, res) {
    optionCntrl.addOption(req.body, res);
})

router.get('/api/getoptionList', (req, res, next) => {
    console.log("Come to route");
    validator.viewList(req, res, next);
}, function (req, res) {
    optionCntrl.viewoptionList(req, res);
})
router.get('/api/getoptionDetailsbyID/:id', (req, res, next) => {
    console.log("Come to route");
    validator.viewListbyId(req, res, next);
}, function (req, res) {
    optionCntrl.viewoptionDetailsbyId(req, res);
})

router.put('/api/editoptionDetailsbyID/:id', (req, res, next) => {
    console.log("Come to route");
    validator.validateeditoptionDetails(req, res, next);
}, function (req, res) {
    optionCntrl.editOptionDetails(req, res);
})

router.put('/api/deleteoptionDetailsbyID/:id', function(req, res, next) {
    validator.deletedetailsbyId(req, res, next);
}, function(req, res, next) {
    optionCntrl.deleteOptionDetailsById(req, res);
});

module.exports = router
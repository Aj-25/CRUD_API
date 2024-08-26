var router = require('express').Router();

const timeSlotCntrl = require('../controller/timeSlotCtrl')
const validator = require("../utils/validator")



router.post('/api/addtimeSlotDetails', (req, res, next) => {
    console.log("Come to route");
    validator.validateaddtimeSlot(req, res, next);
}, function (req, res) {
    timeSlotCntrl.addtimeSlot(req.body, res);
})


router.get('/api/getTimeSlotList', (req, res, next) => {
    console.log("Come to route");
    validator.viewList(req, res, next);
}, function (req, res) {
    timeSlotCntrl.viewtimeSlotList(req, res);
})

router.get('/api/gettimeSlotDetails/:id', (req, res, next) => {
    console.log("Come to route");
    validator.viewListbyId(req, res, next);
}, function (req, res) {
    timeSlotCntrl.viewtimeSlotbyId(req, res);
})


router.put('/api/edittimeSlotbyId/:id', (req, res, next) => {
    console.log("Come to route");
    validator.validateeditTimeSlotbyID(req, res, next);
}, function (req, res) {
    timeSlotCntrl.editTimeSlotbyID(req, res);
})



router.put('/api/deletetimeslotdetails/:id', function(req, res, next) {
    validator.deletedetailsbyId(req, res, next);
}, function(req, res, next) {
    timeSlotCntrl.deletetimeslotdetailsById(req, res);
});


module.exports = router
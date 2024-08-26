let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = require('chai').expect;
chai.should();

const responseMessages = require('../src/utils/response_message');

const Timeslotctrl = require("../src/controller/timeSlotCtrl");


const adminAccesToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJ1c2VyX3JvbGUiOjAsImVtYWlsX2lkIjoiUGlrYUBnbWFpbC5jb20iLCJzdHJpbmciOiJXZWQgRGVjIDI4IDIwMjIgMTI6MTA6MzAgR01UKzA1MzAgKEluZGlhIFN0YW5kYXJkIFRpbWUpNyIsImlhdCI6MTY3MjIwOTYzMCwiZXhwIjoxNjcyODE0NDMwfQ.9Ah60_yGGpcL-w4i01EJBJfFnBbBzJ_53xurFsuud4A"

const wrongAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMywidXNlcl9yb2xlIjoxLCJlbWFpbF9pZCI6ImFqMTVAZ21haWwuY29tIiwic3RyaW5nIjoiU2F0IERlYyAzMSAyMDIyIDEzOjQxOjQ5IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKTEzIiwiaWF0IjoxNjcyNDc0MzA5LCJleHAiOjE2NzMwNzkxMDl9.vx3YZkYmky8j5wyoHzTOa5MA8BJlxyBSNxnIJw9smN0"



describe('POST /timeslot/api/addtimeSlotDetails', () => {
    let req = {
        body: ''

    }
    it('Add the Time Slot details', (done) => {
        let res;
        req.body = {
            access_token: adminAccesToken,
            company_id: "14",
            date: "21/01/2023",
            time: "03:00PM",


        }


        let response = {
            data: responseMessages.SUCCESS.ADD_TIME_SLOT
        }
        Timeslotctrl.addTimeslot(req.body, res).then(result => {

            expect(result.statusCode).to.equal(response.data.statusCode)
            expect(result.message).to.equal(response.data.customMessage)
            expect(result.data).not.to.equal(null)
            done()
        })
    })

// --------------------------------------------------------------

it('It should Return the error that for Company Id is Already Exist', (done) => {
            let res;
            req.body = {
              access_token: adminAccesToken,
             
            company_id: "Business Analyst",
            date: "Business Analyst",
            time: "Business Analyst",
            }
    
    
            let response = {
                data: responseMessages.Error.COMPANY_EXIST
            }
            Timeslotctrl.addTimeslot(req.body, res).then(result => {
               
                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })

// --------------------------------------------------------------------

it('It should Return the error that for access token is not given', (done) => {
    let res;
    req.body = {

    }
    
    Timeslotctrl.addTimeslot(req, res).then(result => {
        
        expect(result.statusCode).to.equal(400)
        expect(result.message).to.equal('jwt must be provided')
        done()
    })
})

// --------------------------------------------------------------


it('It should Return the error that for Unauthozied Access Token', (done) => {
    let res;
    req.body = {
        access_token: wrongAccessToken,
    }


    let response = {
        data: responseMessages.Error.UNATHORIZE_ACCESS
    }
    Timeslotctrl.addTimeslot(req.body, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})

})


// -----------------------#########--------------------------------


describe('GET /timeslot/api/getTimeSlotList', () => {
    let req = {
        query: ''
    }
    it('view the time slot list', (done) => {
        let res;
        req.query = {
            access_token: adminAccesToken,
        }


        let response = {
            data: responseMessages.SUCCESS.GET_TIME_SLOT_LIST
        }
        Timeslotctrl.viewtimeSlotList(req, res).then(result => {
            expect(result.statusCode).to.equal(response.data.statusCode)
            expect(result.message).to.equal(response.data.customMessage)
            expect(result.data).not.to.equal(null)
            done()
        })
    })
// --------------------------------------------------------------------

it('It should Return the error that for access token is not given', (done) => {
    let res;
    req.query = {

    }
    
    Timeslotctrl.viewtimeSlotList(req, res).then(result => {
        
        expect(result.statusCode).to.equal(400)
        expect(result.message).to.equal('jwt must be provided')
        done()
    })
})

// --------------------------------------------------------------


it('It should Return the error that for Unauthozied Access Token', (done) => {
    let res;
    req.query = {
        access_token: wrongAccessToken,
    }


    let response = {
        data: responseMessages.Error.UNATHORIZE_ACCESS
    }
    Timeslotctrl.viewtimeSlotList(req, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})
})

// -----------------------#########--------------------------------


describe('GET /timeslot/api/gettimeSlotDetails/{id}', function () {
    let req = {
        body: ''
    }
    it('It should return the time slot details by Id',
        function (done) {
            let res;
            req.query = {

                access_token: adminAccesToken,

            }
            req.params = {
                id:5,
            }
            let response = {
                data: responseMessages.SUCCESS.GET_TIME_SLOT_LIST_BY_ID
            }
            Timeslotctrl.viewtimeSlotbyId(req, res).then(result => {
               expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })

// --------------------------------------------------------------

it('It should Return the error that for timeslot id is not Exist', (done) => {
            let res;
            req.query = {
                access_token: adminAccesToken,
                
            }
            req.params = {
                     id:80
            }
    
    
            let response = {
                data: responseMessages.Error.ID_NOT_EXIST
            }
            Timeslotctrl.viewtimeSlotbyId(req, res).then(result => {
                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                done()
            })
        })

// --------------------------------------------------------------------

it('It should Return the error that for access token is not given', (done) => {
    let res;
    req.query = {

    }
    
    Timeslotctrl.viewtimeSlotbyId(req, res).then(result => {
        
        expect(result.statusCode).to.equal(400)
        expect(result.message).to.equal('jwt must be provided')
        done()
    })
})

// --------------------------------------------------------------


it('It should Return the error that for Unauthozied Access Token', (done) => {
    let res;
    req.query = {
        access_token: wrongAccessToken,
    }


    let response = {
        data: responseMessages.Error.UNATHORIZE_ACCESS
    }
    Timeslotctrl.viewtimeSlotbyId(req, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})
})

// -----------------------#########--------------------------------


describe('PUT /timeslot/api/edittimeSlotbyId/{id}', function () {
    let req = {
        body: ''
    }
    it('It should  edit time slot details by Id',
        function (done) {
            let res;

            req.params = {
                id: 12,
            }
            req.body = {
                access_token: adminAccesToken,
                company_id: "Business Analyst",
                date: "Business Analyst",
                time: "Business Analyst",
            }

            let response = {
                data: responseMessages.SUCCESS.EDITED_TIME_SLOT_Details
            }
            Timeslotctrl.editTimeSlotbyID(req, res).then(result => {

                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })

// --------------------------------------------------------------

it('It should Return the error that for time slot id is not Exist', (done) => {
            let res;
          
            req.params = {
                     id:25
            }
            req.body = {
                access_token: adminAccesToken,
                
            }
    
    
            let response = {
                data: responseMessages.Error.ID_NOT_EXIST
            }
            Timeslotctrl.editTimeSlotbyID(req, res).then(result => {
                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                
                done()
            })
        })
    


// --------------------------------------------------------------------

it('It should Return the error that for access token is not given', (done) => {
    let res;
    req.body = {

    }
    
    Timeslotctrl.editTimeSlotbyID(req, res).then(result => {
        
        expect(result.statusCode).to.equal(400)
        expect(result.message).to.equal('jwt must be provided')
        done()
    })
})

// --------------------------------------------------------------


it('It should Return the error that for Unauthozied Access Token', (done) => {
    let res;
    req.body = {
        access_token: wrongAccessToken,
    }


    let response = {
        data: responseMessages.Error.UNATHORIZE_ACCESS
    }
    Timeslotctrl.editTimeSlotbyID(req, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})
})


// -----------------------#########--------------------------------


describe('PUT /timeslot/api/deletetimeslotdetails/{id}', function () {
    let req = {
        body: ''
    }
    it('It should delete time slot details by Id',
        function (done) {
            let res;
            req.query = {
                access_token: adminAccesToken,
            }
            req.params = {
                id: 6,
            }


            let response = {
                data: responseMessages.SUCCESS.TIME_SLOT_DELETED
            }
            Timeslotctrl.deletetimeslotdetailsById(req, res).then(result => {

                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })

//--------------------------------------------------------------------

it('It should Return the error that for access token is not given', (done) => {
    let res;
   req.query = {
               
            }
           
    
    Timeslotctrl.deletetimeslotdetailsById(req, res).then(result => {
        
        expect(result.statusCode).to.equal(400)
        expect(result.message).to.equal('jwt must be provided')
        done()
    })
})


// --------------------------------------------------------------------

it('It should Return the error that for time Slot id is not Exist', (done) => {
                let res;
              
                req.params = {
                         id:80
                }
                req.query = {
                    access_token: adminAccesToken,
                    
                }
        
        
                let response = {
                    data: responseMessages.Error.ID_NOT_EXIST
                }
                Timeslotctrl.deletetimeslotdetailsById(req, res).then(result => {
                    expect(result.statusCode).to.equal(response.data.statusCode)
                    expect(result.message).to.equal(response.data.customMessage)
                    
                    done()
                })
            })
        

// --------------------------------------------------------------


it('It should Return the error that for Unauthozied Access Token', (done) => {
    let res;
    req.query = {
        access_token: wrongAccessToken,
    }


    let response = {
        data: responseMessages.Error.UNATHORIZE_ACCESS
    }
    Timeslotctrl.deletetimeslotdetailsById(req, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})
})
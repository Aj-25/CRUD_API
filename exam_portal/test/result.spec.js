let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = require('chai').expect;
chai.should();

const express = require('express');
const { result } = require('underscore');

const responseMessages = require('../src/utils/response_message');

const Resultctrl = require("../src/controller/resultCtrl");


const adminAccesToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJ1c2VyX3JvbGUiOjAsImVtYWlsX2lkIjoiUGlrYUBnbWFpbC5jb20iLCJzdHJpbmciOiJXZWQgRGVjIDI4IDIwMjIgMTI6MTA6MzAgR01UKzA1MzAgKEluZGlhIFN0YW5kYXJkIFRpbWUpNyIsImlhdCI6MTY3MjIwOTYzMCwiZXhwIjoxNjcyODE0NDMwfQ.9Ah60_yGGpcL-w4i01EJBJfFnBbBzJ_53xurFsuud4A"

const wrongAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMywidXNlcl9yb2xlIjoxLCJlbWFpbF9pZCI6ImFqMTVAZ21haWwuY29tIiwic3RyaW5nIjoiU2F0IERlYyAzMSAyMDIyIDEzOjQxOjQ5IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKTEzIiwiaWF0IjoxNjcyNDc0MzA5LCJleHAiOjE2NzMwNzkxMDl9.vx3YZkYmky8j5wyoHzTOa5MA8BJlxyBSNxnIJw9smN0"


describe('POST /result/api/addresultdetails', () => {
    let req = {
        body: ''

    }
    it('Add the Result details', (done) => {
        let res;
        req.body = {
            access_token: adminAccesToken,
            user_name: "bhupmaharaj",
            exam_name: " fdjhjsad",
            total_question: "5sdjkh0 ",
            question_attempted: "44",
            correct_attempts: "38",
            total_marks: "200",
            passing_marks: "68",
            marks_obtained: "152",
            declarations: "cleared",

        }


        let response = {
            data: responseMessages.SUCCESS.ADD_RESULT_DETAILS
        }
        Resultctrl.addresultdetails(req.body, res).then(result => {

            expect(result.statusCode).to.equal(response.data.statusCode)
            expect(result.message).to.equal(response.data.customMessage)
            expect(result.data).not.to.equal(null)
            done()
        })
    })

// --------------------------------------------------------------

it('It should Return the error that for User name and Exam name is Already Exist', (done) => {
            let res;
            req.body = {
              access_token: adminAccesToken,
             
            user_name: "Financial Analyst",
            exam_name: "Financial Analyst",
            total_question: "Business Analyst",
            question_attempted: "Business Analyst",
            correct_attempts: "Business Analyst",
            total_marks: "Business Analyst",
            passing_marks: "Business Analyst",
            marks_obtained: "Business Analyst",
            declarations: "Business Analyst",
            }
    
    
            let response = {
                data: responseMessages.Error.USER_AND_EXAM_EXIST
            }
            Resultctrl.addresultdetails(req.body, res).then(result => {
               
                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })

//--------------------------------------------------------------------

it('It should Return the error that for access token is not given', (done) => {
    let res;
    req.body = {

    }
    
    Resultctrl.addresultdetails(req, res).then(result => {
        
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
    Resultctrl.addresultdetails(req.body, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})

})

//-----------------------#########--------------------------------


describe('GET /result/api/getresultList', () => {
    let req = {
        query: ''
    }
    it('view the Result list', (done) => {
        let res;
        req.query = {
            access_token: adminAccesToken,
        }


        let response = {
            data: responseMessages.SUCCESS.GET_RESULT_LIST
        }
        Resultctrl.viewresultList(req, res).then(result => {
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
    
    Resultctrl.viewresultList(req, res).then(result => {
        
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
    Resultctrl.viewresultList(req, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})

})

//-----------------------#########--------------------------------



describe('GET /result/api/getresultdetails/{id}', function () {
    let req = {
        body: ''
    }
    it('It should return the result details by Id',
        function (done) {
            let res;
            req.query = {

                access_token: adminAccesToken,

            }
            req.params = {
                id:4
            }
            let response = {
                data: responseMessages.SUCCESS.GET_RESULT_DETAILS_BY_ID
            }
            Resultctrl.viewResultbyId(req, res).then(result => {
               
                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })

// --------------------------------------------------------------

it('It should Return the error that for result id is not Exist', (done) => {
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
            Resultctrl.viewResultbyId(req, res).then(result => {
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
    
    Resultctrl.viewResultbyId(req, res).then(result => {
        
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
    Resultctrl.viewResultbyId(req, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})
})


//-----------------------#########--------------------------------


describe('GET /result/api/editresultbyId/{id}', function () {
    let req = {
        body: ''
    }
    it('It should  edit result details by Id sucessfully',
        function (done) {
            let res;

            req.params = {
                id: 5,
            }
            req.body = {
                access_token: adminAccesToken,
                user_name: "Financial Analyst",
                exam_name: "Financial Analyst",
                total_question: "Business Analyst",
                question_attempted: "Business Analyst",
                correct_attempts: "Business Analyst",
                total_marks: "Business Analyst",
                passing_marks: "Business Analyst",
                marks_obtained: "Business Analyst",
                declarations: "Business Analyst",
            }

            let response = {
                data: responseMessages.SUCCESS.EDITED_RESULT_DETAILS
            }
            Resultctrl.editresultbyID(req, res).then(result => {

                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })

// --------------------------------------------------------------

it('It should Return the error that for result id is not Exist', (done) => {
            let res;
          
            req.params = {
                     id:80
            }
            req.body = {
                access_token: adminAccesToken,
                
            }
    
    
            let response = {
                data: responseMessages.Error.ID_NOT_EXIST
            }
            Resultctrl.editresultbyID(req, res).then(result => {
                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })
    


//--------------------------------------------------------------------

it('It should Return the error that for access token is not given', (done) => {
    let res;
    req.body = {

    }
    
    Resultctrl.editresultbyID(req, res).then(result => {
        
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
    Resultctrl.editresultbyID(req, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})
})


//-----------------------#########--------------------------------




describe('GET /result/api/deleteresultdetails/{id}', function () {
    let req = {
        body: ''
    }
    it('It should delete result details by Id',
        function (done) {
            let res;
            req.query = {
                access_token: adminAccesToken,
            }
            req.params = {
                id: 2,
            }


            let response = {
                data: responseMessages.SUCCESS.RESULT_DETAILS_DELETED
            }
            Resultctrl.deleteresultdetailsById(req, res).then(result => {

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
           
    
    Resultctrl.deleteresultdetailsById(req, res).then(result => {
        
        expect(result.statusCode).to.equal(400)
        expect(result.message).to.equal('jwt must be provided')
        done()
    })
})

//--------------------------------------------------------------------

it('It should Return the error that for result id is not Exist', (done) => {
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
            Resultctrl.deleteresultdetailsById(req, res).then(result => {
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
    Resultctrl.deleteresultdetailsById(req, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})
})
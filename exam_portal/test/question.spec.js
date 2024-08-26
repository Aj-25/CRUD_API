let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = require('chai').expect;
chai.should();

const express = require('express');
const { result } = require('underscore');

const responseMessages = require('../src/utils/response_message');

const Questionctrl = require("../src/controller/questionCtrl");


const adminAccesToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJ1c2VyX3JvbGUiOjAsImVtYWlsX2lkIjoiUGlrYUBnbWFpbC5jb20iLCJzdHJpbmciOiJXZWQgRGVjIDI4IDIwMjIgMTI6MTA6MzAgR01UKzA1MzAgKEluZGlhIFN0YW5kYXJkIFRpbWUpNyIsImlhdCI6MTY3MjIwOTYzMCwiZXhwIjoxNjcyODE0NDMwfQ.9Ah60_yGGpcL-w4i01EJBJfFnBbBzJ_53xurFsuud4A"

const wrongAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMywidXNlcl9yb2xlIjoxLCJlbWFpbF9pZCI6ImFqMTVAZ21haWwuY29tIiwic3RyaW5nIjoiU2F0IERlYyAzMSAyMDIyIDEzOjQxOjQ5IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKTEzIiwiaWF0IjoxNjcyNDc0MzA5LCJleHAiOjE2NzMwNzkxMDl9.vx3YZkYmky8j5wyoHzTOa5MA8BJlxyBSNxnIJw9smN0"


describe('POST /questions/api/addquestionsdetails', () => {
    let req = {
        body: ''
        
    }
    it('Add the Question details', (done) => {
        let res;
        req.body = {
            access_token: adminAccesToken,
            question:"What is Tuple?",
        
        }


        let response = {
            data: responseMessages.SUCCESS.ADD_QUESTIONS
        }
        Questionctrl.addQuestions(req.body, res).then(result => {
           
            expect(result.statusCode).to.equal(response.data.statusCode)
            expect(result.message).to.equal(response.data.customMessage)
            expect(result.data).not.to.equal(null)
            done()
        })
    })

// --------------------------------------------------------------

it('It should Return the error that for Question is Already Exist', (done) => {
            let res;
            req.body = {
              access_token: adminAccesToken,
             question:"What is List?",
            }
    
    
            let response = {
                data: responseMessages.Error.QUESTION_EXIST
            }
            Questionctrl.addQuestions(req.body, res).then(result => {
               
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
    
    Questionctrl.addQuestions(req, res).then(result => {
        
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
    Questionctrl.addQuestions(req.body, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})
})


//-----------------------#########--------------------------------


describe('GET /questions/api/getquestionsList', () => {
    let req = {
        query: ''
    }
    it('view the company list', (done) => {
        let res;
        req.query = {
            access_token: adminAccesToken,
        }


        let response = {
            data: responseMessages.SUCCESS.GET_QUESTIONS_LIST
        }
        Questionctrl.viewquestionsList(req, res).then(result => {
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
    
    Questionctrl.viewquestionsList(req, res).then(result => {
        
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
    Questionctrl.viewquestionsList(req, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})
})

//-----------------------#########--------------------------------


describe('GET /questions/api/getquestionsDetailsbyID/{id}', function () {
    let req = {
        body: ''
    }
    it('It should return the questions details by Id',
        function (done) {
            let res;
            req.query = {
                
                access_token: adminAccesToken,

            }
            req.params = {
                id:4
            }
            let response = {
                data: responseMessages.SUCCESS.GET_QUESTIONS_DETAILS_LIST_BY_ID
            }
            Questionctrl.viewquestiondetailsbyId(req, res).then(result => {
              
                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })

// --------------------------------------------------------------

it('It should Return the error that for quesion id is not Exist', (done) => {
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
            Questionctrl.viewquestiondetailsbyId(req, res).then(result => {
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
    
    Questionctrl.viewquestiondetailsbyId(req, res).then(result => {
        
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
    Questionctrl.viewquestiondetailsbyId(req, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})

})

//-----------------------#########--------------------------------

describe('GET /questions/api/editquestionbyId/{id}', function () {
    let req = {
        body: ''
    }
    it('It should  edit questions details by Id',
        function (done) {
            let res;

            req.params = {
                id: 6
            }
            req.body = {
                access_token: adminAccesToken,
                question:"What is color define for danger?",
            }

            let response = {
                data: responseMessages.SUCCESS.EDITED_QUESTIONS_DETAILS
            }
            Questionctrl.editquestionbyID(req, res).then(result => {

                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })

// --------------------------------------------------------------

it('It should Return the error that for question id is not Exist', (done) => {
            let res;
          
            req.params = {
                     id:80
            }
            req.body = {
                access_token: adminAccesToken,
                question:"What is square of 2?"
            }
    
    
            let response = {
                data: responseMessages.Error.ID_NOT_EXIST
            }
            Questionctrl.editquestionbyID(req, res).then(result => {
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
    
    Questionctrl.editquestionbyID(req, res).then(result => {
        
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
    Questionctrl.editquestionbyID(req, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})
})

//-----------------------#########--------------------------------


describe('GET /questions/api/deleteqestiondetails/{id}', function () {
    let req = {
        body: ''
    }
    it('It should delete questions details by Id',
        function (done) {
            let res;
            req.query = {
                access_token: adminAccesToken,
            }
            req.params = {
                id: 1,
            }


            let response = {
                data: responseMessages.SUCCESS.DELETED_QUESTION
            }
            Questionctrl.deletequestiondetailsById(req, res).then(result => {

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
    
    Questionctrl.deletequestiondetailsById(req, res).then(result => {
        
        expect(result.statusCode).to.equal(400)
        expect(result.message).to.equal('jwt must be provided')
        done()
    })


})

//--------------------------------------------------------------------

it('It should Return the error that for question id is not Exist', (done) => {
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
    Questionctrl.deletequestiondetailsById(req, res).then(result => {
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
    Questionctrl.deletequestiondetailsById(req, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})
})
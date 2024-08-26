let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = require('chai').expect;
chai.should();

const express = require('express');
const { result } = require('underscore');

const responseMessages = require('../src/utils/response_message');

const answerctrl = require("../src/controller/answerCtrl");


const adminAccesToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJ1c2VyX3JvbGUiOjAsImVtYWlsX2lkIjoiUGlrYUBnbWFpbC5jb20iLCJzdHJpbmciOiJXZWQgRGVjIDI4IDIwMjIgMTI6MTA6MzAgR01UKzA1MzAgKEluZGlhIFN0YW5kYXJkIFRpbWUpNyIsImlhdCI6MTY3MjIwOTYzMCwiZXhwIjoxNjcyODE0NDMwfQ.9Ah60_yGGpcL-w4i01EJBJfFnBbBzJ_53xurFsuud4A"

const wrongAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMywidXNlcl9yb2xlIjoxLCJlbWFpbF9pZCI6ImFqMTVAZ21haWwuY29tIiwic3RyaW5nIjoiU2F0IERlYyAzMSAyMDIyIDEzOjQxOjQ5IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKTEzIiwiaWF0IjoxNjcyNDc0MzA5LCJleHAiOjE2NzMwNzkxMDl9.vx3YZkYmky8j5wyoHzTOa5MA8BJlxyBSNxnIJw9smN0"


describe('POST /answer/api/addanswerDetails', () => {
    let req = {
        body: ''

    }
    it('It should return Success for Add the answer details', (done) => {
        let res;
        req.body = {
            access_token: adminAccesToken,
            question_id:15,
            answer:1515,
        }


        let response = {
            data: responseMessages.SUCCESS.ADD_ANSWER
        }
        answerctrl.addAnswer(req, res).then(result => {
            expect(result.statusCode).to.equal(response.data.statusCode)
            expect(result.message).to.equal(response.data.customMessage)
            expect(result.data).not.to.equal(null)
            done()
        })
    })

// --------------------------------------------------------------

it('It should Return the error that for answer id is Already Exist', (done) => {
            let res;
            req.body = {
                access_token: adminAccesToken,
                question_id:9,
                answer:90,
            }
    
    
            let response = {
                data: responseMessages.Error.QUESTION_ID_EXIST
            }
            answerctrl.addAnswer(req, res).then(result => {
                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })


// --------------------------------------------------------------

it('It should Return the error that for Unauthozied Access Token', (done) => {
            let res;
            req.body = {
                access_token: wrongAccessToken,
                question_id:25,
                answer:858,
            }
    
    
            let response = {
                data: responseMessages.Error.UNATHORIZE_ACCESS
            }
            answerctrl.addAnswer(req, res).then(result => {
                
                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })

// --------------------------------------------------------------

        it('It should Return the error that for access token is not given', (done) => {
            let res;
            req.body = {
               
               
            }
            
            answerctrl.addAnswer(req, res).then(result => {
                expect(result.statusCode).to.equal(400)
                expect(result.message).to.equal('jwt must be provided')
            
                done()
            })
        })

})

//-----------------------#########--------------------------------

describe('GET /answer/api/getanswerlist', () => {
    let req = {
        query: ''
    }
    it('view the answer list', (done) => {
        let res;
        req.query = {
            access_token: adminAccesToken,
        }


        let response = {
            data: responseMessages.SUCCESS.GET_ANSWER_LIST
        }
        answerctrl.viewAnswerList(req, res).then(result => {
            expect(result.statusCode).to.equal(response.data.statusCode)
            expect(result.message).to.equal(response.data.customMessage)
            expect(result.data).not.to.equal(null)
            done()
        })
    })



// --------------------------------------------------------------

it('It should Return the error that for access token is not given', (done) => {
    let res;
    req.query = {
       
       
    }
    
    answerctrl.viewAnswerList(req, res).then(result => {
       
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
                answerctrl.viewAnswerList(req, res).then(result => {
                    
                    expect(result.statusCode).to.equal(response.data.statusCode)
                    expect(result.message).to.equal(response.data.customMessage)
                    done()
                })
            })
})


//-----------------------#########--------------------------------



describe('GET /answer/api/getanswerDetailsbyID/{id}', function () {
    let req = {
        body: ''
    }
    it('It should return the answer details by Id',
        function (done) {
            let res;
            req.query = {

                access_token: adminAccesToken,

            }
            req.params = {
                id:8
            }
            let response = {
                data: responseMessages.SUCCESS.GET_ANSWER_DETAILS_BY_ID
            }
            answerctrl.viewanswerDetailsbyId(req, res).then(result => {
                
                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })

// --------------------------------------------------------------


    it('It should return the error that answer Id is not exist',
        function (done) {
            let res;
            req.query = {

                access_token: adminAccesToken,

            }
            req.params = {
                id:36
            }
            let response = {
                data: responseMessages.Error.ID_NOT_EXIST
            }
            answerctrl.viewanswerDetailsbyId(req, res).then(result => {
                
                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                done()
            })
        })


// --------------------------------------------------------------


it('It should Return the error that for access token is not given', (done) => {
    let res;
    req.query = {
       
       
    }
    
    answerctrl.viewanswerDetailsbyId(req, res).then(result => {
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
                answerctrl.viewanswerDetailsbyId(req, res).then(result => {
                    
                    expect(result.statusCode).to.equal(response.data.statusCode)
                    expect(result.message).to.equal(response.data.customMessage)
                    
                    done()
                })
            })
})




//-----------------------#########--------------------------------




describe('GET /answer/api/editanswerdetailsbyId/{id}', function () {
    let req = {
        body: ''
    }
    it('It should  edit answer details by Id',
        function (done) {
            let res;
            req.query = {


            }
            req.params = {
                id: 10,
            }
            req.body = {
                access_token: adminAccesToken,
                question_id: 10,
                answer: 1010,
            }

            let response = {
                data: responseMessages.SUCCESS.EDITED_ANSWER_DETAILS
            }
            answerctrl.editAnswerDetailsbyID(req, res).then(result => {

                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
               
                expect(result.data).not.to.equal(null)
                done()
            })
        })

// -----------------------------------------------------------

it('It should Return the error that for Answer id is not Exist', (done) => {
            let res;
            
            req.params = {
                id: 58
            }
            req.body = {
                access_token: adminAccesToken,
                question_id:36,
                answer:858,
            }
    
    
            let response = {
                data: responseMessages.Error.ID_NOT_EXIST
            }
            answerctrl.editAnswerDetailsbyID(req, res).then(result => {
              
                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                done()
            })
        })

// ------------------------------------------------------------

it('It should Return the error that for access token is not given', (done) => {
    let res;
    req.body = {
       
       
    }
    
    answerctrl.editAnswerDetailsbyID(req, res).then(result => {
       
        expect(result.statusCode).to.equal(400)
        expect(result.message).to.equal('jwt must be provided')
        done()
    })
})

// // ------------------------------------------------------------

it('It should Return the error that for Unauthozied Access Token', (done) => {
    let res;
    req.body = {
        access_token: wrongAccessToken,
    }


    let response = {
        data: responseMessages.Error.UNATHORIZE_ACCESS
    }
    answerctrl.editAnswerDetailsbyID(req, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        
        done()
    })
})
})


// ----------------------#########--------------------------------

describe('GET /answer/api/deleteanswerdetails/{id}', function () {
    let req = {
        body: ''
    }
    it('It should delete answer details by Id',
        function (done) {
            let res;
            req.query = {
                access_token: adminAccesToken,

            }
            req.params = {
                id: 5,
             }
           

            let response = {
                data: responseMessages.SUCCESS.ANSWER_DETAILS_DELETED
            }
            answerctrl.deleteAnswerdetailsById(req, res).then(result => {

                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })

// --------------------------------------------------------------


it('It should Return the error that for access token is not given', (done) => {
        let res;
        req.query = {
           
           
        }
        
        answerctrl.deleteAnswerdetailsById(req, res).then(result => {
            
            expect(result.statusCode).to.equal(400)
            expect(result.message).to.equal('jwt must be provided')
            done()
        })
    })

   // ------------------------------------------------------------

it('It should Return the error that for answer id is not Exist', (done) => {
            let res;
            req.query = {
                access_token: adminAccesToken,
            }
            req.params ={
                id:48,
            }
    
    
            let response = {
                data: responseMessages.Error.ID_NOT_EXIST
            }
            answerctrl.deleteAnswerdetailsById(req, res).then(result => {
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
        answerctrl.deleteAnswerdetailsById(req, res).then(result => {
            
            expect(result.statusCode).to.equal(response.data.statusCode)
            expect(result.message).to.equal(response.data.customMessage)
            done()
        })
    })

})
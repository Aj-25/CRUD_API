let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = require('chai').expect;
chai.should();

const express = require('express');
const { result } = require('underscore');

const responseMessages = require('../src/utils/response_message');

const optionctrl = require("../src/controller/optionCtrl");


const adminAccesToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJ1c2VyX3JvbGUiOjAsImVtYWlsX2lkIjoiUGlrYUBnbWFpbC5jb20iLCJzdHJpbmciOiJXZWQgRGVjIDI4IDIwMjIgMTI6MTA6MzAgR01UKzA1MzAgKEluZGlhIFN0YW5kYXJkIFRpbWUpNyIsImlhdCI6MTY3MjIwOTYzMCwiZXhwIjoxNjcyODE0NDMwfQ.9Ah60_yGGpcL-w4i01EJBJfFnBbBzJ_53xurFsuud4A"

const wrongAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMywidXNlcl9yb2xlIjoxLCJlbWFpbF9pZCI6ImFqMTVAZ21haWwuY29tIiwic3RyaW5nIjoiU2F0IERlYyAzMSAyMDIyIDEzOjQxOjQ5IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKTEzIiwiaWF0IjoxNjcyNDc0MzA5LCJleHAiOjE2NzMwNzkxMDl9.vx3YZkYmky8j5wyoHzTOa5MA8BJlxyBSNxnIJw9smN0"


describe('POST /options/api/addoptiondetails', () => {
    let req = {
        body: ''
    }
    it('It should return the Success for Add the Option details', (done) => {
        let res;
        req.body = {
            access_token: adminAccesToken,
            question_id:"10",
            option_1:"Bentale",
            option_2:"Audi",
            option_3:"Jaguar",
            option_4:"BMW",

        }


        let response = {
            data: responseMessages.SUCCESS.ADD_OPTIONS
        }
        optionctrl.addOption(req.body, res).then(result => {

            expect(result.statusCode).to.equal(response.data.statusCode)
            expect(result.message).to.equal(response.data.customMessage)
            expect(result.data).not.to.equal(null)
            done()
        })
    })

// --------------------------------------------------------------

it('It should Return the error that for Options is Already Exist', (done) => {
            let res;
            req.body = {
            access_token: adminAccesToken,
            question_id:"6",
            option_1:"MNC",
            option_2:"TalentHunt",
            option_3:"Online",
            option_4:"Business Analyst",
            }
    
    
            let response = {
                data: responseMessages.Error.OPTION_ALREADY_EXIST
            }
            optionctrl.addOption(req.body, res).then(result => {
               
                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                done()
            })
        })
    
//--------------------------------------------------------------------

it('It should Return the error that for access token is not given', (done) => {
    let res;
    req.body = {

    }
    
    optionctrl.addOption(req, res).then(result => {
        
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
        optionctrl.addOption(req.body, res).then(result => {
            
            expect(result.statusCode).to.equal(response.data.statusCode)
            expect(result.message).to.equal(response.data.customMessage)
            done()
        })
    })
})

//-----------------------#########--------------------------------


describe('GET /options/api/getoptionList', () => {
    let req = {
        query: ''
    }
    it('It return option list successfully', (done) => {
        let res;
        req.query = {
            access_token: adminAccesToken,
        }


        let response = {
            data: responseMessages.SUCCESS.GET_OPTIONS_LIST
        }
        optionctrl.viewoptionList(req, res).then(result => {
            
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
    
    optionctrl.viewoptionList(req, res).then(result => {
        
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
    optionctrl.viewoptionList(req, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})

})



//-----------------------#########--------------------------------



describe('GET /options/api/getoptionDetailsbyID/{id}', function () {
    let req = {
        body: ''
    }
    it('It should return the SUCCESS for get option details by Id',
        function (done) {
            let res;
            req.query = {

                access_token: adminAccesToken,

            }
            req.params = {
                id:3
            }
            let response = {
                data: responseMessages.SUCCESS.GET_OPTIONS_DETAILS_BY_ID
            }
            optionctrl.viewoptionDetailsbyId(req, res).then(result => {
               
                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })

// --------------------------------------------------------------

it('It should Return the error that for option id is not Exist', (done) => {
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
            optionctrl.viewoptionDetailsbyId(req, res).then(result => {
                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                done()
            })
        })

//--------------------------------------------------------------------

it('It should Return the error that for access token is not given', (done) => {
    let res;
    req.query = {

    }
    
    optionctrl.viewoptionDetailsbyId(req, res).then(result => {
        
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
    optionctrl.viewoptionDetailsbyId(req, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})
})



//-----------------------#########--------------------------------



describe('GET /options/api/editoptionDetailsbyID/{id}', function () {
    let req = {
        body: ''
    }
    it('It should return the SUCCESS for edit option details by Id',
        function (done) {
            let res;

            req.params = {
                id: 6,
            }
            req.body = {
                access_token: adminAccesToken,
                question_id: "15",
                option_1: "Fish",
                option_2: "Shark",
                option_3: "Whale",
                option_4: "Tortoise",
            }

            let response = {
                data: responseMessages.SUCCESS.EDITED_OPTION_DETAILS
            }
            optionctrl.editOptionDetails(req, res).then(result => {

                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })
        

// --------------------------------------------------------------

it('It should Return the ERROR that for option id is not Exist', (done) => {
            let res;
            
            req.params = {
                     id:80,

            }
            req.body = {
                access_token: adminAccesToken,
                question_id: "3",
                option_1: "Fish",
                option_2: "Shark",
                option_3: "Whale",
                option_4: "Tortoise",
                
            }
    
               let response = {
                data: responseMessages.Error.ID_NOT_EXIST
            }
            optionctrl.editOptionDetails(req, res).then(result => {
                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                
                done()
            })
        })


//--------------------------------------------------------------------

it('It should Return the error that for access token is not given', (done) => {
    let res;
    req.body = {

    }
    
    optionctrl.editOptionDetails(req, res).then(result => {
        
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
    optionctrl.editOptionDetails(req, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})
})


//-----------------------#########--------------------------------


describe('GET /options/api/deleteoptionDetailsbyID/{id}', function () {
    let req = {
        body: ''
    }
    it('It should delete option details by Id',
        function (done) {
            let res;
            req.query = {
                access_token: adminAccesToken,
            }
            req.params = {
                id: 7,
            }


            let response = {
                data: responseMessages.SUCCESS.OPTION_DELETED
            }
            optionctrl.deleteOptionDetailsById(req, res).then(result => {

                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })

    // --------------------------------------------------------------

it('It should Return the error that for option id is not Exist', (done) => {
            let res;
            
            req.params = {
                     id:80,

            }
            req.query = {
                access_token: adminAccesToken,
                
            }
    
    
            let response = {
                data: responseMessages.Error.ID_NOT_EXIST
            }
            optionctrl.deleteOptionDetailsById(req, res).then(result => {
                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                done()
            })
        })
    

//--------------------------------------------------------------------

it('It should Return the error that for access token is not given', (done) => {
    let res;
    req.query = {

    }
    
    optionctrl.deleteOptionDetailsById(req, res).then(result => {
        
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
    optionctrl.deleteOptionDetailsById(req, res).then(result => {
        
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})
})


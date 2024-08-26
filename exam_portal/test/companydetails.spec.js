let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = require('chai').expect;
chai.should();

const express = require('express');
const { result } = require('underscore');

const responseMessages = require('../src/utils/response_message');

const CompanyDetailsctrl = require("../src/controller/companyDetailsCtrl");


const adminAccesToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJ1c2VyX3JvbGUiOjAsImVtYWlsX2lkIjoiUGlrYUBnbWFpbC5jb20iLCJzdHJpbmciOiJXZWQgRGVjIDI4IDIwMjIgMTI6MTA6MzAgR01UKzA1MzAgKEluZGlhIFN0YW5kYXJkIFRpbWUpNyIsImlhdCI6MTY3MjIwOTYzMCwiZXhwIjoxNjcyODE0NDMwfQ.9Ah60_yGGpcL-w4i01EJBJfFnBbBzJ_53xurFsuud4A"

const wrongAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxMywidXNlcl9yb2xlIjoxLCJlbWFpbF9pZCI6ImFqMTVAZ21haWwuY29tIiwic3RyaW5nIjoiU2F0IERlYyAzMSAyMDIyIDEzOjQxOjQ5IEdNVCswNTMwIChJbmRpYSBTdGFuZGFyZCBUaW1lKTEzIiwiaWF0IjoxNjcyNDc0MzA5LCJleHAiOjE2NzMwNzkxMDl9.vx3YZkYmky8j5wyoHzTOa5MA8BJlxyBSNxnIJw9smN0"

describe('POST /companyDetails/api/addcompanyDetails', () => {
    let req = {
        body: ''

    }
    it('It should return the Success for Add Company details', (done) => {
        let res;
        req.body = {
            access_token: adminAccesToken,
            company_name: "Ilead",
            company_details: "MNC",
            exam_name: "hunter",
            exam_details: "Face to Face",
            designation: "React developer",

        }


        let response = {
            data: responseMessages.SUCCESS.ADD_COMPANY
        }
        CompanyDetailsctrl.addCompanyDetails(req.body, res).then(result => {

            expect(result.statusCode).to.equal(response.data.statusCode)
            expect(result.message).to.equal(response.data.customMessage)
            expect(result.data).not.to.equal(null)
            done()
        })
    })

    // -------------------------------------------------------------

    it('It should Return the error that for company name is Already Exist', (done) => {
        let res;
        req.body = {
            access_token: adminAccesToken,
            company_name: "Bosch",
            company_details: "MNC",
            exam_name: "TalentHunt",
            exam_details: "Online",
            designation: "Business Analyst",
        }


        let response = {
            data: responseMessages.Error.COMPANY_EXIST
        }
        CompanyDetailsctrl.addCompanyDetails(req.body, res).then(result => {

            expect(result.statusCode).to.equal(response.data.statusCode)
            expect(result.message).to.equal(response.data.customMessage)
            done()
        })
    })

    // -------------------------------------------------------------------


    it('It should Return the error that for access token is not given', (done) => {
        let res;
        req.query = {


        }

        CompanyDetailsctrl.addCompanyDetails(req, res).then(result => {

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
        CompanyDetailsctrl.addCompanyDetails(req.body, res).then(result => {

            expect(result.statusCode).to.equal(response.data.statusCode)
            expect(result.message).to.equal(response.data.customMessage)
            done()
        })
    })

})



// -----------------------#########--------------------------------


describe('GET /companyDetails/api/getcompanyList', () => {
    let req = {
        query: ''
    }
    it('It should Return Success for view the company list', (done) => {
        let res;
        req.query = {
            access_token: adminAccesToken,
        }


        let response = {
            data: responseMessages.SUCCESS.VIEW_COMPANY_LIST
        }
        CompanyDetailsctrl.viewCompanyList(req, res).then(result => {
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

        CompanyDetailsctrl.viewCompanyList(req, res).then(result => {

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
        CompanyDetailsctrl.viewCompanyList(req, res).then(result => {

            expect(result.statusCode).to.equal(response.data.statusCode)
            expect(result.message).to.equal(response.data.customMessage)
            done()
        })
    })
})





// -----------------------#########--------------------------------


describe('GET /companyDetails/api/getcompanyDetails/{id}', function () {
    let req = {
        body: ''
    }
    it('It should return success for fetch the company details by Id',
        function (done) {
            let res;
            req.query = {

                access_token: adminAccesToken,

            }
            req.params = {
                id: 4
            }
            let response = {
                data: responseMessages.SUCCESS.VIEW_COMPANY_DETAILS_BY_ID
            }
            CompanyDetailsctrl.viewcompanyDetailsbyId(req, res).then(result => {

                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })

    // --------------------------------------------------------------

    it('It should Return the error that for company id is not Exist', (done) => {
        let res;
        req.query = {
            access_token: adminAccesToken,

        }
        req.params = {
            id: 80
        }


        let response = {
            data: responseMessages.Error.COMPANY_ID_NOT_EXIST
        }
        CompanyDetailsctrl.viewcompanyDetailsbyId(req, res).then(result => {
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

        CompanyDetailsctrl.viewcompanyDetailsbyId(req, res).then(result => {

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
        CompanyDetailsctrl.viewcompanyDetailsbyId(req, res).then(result => {

            expect(result.statusCode).to.equal(response.data.statusCode)
            expect(result.message).to.equal(response.data.customMessage)
            done()
        })
    })

})


// -----------------------#########--------------------------------


describe('GET /companyDetails/api/editcompanyDetails/{id}', function () {
    let req = {
        body: ''
    }
    it('It should  edit company details by Id Successfully',
        function (done) {
            let res;

            req.params = {
                id: 1
            }
            req.body = {
                access_token: adminAccesToken,
                company_name: "Ilead",
                company_details: "MNC",
                exam_name: "hunter",
                exam_details: "Face to Face",
                designation: "React developer",
            }

            let response = {
                data: responseMessages.SUCCESS.EDITED_COMPANY
            }
            CompanyDetailsctrl.editCompanyDetails(req, res).then(result => {

                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })

    // --------------------------------------------------------------

    it('It should Return the error that for company id is not Exist', (done) => {
        let res;

        req.params = {
            id: 80,

        }
        req.body = {
            access_token: adminAccesToken,

        }


        let response = {
            data: responseMessages.Error.ID_NOT_EXIST
        }
        CompanyDetailsctrl.editCompanyDetails(req, res).then(result => {
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

        CompanyDetailsctrl.editCompanyDetails(req, res).then(result => {

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
        CompanyDetailsctrl.editCompanyDetails(req, res).then(result => {

            expect(result.statusCode).to.equal(response.data.statusCode)
            expect(result.message).to.equal(response.data.customMessage)
            done()
        })
    })

})




// -----------------------#########--------------------------------


describe('GET /companyDetails/api/deleteCompanyDetails/{id}', function () {
    let req = {
        body: ''
    }
    it('It should delete company details by Id',
        function (done) {
            let res;
            req.query = {
                access_token: adminAccesToken,
            }
            req.params = {
                id: 5,
            }


            let response = {
                data: responseMessages.SUCCESS.DELETE_COMPANY_DETAILS
            }
            CompanyDetailsctrl.deleteCompanyDetailsById(req, res).then(result => {

                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })

    // --------------------------------------------------------------

    it('It should Return the error that for Company id is not Exist', (done) => {
        let res;

        req.params = {
            id: 20,

        }
        req.query = {
            access_token: adminAccesToken,

        }


        let response = {
            data: responseMessages.Error.ID_NOT_EXIST
        }
        CompanyDetailsctrl.deleteCompanyDetailsById(req, res).then(result => {
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

        CompanyDetailsctrl.deleteCompanyDetailsById(req, res).then(result => {

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
        CompanyDetailsctrl.deleteCompanyDetailsById(req, res).then(result => {

            expect(result.statusCode).to.equal(response.data.statusCode)
            expect(result.message).to.equal(response.data.customMessage)
            done()
        })
    })

})

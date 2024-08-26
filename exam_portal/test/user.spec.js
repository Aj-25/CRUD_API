let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
var expect = require('chai').expect;
chai.should();

const responseMessages = require('../src/utils/response_message');

const Userctrl = require("../src/controller/userCtrl");


const adminAccesToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo3LCJ1c2VyX3JvbGUiOjAsImVtYWlsX2lkIjoiUGlrYUBnbWFpbC5jb20iLCJzdHJpbmciOiJXZWQgRGVjIDI4IDIwMjIgMTI6MTA6MzAgR01UKzA1MzAgKEluZGlhIFN0YW5kYXJkIFRpbWUpNyIsImlhdCI6MTY3MjIwOTYzMCwiZXhwIjoxNjcyODE0NDMwfQ.9Ah60_yGGpcL-w4i01EJBJfFnBbBzJ_53xurFsuud4A"





describe('POST /user/api/register', () => {
    let req = {
        body: ''
        
    }
    it('Registered User', (done) => {
        let res;
        req.body = {
            
            user_name: "Mahak Design",
            email_id: "design@gmail.com",
            password: "sdkfdsj",
            phone_number: "jjshafklsj",
            profile_pic: "45.gjsk",
            user_role: "0",
           
        }


        let response = {
            data: responseMessages.SUCCESS.REGISTER
        }
        Userctrl.createUser(req, res).then(result => {
           
            expect(result.statusCode).to.equal(response.data.statusCode)
            expect(result.message).to.equal(response.data.customMessage)
            expect(result.data).not.to.equal(null)
            done()
        })
    })

//--------------------------------------------------------------

it('It should Return the error that for User is Already Exist', (done) => {
            let res;
            req.body = {
                
                user_name: "Vinesh sirji",
                email_id: "Vinesh@gmail.com",
                password: "123456",
                phone_number: "0000000005",
                profile_pic: "45.jpg",
                user_role: "0",
            }
    
    
            let response = {
                data: responseMessages.Error.USER_EXIST
            }
            Userctrl.createUser(req, res).then(result => {
               
                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })
})




// ----------#############################--------------------------




describe('GET /user/api/viewUserProfile', () => {
    let req = {
        body: ''
    }
    it('view the User Profile', (done) => {
        let res;
        req.query = {
            access_token: adminAccesToken,
        }


        let response = {
            data: responseMessages.SUCCESS.VIEW_USER_PROFILE
        }
        Userctrl.viewUserProfile(req.query, res).then(result => {
            expect(result.statusCode).to.equal(response.data.statusCode)
            expect(result.message).to.equal(response.data.customMessage)
            expect(result.data).not.to.equal(null)
            done()
        })
    })

})


// --#######################################------

describe('POST /user/api/login', function () {
    let req = {
        body: ''
    }
    it('It should return access token by Login user',
        function (done) {
            let res;

            
            req.body = {
                
                email_id: "Pika@gmail.com",
                password: "123456",
            }

            let response = {
                data: responseMessages.SUCCESS.LOGIN_SUCCESS
            }
            Userctrl.login(req.body, res).then(result => {

                expect(result.statusCode).to.equal(response.data.statusCode)
                expect(result.message).to.equal(response.data.customMessage)
                expect(result.data).not.to.equal(null)
                done()
            })
        })

    // -----------------------------------------------------

 it('It should Return the error that for Password is Not Valid', (done) => {
    let res;
    req.body = {
        email_id: "Pika@gmail.com",
        password: "123sdg456",
    }


    let response = {
        data: responseMessages.Error.INVALID_PASSWORD
    }
    Userctrl.login(req.body, res).then(result => {
       
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
        done()
    })
})

     //   -----------------------------------------------------

it('It should Return the error that for Email Id is Not Valid', (done) => {
    let res;
    req.body = {
        email_id: "Pika131@gmail.com",
        password: "123456",
    }


    let response = {
        data: responseMessages.Error.INVALID_EMAIL_ID
    }
    Userctrl.login(req.body, res).then(result => {
       
        expect(result.statusCode).to.equal(response.data.statusCode)
        expect(result.message).to.equal(response.data.customMessage)
       done()
    })
})
})


// --#######################################------

describe('PUT /user/api/updateUserProfile', function () {
        let req = {
            body: ''
        }
        it('It should  update the user profile',
            function (done) {
                let res;
                
                req.body = {
                    access_token: adminAccesToken,
                    user_name: "Sethiji",
                    phone_number: "sethiji@gmail.com",
                    profile_pic: "sethiji25",
                    password: "123456",
                    
                    
                }
    
                let response = {
                    data: responseMessages.SUCCESS.UPDATE_PROFILE_SUCCESS
                }
                Userctrl.updateUserProfile(req, res).then(result => {
    
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
    
    Userctrl.updateUserProfile(req, res).then(result => {
        
        expect(result.statusCode).to.equal(400)
        expect(result.message).to.equal('jwt must be provided')
        done()
    })
})

})




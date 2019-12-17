const expect = require('expect');
const request = require('request');
const chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should()
chai.use(chaiHttp)

let paypalcheckoutDetails = {
    "items": [{
        "name": "test product",
        "sku": "test",
        "price": "45",
        "currency": "USD",
        "quantity": 2
    },
    {
        "name": "test product",
        "sku": "test",
        "price": "45",
        "currency": "USD",
        "quantity": 1
    }],
    "amount": {
        "currency": "USD",
        "total": "135"
    }
}

describe('PaypalCheckout', () => {
    describe('/PaypalCheckout Test Cases', () => {
        it('PaypalCheckoutTest', (done) => {
            chai.request(server)
                .post('/secureuser/paypalcheckout/')
                .send(paypalcheckoutDetails)
                .end((err, res) => {
                    if (err) throw err
                    if (should) console.log("Paypal Checkout api executed ...")
                    res.should.have.status(200)
                    done()
                })
        })
    })
});
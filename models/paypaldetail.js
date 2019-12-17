const express = require("express");
const request = require("request")
const paypal = require('paypal-rest-sdk');
const config = require('../config/config')
const dbConnection = require("../database/connect");
const braintree = require("braintree");
const accountSid = 'AC0898007cad13e9378d23d2f13ca1875f'
const authToken = 'ab39a972cad39504eab495d6937e0494';
const client = require('twilio')(accountSid, authToken);
const Razorpay = require('razorpay')
const instance = new Razorpay({
    key_id: config.RAZORPAY_KEYID,
    key_secret: config.RAZORPAY_KEYSECRET
});

module.exports.paypaldetail = async function (req, res, data) {
    let conn = await dbConnection();
    let products = req.body.items;
    let country_code = req.body.customer.country_code
    let phone_number = req.body.customer.phone;
    let customer_id = req.body.customer.customer_id;
    console.log(phone_number, 'hhhh')
    let currency = req.body.currency
    let total = req.body.total;
    let arrData = [];
    paypal.configure({
        'mode': 'sandbox', //sandbox or live
        'client_id': 'AbjqA6QklM8-IytgprnSRA7jUyQp_e6_A6w2lDjIM3WimJimKTK0F_Dg-598A4mrmz_nd_LaZV7z7q5z',
        'client_secret': 'EB3IkK0K8FsVcsMyBT_bBY_G7guqayZRhAK3k5Nazbjv-2WrXdT3-xxjp8LxgpuuKDGoRC0q9_dih4vy'
    });
    var create_payment_json = {
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/",
            "cancel_url": "http://localhost:3000/"
        },
        "transactions": [{
            "item_list": {
                "items":
                    products.map((product) => {
                        return {
                            name: product.name,
                            sku: product.sku,
                            price: parseFloat(product.price),
                            currency: product.currency,
                            quantity: product.quantity
                        }
                    })


            },
            "amount": req.body.amount,
            "description": "This is the payment description."
        }]
    };


    async function getSomeData() {
        let element;
        let content;
        let result;
        let content2;
        let order_id;
        let product_quantity;
        let total_price;
        let smsToSEND;
        let content3;
        content = await conn.query("SELECT sms_content FROM sms_content_details WHERE sms_alias='ORD-FAIL'");

        content2 = await conn.query("SELECT order_id,product_cnt,order_total_price FROM product_order_details WHERE customer_id='" + customer_id + "' ORDER BY date_added DESC LIMIT 1")
        console.log(content2[0], 'oppo');
        for (let index = 0; index < content2.length; index++) {
            const element = content2[index];
            console.log(element.order_id, 'customer details ');
            order_id = element.order_id;
            product_quantity = element.product_cnt;
            total_price = element.order_total_price;
        }

        return new Promise((resolve, reject) => {
            paypal.payment.create(create_payment_json, (error, payment) => {
                if (error) {
                    let result;
                    console.log('outside');
                    if (true) {
                        for (let index = 0; index < content.length; index++) {
                            element = content[index].sms_content;
                            console.log('element', element)
                        }
                        console.log('phone', products.phone)
                        client.messages
                            .create({
                                body: element,
                                from: '+12078057568',
                                to: `${country_code}${phone_number}`
                            })
                            .then(message => console.log(message));
                    }

                    reject(error);
                } else {
                    for (var index = 0; index < payment.links.length; index++) {
                        if (payment.links[index].rel === 'approval_url') {
                            arrData.push({ payment });
                        } else if (error) {
                            console.log('in payment')
                            if (true) {
                                for (let index = 0; index < content.length; index++) {
                                    element = content[index].sms_content;
                                    console.log('element', element)
                                }
                                client.messages
                                    .create({
                                        body: element,
                                        from: '+12078057568',
                                        to: `${country_code}${phone_number}`
                                    })
                                    .then(message => console.log(message));
                            }
                        }
                    }
                    console.log(arrData);
                    resolve(arrData);
                }
            })
        })
    }


    const arraydata = await getSomeData()
    return arraydata;

}


module.exports.paypalToken = async function (data) {
    let firstName = data.firstName;
    let lastName = data.lastName
    let email = data.email_id;
    let phone = data.phone_number;


    var gateway = braintree.connect({
        environment: braintree.Environment.Sandbox,
        merchantId: "mdzfptnfgm67cdxc",
        publicKey: "srfprfxqzxqb3yw3",
        privateKey: "c860afc66228792d1311273e1ccbe276"
    });

    let customerDetails = await gateway.customer.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone
    });

    let aCustomerId = customerDetails.customer.id

    var clientToken = await gateway.clientToken.generate({
        customerId: aCustomerId
    });
    return { aCustomerId, clientToken };
}



module.exports.paypalCheckoutDetails = async function (data) {
    let FinalResult;
    let firstName = data.firstName;
    let lastName = data.lastName
    let email = data.email_id;
    let phone = data.phone_number;
    let streetAddress = data.streetAddress;
    let extendedAddress = data.extendedAddress;
    let locality = data.locality;
    let region = data.region;
    let postalCode = data.postalCode;
    let countryCode = data.countryCode;
    let paymentMethodNonce = data.paymentMethodNonce;
    let amount = data.amount;

    var gateway = braintree.connect({
        environment: braintree.Environment.Sandbox,
        merchantId: "mdzfptnfgm67cdxc",
        publicKey: "srfprfxqzxqb3yw3",
        privateKey: "c860afc66228792d1311273e1ccbe276"
    });

    let resultData = await gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: paymentMethodNonce,
        customer: {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email
        },
        billing: {
            firstName: firstName,
            lastName: lastName,
            streetAddress: streetAddress,
            extendedAddress: extendedAddress,
            locality: locality,
            region: region,
            postalCode: postalCode,
            countryCodeAlpha2: countryCode
        },
        shipping: {
            firstName: firstName,
            lastName: lastName,
            streetAddress: streetAddress,
            extendedAddress: extendedAddress,
            locality: locality,
            region: region,
            postalCode: postalCode,
            countryCodeAlpha2: countryCode
        },
        options: {
            submitForSettlement: true
        }
    });
    return resultData;
}

module.exports.orderDetails = async function (data) {
    var options = {
        amount: 100,
        currency: "INR",
        receipt: "receipt_012",
        payment_capture: '0'
    };

    let OrderDetails = await instance.orders.create(options)
    return OrderDetails;

}


// module.exports.razorpayDetails = async function (data) {
//          console.log('hi')


//    let paymentCapture = await instance.payments.capture('pay_DEuzpVDjyDkPYs', 100);
//    console.log(paymentCapture,"paymentCapture")
//     // razorpayData = await instance.customers.create({
//     //     name: 'Sumit Sharma',
//     //     email: 'sumit123@gmail.com',
//     //     contact: '9893273970'
//     // })




// }



const express = require("express");
var jwt = require('jsonwebtoken');
const dbConnection = require("../database/connect");
const config = require("../config/config");
const authy = require("authy")(config.TWILIO_API_KEY);
const forgetpasswordObj = require('../models/forgetpassword')

module.exports.changePassword = async function(req, res) {
    var phone_number = req.body.phone_number;
    var country_code = req.body.country_code;
    let conn = await dbConnection();
    conn.query('SELECT * FROM registerdetails WHERE statuscode = 1 AND phone_number = ?', [phone_number], function(err, results, fields) {
        var user_id;
        if (err) {
            res.json({
                status: "Fail",
                message: 'There are some error with query'
            })
        } else {
            if (results.length > 0) {
                if (phone_number == results[0].phone_number) {
                    user_id = results[0].user_id;
                    authy.phones().verification_start(phone_number, country_code, { via: 'sms', locale: 'en', code_length: '6' }, function(err) {
                        if (err) {
                            console.log(err)
                        } else {
                            return res.json({
                                status: "Success",
                                user_id: user_id,
                                message: "send message successfully"
                            })
                        }
                    });
                }
            } else {
                res.json({
                    status: "Fail",
                    message: "Phone Number is Not Registered With Us"
                })
            }
        }
    });
}



module.exports.updatePassword = async function(req, res) {
    let phone_number = req.body.phone_number;
    let country_code = req.body.country_code
    let verification_code = req.body.verification_code
    authy.phones().verification_check(phone_number, country_code, verification_code, function(err, results) {
        if (err) {
            return res.status(400).json({ 'err': err })
        } else {
            return res.status(200).json({ "status": "Success", "message": "Verification code is correct.", })
        }
    });
}



module.exports.updateUserPassword = async function(req, res) {
    try {
        let result = await forgetpasswordObj.updateUserPassword(req);
        return res.status(200).json({ "status": "Success", "data": result });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ 'err': e });
    }
}
const express = require("express")();
const request = require('request');
const dbConnection = require("../database/connect");
const config = require("../config/config");
const authy = require("authy")(config.TWILIO_API_KEY);

module.exports.requestPhoneVerification = async function (req, res) {

    let phone_number = req.body.phone_number;
    let country_code = req.body.country_code
    authy.phones().verification_start(phone_number, country_code, { via: 'sms', locale: 'en', code_length: '6' }, function (err) {
      if(err){
          console.log(err)
      }else{
         return res.json({
            status: "Success",
            message: "send message successfully"
          })
      }
    });

};


module.exports.confirmPhoneVerification = async function (req, res) {
    let phone_number = req.body.phone_number;
    let country_code = req.body.country_code
    let verification_code = req.body.verification_code
    authy.phones().verification_check(phone_number, country_code, verification_code, function (err) {
        if(err){
            console.log(err)
        }else{
           return res.json({
              status: "Success",
              message: "verifcation is confirmed"
            })
        }
    });
};

// module.exports.VerificationStatus = async function (req, res) {
//     let phone_number = req.body.phone_number;
//     let country_code = req.body.country_code
//     console.log('in verify phone');
//     authy.phones().verification_check(phone_number, country_code, function (err) {
//         if(err,res){
//             console.log(err)
//         }else{
//            return res.json({
//               status: "Sucess",
//               message: "You are registered with shoclef"
//             })
//         }
//     });
// };

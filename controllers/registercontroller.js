const express = require("express");
var jwt = require('jsonwebtoken');
const dbConnection = require("../database/connect");
const config = require("../config/config");
const registermodelObj = require('../models/register');
const authy = require("authy")(config.TWILIO_API_KEY);

const accountSid = 'AC0898007cad13e9378d23d2f13ca1875f'
const authToken = 'ab39a972cad39504eab495d6937e0494';
const client = require('twilio')(accountSid, authToken);
let fullname
let elemnt2;
module.exports.registerDetails = async function (req, res) {
    var phone_number = req.body.phone_number;
    var country_code = req.body.country_code;
     fullname = req.body.fullname
    let conn = await dbConnection();
    conn.query('SELECT * FROM registerdetails WHERE statuscode = 1 AND phone_number = ?', [phone_number], function (err, results, fields) {
        var lastinserted;
        if (err) {
            res.json({
                status: "Fail",
                message: 'There are some error with query'
            })
        } else {
            if (results.length > 0) {
                if (phone_number == results[0].phone_number) {
                    return res.json({
                        status: "Fail",
                        message: 'Phone Number is Already Added'
                    })
                }
            } else {
                console.log(phone_number, country_code, 'coutretgedrg')
                conn.query('SELECT * FROM registerdetails WHERE statuscode = 0 AND phone_number = ?', [phone_number], function (err, resultset, fields) {
                    console.log(resultset.length, 'cxvdfvdfv')
                    if (resultset.length > 0) {
                        authy.phones().verification_start(phone_number, country_code, { via: 'sms', locale: 'en', code_length: '6' }, function (err) {
                            if (err) {
                                console.log(err)
                            } else {
                                res.json({
                                    status: "Success",
                                    message: 'User are partially registered with us we will send you an OTP for confirmation',
                                    user_id: resultset[0].user_id
                                })
                            }
                        });
                    } else {
                        authy.phones().verification_start(phone_number, country_code, { via: 'sms', locale: 'en', code_length: '6' }, function (err) {
                            if (err) {
                                console.log(err)
                            } else {
                                conn.query('INSERT INTO  registerdetails (fullname,country_code,phone_number,email_id,password,city,state,country,statuscode) VALUES ("' + req.body.fullname + '","' + req.body.country_code + '", "' + req.body.phone_number + '", "' + req.body.email_id + '", "' + req.body.password + '","' + req.body.city + '","' + req.body.state + '","' + req.body.country + '","0")', function (err, data) {
                                    if (err) {
                                        res.json({
                                            status: "Fail",
                                            message: 'Data Partially filled'
                                        })
                                    } else {
                                        
                                        lastinserted = data.insertId;
                                        res.json({
                                            status: "Success",
                                            message: "New User Added and message Send Successfully",
                                            user_id: lastinserted,
                                        });
                                        
                                        
                                    }
                                });
                            }
                        });
                    }
                });






            }
        }
    });
}



module.exports.userverification = async function (req, res) {
    let phone_number = req.body.phone_number;
    let country_code = req.body.country_code;
    let verification_code = req.body.verification_code;
    let user_id = req.body.user_id;
    let conn = await dbConnection();
    let content = await  conn.query("SELECT sms_content FROM sms_content_details WHERE sms_alias='REG-SUCCESS'");
    conn.query('SELECT * FROM registerdetails WHERE user_id = "' + user_id + '" AND statuscode = 0 AND phone_number = ?', [phone_number], function (err, results, fields) {

        if (err) {
            res.json({
                status: "Fail",
                message: 'There are some error with your verification'
            })
        } else {

            authy.phones().verification_check(phone_number, country_code, verification_code, async function (err) {
                if (err) {
                    console.log(err)
                } else {
                   await conn.query('UPDATE registerdetails SET statuscode = 1 WHERE user_id = ?', [user_id], function (err, results, fields) {
                        const token = jwt.sign({ results }, config.SECRET_KEY, { expiresIn: '120m' });
                        if (err) {
                            res.json({
                                status: "Fail",
                                message: 'there are some error with query'
                            })
                        } else {
                            console.log(content)
                            for (let index = 0; index < content.length; index++) {
                                const element = content[index].sms_content;
                                console.log('element',element)
                             elemnt2 = element.replace("{#v1#}",fullname)
                                console.log('hgfyf',elemnt2)
                            }
                            if(true){
                                client.messages
                                .create({
                                    body: elemnt2,
                                    from: '+12078057568',
                                    to: `${country_code}${phone_number}`
                                })
                                .then(message => console.log(message));
                            }
                             return res.json({
                                status: "Success",
                                message: "verifcation is confirmed",
                                token: token,
                            })
                                        
                        }

                    })

                }
            });

        }

    });

}

module.exports.getregisterDetails = async function (req, res) {
    try {
        let result = await registermodelObj.getregisterDetails(req.body);
        return res.status(200).json({ "status": "Success", "data": result });
    } catch (e) {
        console.log(e)
        return res.json({ 'err': e });
    }
}



module.exports.usersignin = async function (req, res) {
    let country_code = req.body.country_code
    var phone_number = req.body.phone_number;
    var password = req.body.password;
    let conn = await dbConnection();
    conn.query("SELECT * FROM registerdetails WHERE phone_number ='"+phone_number+"' AND country_code='"+country_code+"' " , function (err, results, fields) {
        if (err) {
            res.json({
                status: "Fail",
                message: 'there are some error with query'
            })
        } else {
            const token = jwt.sign({ results }, config.SECRET_KEY, { expiresIn: '120m' });

            if (results.length > 0) {
                if (password == results[0].password) {
                    return res.json({

                        status: "Success",
                        token: token,
                        data: results[0],
                        message: 'successfully authenticated'
                    })
                } else {
                    return res.json({ "status": "Fail", "message": "Phone Number and password does not match", 'err': err });
                }

            } else {
                res.json({
                    status: "Fail",
                    message: "Phone Number does not exits"
                });
            }
        }
    });
}
const express = require("express");
const config = require("../config/config");
const paymentGatewayDetails = require('../models/paypaldetail');


module.exports.paypaldetail = async function (req, res) {
    try {
        let result = await paymentGatewayDetails.paypaldetail(req);
        return res.status(200).json({ "status": "Success", "data": result });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ 'err': e });
    }
}

module.exports.paypalToken = async function (req, res) {
    try {
        let result = await paymentGatewayDetails.paypalToken(req.body);
        return res.status(200).json({ "status": "Success", "data": result });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ 'err': e });
    }
}

module.exports.paypalCheckoutDetails = async function (req, res) {
    try {
        let result = await paymentGatewayDetails.paypalCheckoutDetails(req.body);
        return res.status(200).json({ "status": "Success", "data": result });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ 'err': e });
    }
}

module.exports.orderDetails = async function (req, res) {
    try {
        let result = await paymentGatewayDetails.orderDetails(req.body);
        return res.status(200).json({ "status": "Success", "data": result });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ 'err': e });
    }
}

// module.exports.razorpayDetails = async function (req, res) {
//     try {
//         let result = await paymentGatewayDetails.razorpayDetails(req.body);
//         return res.status(200).json({ "status": "Success", "data": result });
//     } catch (e) {
//         console.log(e)
//         return res.status(400).json({ 'err': e });
//     }
// }

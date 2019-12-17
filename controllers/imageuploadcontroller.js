const express = require("express");
const dbConnection = require("../database/connect");
const config = require("../config/config");
const imageuploadmodelObj = require('../models/imageupload');


module.exports.imageupload = async function (req, res) {
    try {
        let result = await imageuploadmodelObj.imageupload(req);
        return res.status(200).json({ "status": "Success", "data": result });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ 'err': e });
    }
}
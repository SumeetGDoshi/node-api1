const express = require("express");
const dbConnection = require("../database/connect");


module.exports.updateUserPassword = async function(req, res) {
    let user_id = req.body.user_id;
    let password = req.body.password;
    let fullname = req.body.fullname;
    let conn = await dbConnection();
    return await conn.query('UPDATE registerdetails SET fullname = "' + fullname + '", password ="' + password + '"  WHERE user_id =' + user_id);
}
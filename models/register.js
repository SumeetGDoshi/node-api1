const express = require("express");
const dbConnection = require("../database/connect");



module.exports.getregisterDetails = async function () {
    let conn = await dbConnection();
    return await conn.query('SELECT * FROM registerdetails');           
  }
  
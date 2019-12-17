const express = require("express");
const conn = require("../database/connect");

//#### Local Services ####


module.exports.getLocalServiceDetails = async function() {
    let con = await conn();
    return await con.query('SELECT * FROM services_detail');
}

module.exports.getLocalServiceDetailsById = async function(data) {
    let con = await conn();
    return await con.query("SELECT * FROM services_detail WHERE service_id = '" + data.service_id + "'  AND category_id= '" + data.category_id + "' ");
}

module.exports.getLocalServiceDetailsByPincode = async function(data) {
    let con = await conn();
    return await con.query("SELECT * FROM services_detail WHERE pincode = '" + data.pincode + "' ");
}

//#####  Live Services  #####
 

module.exports.getLiveServiceDetails = async function() {
    let con = await conn();
    return await con.query('SELECT * FROM services_detail');
}

module.exports.getLiveServiceDetailsById = async function(data) {
    let con = await conn();
    return await con.query("SELECT * FROM services_detail WHERE service_id = '" + data.service_id + "'  AND category_id= '" + data.category_id + "' ");
}


//#### Online Services #####


module.exports.getOnlineServiceDetails = async function() {
    let con = await conn();
    return await con.query('SELECT * FROM services_detail');
}

module.exports.getOnlineServiceDetailsById = async function(data) {
    let con = await conn();
    return await con.query("SELECT * FROM services_detail WHERE service_id = '" + data.service_id + "'  AND category_id= '" + data.category_id + "' ");
}




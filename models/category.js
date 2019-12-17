const express = require("express");
const conn = require("../database/connect");
const request = require("request-promise");
const config = require("../config/config")

module.exports.getCategoryDetails = async function (data) {
    let Finalarr2 = [];
    const options = {
        url: config.GET_CATEGORY_LIST + data.CategoryId,
        method: 'GET',
        headers: {

            'Accept': 'application/json',
        },
        json: true
    };
    await request(options, async function (err, res, body) {
        if (err) {
            console.log(err)
            throw err;
        } else {
            let productdata2 = await body.data;

            for (let i = 0; i < productdata2.length; i++) {
                const resData = productdata2[i];
                Finalarr2.push(resData)
            }
        }
    })
    return Finalarr2;
}
const express = require("express");
const request = require("request-promise")
const dbConnection = require("../database/connect");
const config = require("../config/config")


module.exports.getproductAllDetails = async function (data, res) {
    let result;
    let page = data.page
    let limit = data.limit
    let CategoryId = data.CategoryId
    let finalOption;
    if(CategoryId != "" && CategoryId != undefined){
        const options = {
            url: config.PRODUCT_LIST + page + "&limit=" + limit + "&CategoryId=" + CategoryId,
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Content-Type':'application/json',
                'Accept': 'application/json'       
            },
            json: true
        };
        finalOption = options;
    }else{
        const options2 = {
            url: config.PRODUCT_LIST + page + "&limit=" + limit,
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            json: true
        };
        finalOption = options2;        
    }

    await request(finalOption, function (error, body, res) {
        console.log(body,"sdgvfdsghbdfhbfgfgh")
        result = body;
    });
    return await result;
}

module.exports.getproductdata = async function (data, res) {
    let result;
    const options = {
        url: config.PRODUCT_DETAILS + data.ProductId,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
        json: true
    };
    await request(options, function (error, body) {
        result = body;
    });
    return await result;
}

module.exports.getProductSearch = async function (data, res) {
    let result;
    const options = {
        url: config.PRODUCT_SEARCH + data.ProductSearch + "&limit=" + data.limit + "&page=" +data.page,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
        },
        json: true
    };
    await request(options, function (error, body) {
        result = body;
    });
    return await result;
}

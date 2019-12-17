const servicedetailmodelObj = require('../models/servicedetails');



module.exports.getLocalServiceDetails = async function(req, res) {
    try {
        let result = await servicedetailmodelObj.getLocalServiceDetails(req.query);
        return res.status(200).json({ "status": "Sucess", "data": result });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ 'err': e });
    }
}

module.exports.getLocalServiceDetailsById = async function(req, res) {
    try {
        let result = await servicedetailmodelObj.getLocalServiceDetailsById(req.query);
        console.log(result);
        return res.status(200).json({ "status": "Sucess", "data": result });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ 'err': e });
    }
}

module.exports.getLocalServiceDetailsByPincode = async function(req, res) {
    try {
        let result = await servicedetailmodelObj.getLocalServiceDetailsByPincode(req.query);
        console.log(result);
        return res.status(200).json({ "status": "Sucess", "data": result });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ 'err': e });
    }
}


module.exports.getLiveServiceDetails = async function(req, res) {
    try {
        let result = await servicedetailmodelObj.getLiveServiceDetails(req.query);
        return res.status(200).json({ "status": "Sucess", "data": result });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ 'err': e });
    }
}

module.exports.getLiveServiceDetailsById = async function(req, res) {
    try {
        let result = await servicedetailmodelObj.getLiveServiceDetailsById(req.query);
        console.log(result);
        return res.status(200).json({ "status": "Sucess", "data": result });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ 'err': e });
    }
}



module.exports.getOnlineServiceDetails = async function(req, res) {
    try {
        let result = await servicedetailmodelObj.getOnlineServiceDetails(req.query);
        return res.status(200).json({ "status": "Sucess", "data": result });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ 'err': e });
    }
}

module.exports.getOnlineServiceDetailsById = async function(req, res) {
    try {
        let result = await servicedetailmodelObj.getOnlineServiceDetailsById(req.query);
        console.log(result);
        return res.status(200).json({ "status": "Sucess", "data": result });
    } catch (e) {
        console.log(e)
        return res.status(400).json({ 'err': e });
    }
}


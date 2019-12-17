const productmodelObj = require('../models/products');


module.exports.getproductAllDetails = async function (req, res) {
    try {
        let result = await productmodelObj.getproductAllDetails(req.query);
        return res.status(200).json({ "status": "Success", "data": result });
    } catch (e) {
        return res.status(400).json({ 'err': e });
    }
}
module.exports.getproductdata = async function(req,res){
    try{
        let result = await productmodelObj.getproductdata(req.query);
        return res.status(200).json({"status":"Success","data":result});
    }catch(e){
        return res.status(400).json({'err':e})
    }
}

module.exports.getProductSearch = async function(req,res){
    try{
        let result = await productmodelObj.getProductSearch(req.query);
        return res.status(200).json({"status":"Success","data":result});
    }catch(e){
        return res.status(400).json({'err':e})
    }
}
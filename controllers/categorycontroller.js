const categorymodelObj = require('../models/category');

module.exports.getCategoryDetails =  async function(req,res){
    try{
        let result = await categorymodelObj.getCategoryDetails(req.query);
        return res.status(200).json({ "status": "Sucess", "data": result });
    }
    catch(err){
        console.log(err);
        return res.status(400).json({ 'err': err });
    }
}
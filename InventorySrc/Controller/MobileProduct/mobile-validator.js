const joi=require('joi')
const errorFunction=require('../../utlis/errorFunction')
const path = require("path");


const validation=joi.object({
    mobileBrandName:joi.string().alphanum().min(3).max(25).trim(true).required(),
    mobileModelName:joi.string().alphanum().min(3).max(25).trim(true).required(),
    mobileColor:joi.string().required(),
    mobileRAM:joi.string().trim(true).required(),
    mobileInternalMemory:joi.string().trim(true).required(),
    mobilePrice:joi.number().integer().required(),
    quantity:joi.number().integer().required()
})
const mobileValidation=async(req,res,next)=>{
    const imageType = path.extname(req.file.filename)
    
    if ((imageType !== ".jpg")){
        return res.json("please upload correct format")
    }
    const payload = {
		mobileBrandName: req.body.mobileBrandName,
        mobileModelName: req.body.mobileModelName,
        mobileColor: req.body.mobileColor,
		mobileRAM: req.body.mobileRAM,
		mobileInternalMemory: req.body.mobileInternalMemory,
        mobilePrice: req.body.mobilePrice,
        quantity: req.body.quantity
	};
    const {error}=validation.validate(payload)
    if(error){
        res.status(406);
        return res.json(errorFunction(true, `Error in admin Data : ${error.message}`)
		)
    }
    else{
        next()
    }
}


module.exports = mobileValidation;

const joi=require('joi')
const errorFunction=require('../../utlis/errorFunction')


const comValidation=joi.object({
    companyName:joi.string().alphanum().min(3).max(25).trim(true).required(),
    address:joi.string().alphanum().min(3).max(25).trim(true).required(),
    email:joi.string().email().required(),
})
const CompanyValidation=async(req,res,next)=>{
    const payload = {
		companyName: req.body.companyName,
        address: req.body.address,	
        email: req.body.email,		
	};
    const {error}=comValidation.validate(payload)
    if(error){
        res.status(406);
        return res.json(errorFunction(true, `Error in User Data : ${error.message}`)
		)
    }
    else{
        next()
    }
}
module.exports=CompanyValidation
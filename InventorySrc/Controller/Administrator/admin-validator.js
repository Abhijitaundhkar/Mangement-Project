const joi=require('joi')
const errorFunction=require('../../utlis/errorFunction')

const validation=joi.object({
    adminFirstName:joi.string().alphanum().min(3).max(25).trim(true).required(),
    adminLastName:joi.string().alphanum().min(3).max(25).trim(true).required(),
    adminPhoneNumber:joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
    adminEmailId:joi.string().email().trim(true).required(),
    adminPassword:joi.string().min(8).trim(true).required(),
    
    
})
const adminValidation=async(req,res,next)=>{
    const payload = {
		adminFirstName: req.body.adminFirstName,
        adminLastName: req.body.adminLastName,
        adminPhoneNumber: req.body.adminPhoneNumber,
		adminEmailId: req.body.adminEmailId,
		adminPassword: req.body.adminPassword,
		
		
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


module.exports = adminValidation;
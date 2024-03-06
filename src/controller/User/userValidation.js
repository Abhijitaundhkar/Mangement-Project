const joi=require('joi')
const errorFunction=require('../../utlis/errorFunction')

const validation=joi.object({
    firstName:joi.string().alphanum().min(3).max(25).trim(true).required(),
    lastName:joi.string().alphanum().min(3).max(25).trim(true).required(),
    phoneNo:joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
    email:joi.string().email().trim(true).required(),
    password:joi.string().min(8).trim(true).required(),
    
    
})
const userValidation=async(req,res,next)=>{
    const payload = {
		firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNo: req.body.phoneNo,
		email: req.body.email,
		password: req.body.password,
		
		
	};
    const {error}=validation.validate(payload)
    if(error){
        res.status(406);
        return res.json(errorFunction(true, `Error in User Data : ${error.message}`)
		)
    }
    else{
        next()
    }
}


module.exports = userValidation;
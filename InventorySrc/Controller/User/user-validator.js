const joi=require('joi')
const errorFunction=require('../../utlis/errorFunction')

const validation=joi.object({
    userFirstName:joi.string().alphanum().min(3).max(25).trim(true).required(),
    userLastName:joi.string().alphanum().min(3).max(25).trim(true).required(),
    userPhoneNumber:joi.string().length(10).pattern(/[6-9]{1}[0-9]{9}/).required(),
    userEmailId:joi.string().email().trim(true).required(),
    userPassword:joi.string().min(8).trim(true).required(),
    
    
})
const userValidation=async(req,res,next)=>{
    const payload = {
		userFirstName: req.body.userFirstName,
        userLastName: req.body.userLastName,
        userPhoneNumber: req.body.userPhoneNumber,
		userEmailId: req.body.userEmailId,
		userPassword: req.body.userPassword,
		
		
	};
    const {error}=validation.validate(payload)
    if(error){
        res.status(406);
        return res.json(errorFunction(true, `Error in user Data : ${error.message}`)
		)
    }
    else{
        next()
    }
}


module.exports = userValidation;
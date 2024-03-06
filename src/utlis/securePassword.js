const bcrypt=require("bcrypt")

const securePassword=async(password)=>{
    const salt=await bcrypt.genSalt(10)
    const hashPassword=await bcrypt.hash(password,salt)
    return hashPassword
}

module.exports=securePassword
const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
userFirstName: {
    type: String,
    required:true
  },
  userLastName: {
    type: String,
    required:true
  },
  userEmailId: {
    type: String,
    required:true,
    unique: true,
  },
  userPassword: {
    type: String,
    required:true
  },
  userPhoneNumber: {
    type: String,
    required:true
  },
}
)

module.exports=mongoose.model('user',userSchema)
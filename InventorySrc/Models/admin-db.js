const mongoose=require('mongoose')

const adminSchema=new mongoose.Schema({
adminFirstName: {
    type: String,
    required:true
  },
  adminLastName: {
    type: String,
    required:true
  },
  adminEmailId: {
    type: String,
    required:true,
    unique: true,
  },
  adminPassword: {
    type: String,
    required:true
  },
  adminPhoneNumber: {
    type: String,
    required:true
  },
}
)

module.exports=mongoose.model('admin',adminSchema)
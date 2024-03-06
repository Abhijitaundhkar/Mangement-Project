const mongoose=require('mongoose')

mongoose.set("strictQuery",false)

const loginDB=new mongoose.Schema({
email: {
  type: String,
  unique:true,
  trim: true,
  lowercase:true
},
password: {
    type: String,
    required: true
  },
createdAt: {
  type: Date,
  default: Date.now()
},
updatedAt: {
  type: Date,
  default: Date.now()
}
},
{
versionKey: false // You should be aware of the outcome after set to false
});

module.exports=mongoose.model("loginDatabase",loginDB)


const mongoose=require('mongoose')

const mobileSchema=new mongoose.Schema({
    
      mobileBrandName: {
        type: String,
        required:true,
      },
      mobileModelName: {
        type: String,
        required:true,
        unique: true,
      },
      mobileColor: {
        type: String,
        required:true,
      },

      mobileRAM: {
        type: String,
        required:true,
      },
      mobileInternalMemory: {
        type: String,
        required:true,
      },

      mobilePrice: {
        type: Number,
        required:true,
      },
      quantity:{
        type: Number,
        required:true
        
      },

      imagePath: {
        type:String,
        required:true
      },
    },
  );


module.exports=mongoose.model('mobileCollection',mobileSchema)
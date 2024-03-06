const multer=require('multer')
const fs = require("fs");



const Storage=multer.diskStorage({destination:(req,file,cb)=>{
  
    cb(null,"uploads/")
},
filename:(req,file,cb)=>{
  
  fs.unlink(`uploads/${file.originalname}`,(err)=>{
    if(err){
      console.log(err,"image not found")
    }
    else{
      console.log("image remove from path")
    }
      });
cb(null,file.originalname)
}
})
// const fileFilter = function(req, file, cb){
//     if(file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
//         cb(null, true);
//     }else{
//         cb(null, false);
//     }
// }
const upload=multer({
  storage:Storage
}).single('image')

module.exports=upload
const mongoose=require('mongoose')
mongoose.set('strictQuery',false)
const connentDB=async()=>{
    try {
         const conn=await mongoose.connect(process.env.mongoDb_URI)
         console.log(`database connnected ${conn.connection.host}`)
    } catch (error) {
        console.log("not connected",error)
    }
}
module.exports=connentDB
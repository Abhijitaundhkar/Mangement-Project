const companyDB = require("../../model/companyDB");
const userDatabase = require("../../model/userDB");
const mongoose=require('mongoose')
const Types=require('mongoose').Types
const errorFunction = require('../../utlis/errorFunction')

  exports.getCompany = async(req, res) => {
    let companyList=await companyDB.find()
    if(!companyList) 
    {
      res.status(403);
      return res.json(errorFunction(false,"no company present"))
    }
    else {
      return res.json(errorFunction(false,"company info",companyList))
    }
  }
  
  exports.getCompanyById = async(req, res) => {
    try{
    const id={_id:req.params.id}
    let companyList=await companyDB.findOne(id)
    if(!companyList) 
    {
      res.status(403);
      return res.json(errorFunction(false,"user company name not found"))
    }
    else {
      return res.json(errorFunction(false,"company info",companyList))
    }
  }
  catch(err){
    return res.json("error please enter valid _id")
  }
}



  exports.addCompany = async(req, res) => {
    try {
      const existingCompany=await companyDB.findOne( {companyName: req.body.companyName})
      if(existingCompany){
        res.status(403);
        return res.json(errorFunction(false,"user company name already exists"))
      }
      const newCompany = await companyDB.create({
        companyName: req.body.companyName,
        address: req.body.address
      });
      if (newCompany) {
				res.status(201);
				return res.json(
					errorFunction(false, "User Created", newCompany)
				);
			} else {
				res.status(403);
				return res.json(errorFunction(true, "Error Creating User"));
			} 
      } catch (error) {
        console.log(error);
      }
   }

 exports.updateCompany = async(req, res) => {
  const contact = await companyDB.findOne({_id:req.params.id})
  console.log(contact)
  if(contact ){
  const updated=await companyDB.updateOne({_id:req.params.id},{
    companyName: req.body.companyName,
    address: req.body.address,
    updatedAt:Date.now()
  });
  return res.json(errorFunction(false,"updated info",updated))
}
else{
  return res.json(errorFunction(false,"company not found",updated))
} 
 }

exports.deleteCompany = async(req, res) => {
 const id={_id:req.params.id}
  const count=await companyDB.findOne(id)
  console.log(count)
  if(count){
    await companyDB.deleteOne(id)
    return res.json({message:"deleted"})
  }
  else {
    res.status(404)
    return res.json({message:"Company not found or id not match"})
  }
}
exports.addRelation = async(req, res) => {
  try {
    console.log("addRelation")
    const existingCompany=await companyDB.findOne( {companyName: req.body.companyName})
    const existingUserEmail=await userDatabase.findOne( {email: req.body.email})
    if(existingCompany){
      res.status(403);
      return res.json(errorFunction(false," company name already exists"))
    }
    if(existingUserEmail){
    const data = await companyDB.create({
      companyName: req.body.companyName,
      address: req.body.address
    });

    if (data) {
      await userDatabase.updateOne({email:req.body.email},{$set:{companyData:data._id}},{
        upsert:false,
        new:true})
      res.status(201);
      return res.json(
        errorFunction(false, "User Created", data)
      );
    } else {
      res.status(403);
      return res.json(errorFunction(true, "Error Creating User"));
    } 
  }
  else{
    res.status(403);
      return res.json(errorFunction(false,"email name not found"))
  }
    } catch (error) {
      console.log(error);
    }
 }
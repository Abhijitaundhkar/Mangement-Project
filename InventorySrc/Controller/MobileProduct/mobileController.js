const mobileDatabase = require("../../Models/mobile-db");
const errorFunction = require("../../utlis/errorFunction");
const path = require("path");
const fs = require("fs");

exports.getUser = async (req, res) => {
  let userList = await mobileDatabase.find();
  if (!userList) {
    res.status(404);
    return res.json(errorFunction(false, "mobile not Created", userList));
  } else {
    res.status(201);
    return res.json(errorFunction(false, "mobile list", userList));
  }
};
exports.getDetailsByID = async (req, res) => {
  try {
    const contact = await mobileDatabase.findOne({ _id: req.params.id });
    console.log(contact);
    if (!contact) {
      return res.json(errorFunction(false, "mobile not found", contact));
    }
    res.status(201);
    return res.json(errorFunction(false, "mobile list", contact));
  } catch (err) {
    console.log(err);
    return res.json("please enter valid _id");
  }
};

exports.addMobile = async (req, res) => {
  try {
    const existingMobile = await mobileDatabase
      .findOne({
        mobileModelName: req.body.mobileModelName,
      })
      .lean(true);
    console.log(existingMobile);
    if (existingMobile) {
      res.status(406);
      return res.json(errorFunction(true, "mobile model already existes"));
    } else {
      const newUser = await mobileDatabase.create({
        mobileBrandName: req.body.mobileBrandName,
        mobileModelName: req.body.mobileModelName,
        mobileColor: req.body.mobileColor,
        mobileRAM: req.body.mobileRAM,
        mobileInternalMemory: req.body.mobileInternalMemory,
        mobilePrice: req.body.mobilePrice,
        imagePath: req.file.filename,
        quantity: req.body.quantity,
      });
      if (newUser) {
        res.status(201);
        return res.json(errorFunction(false, "New Mobile Created", newUser));
      } else {
        res.status(403);
        return res.json(errorFunction(true, "Error Creating mobile"));
      }
    }
  } catch (error) {
    console.log(error);
  }
};
exports.updateMobileInfo = async (req, res) => {
  
  const product = await mobileDatabase.findOne({ _id: req.query.id });
  
  console.log(product)
  
  if (product) {
    
    await mobileDatabase.updateOne(
      { _id: req.query.id },
      {
        mobileBrandName: req.body.mobileBrandName,
        mobileModelName: req.body.mobileModelName,
        mobileColor: req.body.mobileColor,
        mobileRAM: req.body.mobileRAM,
        mobileInternalMemory: req.body.mobileInternalMemory,
        mobilePrice: req.body.mobilePrice,
        imagePath: req.file.filename,
        quantity: req.body.quantity,
      }
    );
    return res
      .status(201)
      .json(
        errorFunction(
          false,
          "mobile updated",
          await mobileDatabase.findOne({ _id: req.query.id })
        )
      );
  } else {
    return res.json({ message: "mobile Not found" });
  }
};
exports.deleteMobile = async (req, res) => {
  const id = { _id: req.query.id };
  const product = await mobileDatabase.findOne({ _id: req.query.id });
  console.log(id,product)
  if (product) {
    await mobileDatabase.deleteOne(id);
    fs.unlink(`uploads/${product.imagePath}`,(err)=>{
      if(err){
        console.log(err)
      }
      else{
        console.log("image remove from path")
      }
        });
    return res.json(errorFunction(false, "mobile deleted and image remove from path"));
  } else {
    return res.json({ message: "mobile not found or id not match" });
  }
};
exports.searchMobile = async (req, res) => {
  const {mobileBrandName,mobileModelName} = req.query;
  //const data = await userDatabase.find({$or:[{firstName:firstName},{lastName:lastName}]});
 const data = await mobileDatabase.find({$or:[{mobileBrandName:mobileBrandName},{mobileModelName:mobileModelName}]});
  console.log(data);
  if (data.length>0) {
    return res.json(errorFunction(false, "search list",data));
  } else {
    return res.json({ message: "search not found " });
  }
};
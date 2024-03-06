const userDatabase = require("../../model/userDB");
const errorFunction = require("../../utlis/errorFunction");
const securePassword = require("../../utlis/securePassword");
const jwt = require("jsonwebtoken")
const SECRET_KEY="loginAPI"

exports.getUser = async (req, res) => {
  let userList = await userDatabase.find();
  if (!userList) {
    res.status(404);
    return res.json(errorFunction(false, "User not Created", userList));
  } else {
    res.status(201);
    return res.json(errorFunction(false, "User list", userList));
  }
};

exports.getUserById = async (req, res) => {
  try {
    const contact = await userDatabase.findOne({ _id: req.params.id });
    console.log(contact);
    if (!contact) {
      return res.json(errorFunction(false, "User not found", contact));
    }
    res.status(201);
    return res.json(errorFunction(false, "User list", contact));
  } catch (err) {
    console.log(err);
    return res.json("please enter valid _id");
  }
};

exports.addUser = async (req, res) => {
  try {
    const existingUser = await userDatabase
      .findOne({
        email: req.body.email,
      })
      .lean(true);
    console.log(existingUser);
    if (existingUser) {
      res.status(406);
      return res.json(errorFunction(true, "user email already existes"));
    } else {
      const hashedPassword = await securePassword(req.body.password);
      const newUser = await userDatabase.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        password: hashedPassword,
      });
      if (newUser) {
        res.status(201);
        return res.json(errorFunction(false, "User Created", newUser));
      } else {
        res.status(403);
        return res.json(errorFunction(true, "Error Creating User"));
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (req, res) => {
  const contact = await userDatabase.findOne({ _id: req.params.id });
  console.log(contact);
  if (contact) {
    const hashedPassword = await securePassword(req.body.password);
    await userDatabase.updateOne(
      { _id: req.params.id },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phoneNo: req.body.phoneNo,
        password: hashedPassword,
        updatedAt: Date.now(),
      }
    );
    res.status(201);
    return res.json(
      errorFunction(
        false,
        "User updated",
        await userDatabase.findOne({ _id: req.params.id })
      )
    );
  } else {
    return res.json({ message: "User Not found" });
  }
};

exports.deleteUser = async (req, res) => {
  const id = { _id: req.params.id };
  console.log(id);
  const count = await userDatabase.findOne(id);
  console.log(count);
  if (count) {
    await userDatabase.deleteOne(id);
    return res.json(errorFunction(false, "User deleted"));
  } else {
    return res.json({ message: "user not found or id not match" });
  }
};

exports.registerUserWithCompany = async (req, res) => {
  try {
    const existingUser = await userDatabase
      .findOne({
        email: req.body.email,
      })
      .lean(true);
    console.log(existingUser);
    if (existingUser) {
      res.status(409);
      return res.json(errorFunction(true, "user email already existes"));
    } else {
      const hashedPassword = await securePassword(req.body.password);
      const newUser = await userDatabase.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phoneNo: req.body.phoneNo,
        email: req.body.email,
        password: hashedPassword,
      });
      if (newUser) {
        res.status(201);
        const token = jwt.sign({ email: newUser.email, id: newUser._id },SECRET_KEY,{expiresIn:'5h'})
        req.session.isLogged=true
        res.status(201).json({ message:"login sucessful",user: newUser, token: token })
        console.log(req.session)
      } else {
        res.status(403);
        return res.json(errorFunction(true, "Error Creating User"));
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getFirstLastName = async (req, res) => {
  const {firstName,lastName} = req.query;
  console.log(firstName,lastName);
  //const data = await userDatabase.find({$or:[{firstName:firstName},{lastName:lastName}]});
 const data = await userDatabase.find({$or:[{firstName:firstName},{lastName:lastName}]});
  console.log(data);
  if (data.length>0) {
    return res.json(errorFunction(false, "User list",data));
  } else {
    return res.json({ message: "user not found firstName or lastName" });
  }
};

exports.getAddRelation = async (req, res) => {
  try{
    console.log("geradddddd")
  let userList = await userDatabase.find().populate('companyData').exec();
  if (!userList) {
    res.status(404);
    return res.json(errorFunction(false, "User not Created", userList));
  } else {
    res.status(201);
    return res.json(errorFunction(false, "User list", userList));
  }
}
catch(err){
  console.log(err)
}
};



//module.exports={getUser,deleteUser,updateUser,addUser,getUserById]

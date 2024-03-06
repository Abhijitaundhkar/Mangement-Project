const userDatabase = require("../../Models/user-db");
const errorFunction = require("../../utlis/errorFunction");
const securePassword=require("../../utlis/securePassword");

exports.getUser = async (req, res) => {
    let userList = await userDatabase.find();
    if (!userList) {
      res.status(404);
      return res.json(errorFunction(false, "admin not Created", userList));
    } else {
      res.status(201);
      return res.json(errorFunction(false, "admin list", userList));
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
        const hashedPassword = await securePassword(req.body.userPassword);
        const newUser = await userDatabase.create({
          userFirstName: req.body.userFirstName,
          userLastName: req.body.userLastName,
          userPhoneNumber: req.body.userPhoneNumber,
          userEmailId: req.body.userEmailId,
          userPassword: hashedPassword,
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

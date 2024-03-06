const userDatabase = require('../../model/userDB')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SECRET_KEY="loginAPI"


exports.logInInfo = async (req, res) => {
  const email=req.query.email
  let userList = await userDatabase.findOne({email:email})
  console.log(userList)
  if (userList == null) {
    res.status(404)
    res.json({message:" No info found"})
  }
  else {
    res.json(userList)
  }
}

exports.logIn = async (req, res) => {
  try {
    
    const { email, password } = req.query
    let checkUser = await userDatabase.findOne({ email: email })
    console.log(checkUser)
    if (!checkUser) {
      return res.status(404).json({msg:"No user found "})
    }
    else {
      const matchPassword=await bcrypt.compare(password,checkUser.password)
      console.log(matchPassword)
      if(!matchPassword){
        return res.status(400).json({message:"invalid credentials "})
      }
    const token = jwt.sign({ email: checkUser.email, id: checkUser._id }, SECRET_KEY)
    req.session.isLogged=true
    res.status(201).json({ message:"login sucessful",user: checkUser, token: token })
    console.log(req.session)
    }
  } catch (error) {
    console.log(error);
    res.status(500).json("something is wrong")
  }
}


// exports.singUpInfo = async (req, res) => {
//   let userList = await loginDB.find()
//   if (!userList || userList.length === 0) {
//     res.send("No signup added")
//   }
//   else {
//     res.json(userList)
//   }
// }


// exports.signUp = async (req, res) => {
//   try {
//     const { email, password } = req.body
//     let existingUser = await loginDB.findOne({ email: email })
//     console.log(existingUser)
//     if (existingUser) {
//       return res.status(400).send(`already email added ${existingUser.email}`)
//     }
//     const hashPassword = await bcrypt.hash(password, 10)
//     const result = await loginDB.create({
//       email: email,
//       password: hashPassword
//     });
//     const token = jwt.sign({ email: result, id: result._id }, SECRET_KEY)
//     res.status(201).json({ user: result, token: token })

//   } catch (error) {
//     console.log(error);
//   }
// }

// exports.test = async (req, res) => {
//   try {
    
//     const { email, password } = req.body
//     let checkUser = await loginDB.findOne({ email: email })
//     console.log(checkUser)
//     if (!checkUser) {
//       return res.status(404).json({msg:"No user found "})
//     }
//     else {
//       const matchPassword=await bcrypt.compare(password,checkUser.password)
//       if(!matchPassword){
//         return res.status(400).json({message:"invalid credentials "})
//       }
//     const token = jwt.sign({ email: checkUser.email, id: checkUser._id }, SECRET_KEY)
//     res.status(201).json({ user: checkUser, token: token })
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).json("something is wrong")
//   }
// }
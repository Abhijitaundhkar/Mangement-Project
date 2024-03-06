require("dotenv").config()
const express=require('express')
const bodyParser = require("body-parser")
const swaggerUi=require('swagger-ui-express')
const swaggerJsDoc=require('swagger-jsdoc')
const connectDB=require('./InventorySrc/Models/databaseConfig')


const userRoute=require('./InventorySrc/Controller/User/user-routes')
const adminRoute=require('./InventorySrc/Controller/Administrator/admin-routes')
const mobileRoutes=require('./InventorySrc/Controller/MobileProduct/mobile-routes')


const app=express()
// mongoDb_URI='mongodb+srv:abhijitaundhkar:xrvh7bVNBRpmyAJT@cluster0.qwilqzf.mongodb.net/UserDB';
// const storeData=new mongodbStore({
//   url:mongoDb_URI,
//   collection:"sessions"
// })
const port=3000||process.env.port
app.use(express.urlencoded({extended:true}))
app.use(bodyParser.json());
app.use(express.json())
app.use(express.static('public'))

// app.use(session(
//   {
//     secret:"my secret",resave:false,saveUninitialized:false
// }))
const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "Project Express API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./InventorySrc/Controller/Administrator/admin-routes.js",
    './InventorySrc/Controller/MobileProduct/mobile-routes.js',
    './InventorySrc/Controller/User/user-routes.js'],
  };
  const swaggerSpecfic=swaggerJsDoc(options)
  app.use(`/api-docs`,swaggerUi.serve,swaggerUi.setup(swaggerSpecfic))

app.use("/api/admin", adminRoute);
app.use("/api/mobile", mobileRoutes);
app.use("/api/user", userRoute);

app.listen(port,(req,res)=>{
     console.log(`server running on http://localhost:3000/`)
})
connectDB()














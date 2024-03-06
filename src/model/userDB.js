const {mongoose,Schema} = require("mongoose");
// mongoose.set('strictQuery',false)
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      maxlength: 10,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password:{
      type: String,
      required: true,
      trim: true,
    },
    companyData:
      {type:Schema.Types.ObjectId,ref:"companyData"}

  },
  { timestamps: true },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

module.exports = mongoose.model("UserData", userSchema);

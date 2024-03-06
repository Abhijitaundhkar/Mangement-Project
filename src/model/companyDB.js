const {mongoose} = require("mongoose");
mongoose.set('strictQuery',false)
const Schema = mongoose.Schema;
const companySchema = new Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
  {
    versionKey: false, // You should be aware of the outcome after set to false
  }
);

module.exports = mongoose.model("companyData", companySchema);

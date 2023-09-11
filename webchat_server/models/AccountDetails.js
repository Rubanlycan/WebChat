const mongoose = require("mongoose");
const schema = mongoose.Schema;
const AccountDetailsSchema = new schema(
  {
  
name:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true
},
mail:{
    type:String,
    required:true
},
isLoggedIn:{
  type:Boolean,

}
  },
  { timestamps: true }
);

const AccountDetails = mongoose.model("AccountDetails", AccountDetailsSchema);

module.exports = AccountDetails;
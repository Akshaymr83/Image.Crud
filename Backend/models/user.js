const mongoose =require('mongoose');
const userSchema = mongoose.Schema({
    name:{
        type:String
    },
    department:{
        type:String
    },
    age:{
        type:Number
    },
    salary:{
        type:Number
    },
    image:{
        type:String
    }
})
const userModel = mongoose.model("EMPLOYEE__DETAILS", userSchema)
module.exports = userModel
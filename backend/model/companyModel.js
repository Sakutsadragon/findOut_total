const mongoose=require("mongoose");
const companySchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        unique: true,
    },
    companyName:{
        type: String,
        required:true,
        max:35,
    },
    companyId:{
        type: String,
        required: true,
        unique: true,
    },
    githubLink:{
        type: String,
        unique:true,
    },
    cbroucher:{
        type: String,
        default:"",
    },
}) ;
module.exports=mongoose.model("companyUser",companySchema);
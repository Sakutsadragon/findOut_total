const mongoose=require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        min:4,
        max:25,
        unique:true,
    },
    email:{
        type: String,
        required:true,
        max:50,
        unique:true,
    },
    password:{
        type: String,
        required:true,
        min:8,
    },
    typerole:{
        type: String,
        required:true,
    },
    isAppearance:{
        type: Boolean,
        default: false,
    },
    appearance:{
        type: String,
        default:"",
    },
}) ;
module.exports=mongoose.model("FindOutuser",userSchema);
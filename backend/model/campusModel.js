const mongoose=require("mongoose");
const campusSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        unique: true,
    },
    collageName:{
        type: String,
        required:true,
        max:35,
    },
    collageId:{
        type: String,
        required: true,
        unique: true,
    },
    nirf:{
        type: Number,
        required:true,
        max:300,
    },
    rating:{
        type: Number,
        required:true,
        max:100,
    },
    ctype:{
        type: String,
        required:true,
    },
    placementMail:{
        type: String,
        required:true,
    },
    address:{
        type: String,
        required:true,
    },
    placeBroucher:{
        type: String,
        default:"",
    },
    applied:{
        type: Array,
        default:[],  
    }
}) ;
module.exports=mongoose.model("campusUser",campusSchema);
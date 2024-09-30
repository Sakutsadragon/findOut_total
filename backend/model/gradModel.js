const mongoose=require("mongoose");
const gradSchema = new mongoose.Schema({
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
    completionYear:{
        type: String,
        required:true,
        max:50,
    },
    dtype:{
        type: String,
        required:true,
    },
    branch:{
        type: String,
        required:true,
    },
    exp:{
        type: Number,
        required:true,
    },
    jtype:{
        type: String,
        required:true,
    },
    previoussal:{
        type: Number,
    },
    skills:{
        type: Array,
        default: false,
    },
    githubLink:{
        type: String,
        default:"",
    },
    resume:{
        type: String,
        default:"",
    },
    applied:{
        type: Array,
        default:[],  
    }
}) ;
module.exports=mongoose.model("gradUser",gradSchema);
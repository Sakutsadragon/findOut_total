const mongoose=require("mongoose");
const jobSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
    },
    username:{
        type: String,
    },
    roleName:{
        type: String,
        required:true,
        max:35,
    },
    jobDescription:{
        type: String,
        required:true,
        max:50,
    },
    jtype:{
        type: String,
        required:true,
    },
    duration:{
        type: String,
    },
    location:{
        type: String,
        required:true,
    },
    stipend:{
        type: Number,
        required:true,
    },
    cgpaReq:{
        type:Number,
        required:true,
    },
    skillsReq:{
        type: Array,
        default: false,
    },
    experienceReq:{
        type: Number,
        default:0,
    },
    applicationLink:{
        type: String,
        default:"",
    },
    deadline:{
        type: String,
        default:"",
    },
    applied:{
        type: Array,
        default:[],
    }
}) ;
module.exports=mongoose.model("jobsPost",jobSchema);
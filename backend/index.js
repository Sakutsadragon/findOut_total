const express =require("express");
const cors=require("cors");
const path = require("path");
const mongoose=require("mongoose");
const userRoutes=require("./routes/userRoutes");
const  studentRoutes  = require("./routes/studentRoutes");
const  campusRoutes  = require("./routes/campusRoutes");
const  companyRoutes  = require("./routes/companyRoutes");
const  gradRoutes  = require("./routes/gradRoutes");


const app=express();



require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth",userRoutes)
app.use("/api/sro",studentRoutes)
app.use("/api/camp",campusRoutes)
app.use("/api/comp",companyRoutes)
app.use("/api/grad",gradRoutes)


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(()=>{
    console.log("DB connected Successfully!!!");
}).catch(()=>{
    console.log(err.message);
});
const server=app.listen(process.env.PORT,()=>{
    console.log(`Server is connected !!! ${process.env.PORT}`)
})
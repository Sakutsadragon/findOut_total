const compUser = require("../model/companyModel");
const jobsPost = require("../model/jobmodel");
const campPost = require("../model/onCampusModel")
const multer = require("multer");
const path = require("path"); 
module.exports.registers = async (req, res, next) => {
    try {
            const {
                userId,
                companyName,
                companyId,
                githubLink,
                cbroucher,
            } = req.body;
            console.log(req.body);
            if (!userId || !companyName || !companyId) {
                return res.status(400).json({ status: false, msg: "All required fields must be provided" });
            }
            const user = await compUser.create({
                userId,
                companyName,
                companyId,
                githubLink,
                cbroucher,
            });
    return res.json({ status: true, msg: "User registered successfully" });
    } catch (ex) {
        next(ex);
    }
};

module.exports.postJob = async(req,res,next)=>{
    try{
        const {
            userId,
            roleName,
            jobDescription,
            jtype,
            duration,
            location,
            stipend,
            cgpaReq,
            skillsReq,
            experienceReq,
            applicationLink,
            deadline,
        } = req.body;


        const user = await jobsPost.create({
                     userId,
                    roleName,
                    jobDescription,
                    jtype,
                    duration,
                    location,
                    stipend,
                    cgpaReq,
                    skillsReq,
                    experienceReq,
                    applicationLink,
                    deadline,
        });

        return res.json({ status: true, msg: "File uploaded and user registered successfully" });
    }
    catch(ex){
        next(ex);
    }
}

module.exports.updateCompany = async (req, res, next) => {
    try {
        console.log(req.body);
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ status: false, msg: err.message });
            }

            let cbroucher = req.file ? req.file.filename : undefined;

            const {
                userId,
                companyName,
                githubLink,
            } = req.body;

            const updatedFields = {
                ...(companyName && { companyName }),
                ...(githubLink && { githubLink }),
                ...(cbroucher && { cbroucher })
            };

            const user = await compUser.findOneAndUpdate({ userId }, updatedFields, { new: true });

            if (!user) {
                return res.status(404).json({ status: false, msg: "User not found" });
            }

            return res.json({ status: true, msg: "Company details updated successfully", user });
        });
    } catch (ex) {
        next(ex);
    }
};

module.exports.getdetails = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const company = await compUser.findOne({ userId: userId });

        if (!company) {
            return res.status(404).json({ status: false, msg: "Company not found" });
        }

        return res.json({ status: true, data: company });
    } catch (error) {
        next(error);
    }
};

module.exports.onCamp = async(req,res,next)=>{
    try{
        const {
            userId,
            roleName,
            jobDescription,
            jtype,
            duration,
            location,
            stipend,
            cgpaReq,
            nirfReq,
            ratingReq,
            applicationLink,
            deadline
        } = req.body;


        const user = await campPost.create({
            userId,
            roleName,
            jobDescription,
            jtype,
            duration,
            location,
            stipend,
            cgpaReq,
            nirfReq,
            ratingReq,
            applicationLink,
            deadline
        });

        return res.json({ status: true, msg: "File uploaded and user registered successfully" });
    }
    catch(ex){
        next(ex);
    }
}

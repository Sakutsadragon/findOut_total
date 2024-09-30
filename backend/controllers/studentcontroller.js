const studentUser = require("../model/studentModel");
const jobpost = require("../model/jobmodel")
const multer = require("multer");
const path = require("path");
const fs = require("fs");  
module.exports.registers = async (req, res, next) => {
    try {
            const {
                userId,
                collageName,
                completionYear,
                dtype,
                branch,
                cgpa,
                skills,
                githubLink,
                resume
            } = req.body;
            const user = await studentUser.create({
                userId,
                collageName,
                completionYear,
                dtype,
                branch,
                cgpa,
                skills,
                githubLink,
                resume
            });
            return res.json({ status: true, msg: "File uploaded and user registered successfully" });
    } catch (ex) {
        next(ex);
    }
};

module.exports.updateStudent = async (req, res, next) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ status: false, msg: err.message });
            }

            const { userId, collageName, completionYear, dtype, branch, cgpa, skills, githubLink } = req.body;
            const updateFields = { collageName, completionYear, dtype, branch, cgpa, skills, githubLink };

            if (req.file) {
                updateFields.resume = req.file.filename;
            }

            const student = await studentUser.findOneAndUpdate(
                { userId: userId },
                { $set: updateFields },
                { new: true }
            );

            if (!student) {
                return res.status(404).json({ status: false, msg: "Student not found" });
            }

            return res.json({ status: true, msg: "Student details updated successfully", student });
        });
    } catch (error) {
        next(error);
    }
};


module.exports.getdetails = async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const Student = await studentUser.findOne({ userId: userId });

        if (!Student) {
            return res.status(404).json({ status: false, msg: "Student not found" });
        }

        return res.json({ status: true, data: Student });
    } catch (error) {
        next(error);
    }
};

module.exports.loadJobs = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { page = 1, limit = 10 } = req.query; 
        const student = await studentUser.findOne({ userId });

        if (!student) {
            return res.status(404).json({ status: false, msg: "Student not found" });
        }
        const currentDate = new Date();
        const query = {
            cgpaReq: { $lte: student.cgpa },   
            skillsReq: { $in: student.skills },  
            experienceReq: {$eq: 0},
            $expr: {
                $gte: [
                  { $dateFromString: { dateString: "$deadline" } }, currentDate 
                ]
              },
            _id: { $nin: student.applied }
        };


        const jobs = await jobpost.find(query)
                                  .skip((page - 1) * limit)
                                  .limit(parseInt(limit));

        return res.json({ status: true, data: jobs });
    } catch (error) {
        next(error);
    }
};


module.exports.applyForJob = async (req, res, next) => {
    try {
        const { userId, jobId } = req.body;
        const student = await studentUser.findOne({ userId });
        if (!student) {
            return res.status(404).json({ status: false, msg: "Student not found" });
        }
        const job = await jobpost.findById(jobId);
        if (!job) {
            return res.status(404).json({ status: false, msg: "Job not found" });
        }
        if (student.applied.includes(jobId)) {
            return res.status(400).json({ status: false, msg: "Already applied for this job" });
        }
        student.applied.push(jobId);
        await student.save();
        job.applied.push(userId);
        await job.save(); 
        return res.status(200).json({ status: true, msg: "Successfully applied for the job" });
    } catch (error) {
        next(error);
    }
};



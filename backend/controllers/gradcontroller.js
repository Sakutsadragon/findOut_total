const gradUser = require("../model/gradModel");
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
                exp,
                jtype,
                previoussal,
                skills,
                githubLink,
                resume,
            } = req.body;
            const user = await gradUser.create({
                userId,
                collageName,
                completionYear,
                dtype,
                branch,
                exp,
                jtype,
                previoussal,
                skills,
                githubLink,
                resume,
            });
            return res.json({ status: true, msg: "File uploaded and user registered successfully" });

    } catch (ex) {
        next(ex);
    }
};

module.exports.getDetails = async (req, res) => {
    try {
        const user = await gradUser.findOne({ userId: req.params.userId });
        if (!user) {
            return res.status(404).json({ status: false, msg: "User not found" });
        }
        return res.json({ status: true, user });
    } catch (ex) {
        return res.status(500).json({ status: false, msg: "Server error" });
    }
};


module.exports.update = async (req, res) => {
    upload(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ status: false, msg: err.message });
        } else if (err) {
            return res.status(400).json({ status: false, msg: err.message });
        }

        const { collageName, completionYear, dtype, branch, exp, jtype, previoussal, skills, githubLink } = req.body;

        const updateData = {
            collageName,
            completionYear,
            dtype,
            branch,
            exp,
            jtype,
            previoussal,
            skills: skills.split(','),
            githubLink,
        };

        if (req.file) {
            updateData.resume = req.file.filename;
        }

        try {
            const user = await gradUser.findOneAndUpdate(
                { userId: req.params.userId },
                { $set: updateData },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({ status: false, msg: "User not found" });
            }
            return res.json({ status: true, user });
        } catch (ex) {
            return res.status(500).json({ status: false, msg: "Server error" });
        }
    });
};
const jobpost = require('../model/jobmodel');

module.exports.loadGradJobs = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { page = 1, limit = 10 } = req.query;
        
        const grad = await gradUser.findOne({ userId });

        if (!grad) {
            return res.status(404).json({ status: false, msg: "Graduate not found" });
        }

        const currentDate = new Date();
        
        const query = {
            skillsReq: { $in: grad.skills },
            experienceReq: { $lte: grad.exp }, 
            $expr: {
                $gte: [
                  { $dateFromString: { dateString: "$deadline" } }, currentDate 
                ]
              },   
            _id: { $nin: grad.applied }        
        };
        const jobs = await jobpost.find(query)
                                  .skip((page - 1) * limit)
                                  .limit(parseInt(limit));

        return res.json({ status: true, data: jobs });
    } catch (error) {
        next(error);
    }
};

module.exports.applyForGradJob = async (req, res, next) => {
    try {
        const { userId, jobId } = req.body;
        const grad = await gradUser.findOne({ userId });
        if (!grad) {
            return res.status(404).json({ status: false, msg: "Graduate not found" });
        }
        if (grad.applied.includes(jobId)) {
            return res.status(400).json({ status: false, msg: "Already applied for this job" });
        }
        grad.applied.push(jobId);
        await grad.save();
        await jobpost.findByIdAndUpdate(jobId, { $push: { applied: userId } });
        return res.json({ status: true, msg: "Job application successful" });
    } catch (error) {
        next(error);
    }
};


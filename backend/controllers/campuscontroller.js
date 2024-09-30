const campusUser = require("../model/campusModel");
const multer = require("multer");
const path = require("path");
const fs = require("fs");  
module.exports.registers = async (req, res, next) => {
    try {
            const {
                      userId,
                      collageName,
                      collageId,
                      nirf,
                      rating,
                      ctype,
                      placementMail,
                      address,
            } = req.body;

            let placeBroucher = req.file.filename;
            const user = await campusUser.create({
                      userId,
                      collageName,
                      collageId,
                      nirf,
                      rating,
                      ctype,
                      placementMail,
                      address,
                      placeBroucher,
            });
            return res.json({ status: true, msg: "File uploaded and user registered successfully" });
    } catch (ex) {
        next(ex);
    }
};


module.exports.updateCampus = async (req, res, next) => {
    try {
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ status: false, msg: err.message });
            }

            const {
                collageName,
                collageId,
                nirf,
                rating,
                ctype,
                placementMail,
                address,
            } = req.body;

            const updateData = {
                collageName,
                collageId,
                nirf,
                rating,
                ctype,
                placementMail,
                address,
            };

            if (req.file) {
                updateData.placeBroucher = req.file.filename;
            }

            const user = await campusUser.findOneAndUpdate(
                { userId: req.params.userId },
                { $set: updateData },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ status: false, msg: "Campus user not found" });
            }

            return res.json({ status: true, msg: "Details updated successfully", user });
        });
    } catch (ex) {
        next(ex);
    }
};

module.exports.getdetails = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await campusUser.findOne({ userId });
        if (!user) {
            return res.status(404).json({ status: false, msg: "User not found" });
        }
        return res.status(200).json({ status: true, user });
    } catch (error) {
        next(error); 
    }
};

const onCampusOpportunity = require('../model/onCampusModel');

module.exports.loadJobs = async (req, res) => {
    const { userId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    try {
        // Find the campus user
        const camp = await campusUser.findOne({ userId });

        if (!camp) {
            return res.status(404).json({ status: false, msg: "Campus not found" });
        }

        const currentDate = new Date();

        // Build the query
        const query = {
            nirfReq: { $gte: camp.nirf },  // Ensure nirfReq matches the campus nirf
            ratingReq: { $lte: camp.rating }, // Ensure ratingReq is less than or equal to campus rating
            $expr: {
                $gte: [
                    { $dateFromString: { dateString: "$deadline" } }, currentDate // Compare deadline with current date
                ]
            },
            _id: { $nin: camp.applied }  // Exclude already applied jobs
        };
        const jobs = await onCampusOpportunity.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        res.status(200).json({ data: jobs });
    } catch (error) {
        console.error('Error fetching jobs:', error);  // Log the actual error
        res.status(500).json({ message: 'Error fetching jobs', error });
    }
};

module.exports.applyJob = async (req, res) => {
    const { userId, jobId } = req.body;

    try {
        const job = await onCampusOpportunity.findById(jobId);
        if (!job.applied.includes(userId)) {
            job.applied.push(userId);
            await job.save();
            res.status(200).json({ status: true, message: "Successfully applied for the job!" });
        } else {
            res.status(400).json({ status: false, message: "You have already applied for this job." });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error applying for job', error });
    }
};



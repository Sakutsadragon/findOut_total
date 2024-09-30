const { registers, getDetails, update,loadGradJobs, applyForGradJob } = require("../controllers/gradcontroller")

const router=require("express").Router();

router.post("/registers",registers);
router.get("/getdetails/:userId",getDetails);
router.put("/update/:userId",update);
router.get("/jobs/:userId",loadGradJobs);
router.post("/apply",applyForGradJob);
module.exports = router;

const { registers,updateCampus,getdetails, applyJob, loadJobs  } = require("../controllers/campuscontroller")

const router=require("express").Router();

router.post("/registers",registers);
router.get("/getdetails/:userId",getdetails);
router.put("/update/:userId",updateCampus);
router.get("/jobs/:userId",loadJobs);
router.post("/apply",applyJob);



module.exports = router;

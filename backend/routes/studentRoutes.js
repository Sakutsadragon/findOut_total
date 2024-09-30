const { registers, getdetails, updateStudent, loadJobs, applyForJob } = require("../controllers/studentcontroller")

const router=require("express").Router();

router.post("/registers",registers);
router.get("/getdetails/:userId",getdetails);
router.put("/update/:userId",updateStudent);
router.get("/jobs/:userId",loadJobs);
router.post("/apply",applyForJob);


module.exports = router;

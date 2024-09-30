const { registers, postJob, getdetails,updateCompany, onCamp } = require("../controllers/companycontroller")

const router=require("express").Router();

router.post("/registers",registers);
router.post("/jobs",postJob);
router.post("/oncamp",onCamp);
router.get("/getdetails/:userId",getdetails);
router.put("/update/:userId",updateCompany);



module.exports = router;

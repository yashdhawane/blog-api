const express=require("express");
const router =express.Router();

const bloglistingcontroller = require("../controllers/blogListing.js");


//index 
router.get("/",bloglistingcontroller.index);
//new form
router.get("/new",bloglistingcontroller.new);

//post blog
router.post("/",bloglistingcontroller.create);

//show blog
router.get("/:id",bloglistingcontroller.show);

//edit blog
router.get("/:id/edit", bloglistingcontroller.edit);
//update
router.put("/:id", bloglistingcontroller.update);
//delete
router.delete("/:id", bloglistingcontroller.destroy);


module.exports=router;
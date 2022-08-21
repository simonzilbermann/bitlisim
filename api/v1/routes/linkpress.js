const router = require('express').Router();
const {LogLinkId,RegLink,GetAllLink}=require("../controller/linkpress");

router.get("/",GetAllLink);
router.post("/",RegLink);
router.get("/:Lid",LogLinkId);


module.exports=router;
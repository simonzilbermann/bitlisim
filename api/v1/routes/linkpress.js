const router = require('express').Router();
const {LogLinkId,RegLink}=require("../controller/linkpress");

router.post("/",RegLink);
router.get("/:Lid",LogLinkId);

module.exports=router;
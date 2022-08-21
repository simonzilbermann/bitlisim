const mongoose=require("mongoose");
mongoose.pluralize(null);
const LinkSchme=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    Url:String,
    Urlres:String,
    Count:Number
});
module.exports=mongoose.model("LinkPress",LinkSchme);
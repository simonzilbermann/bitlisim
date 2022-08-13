const mongoose=require("mongoose");
const Link=require("../models/linkpress");
var generator = require('generate-password');
module.exports={
    LogLinkId:(req,res)=>{
      
        Link.findOne({Urlres:req.params.Lid}).then((rows)=>{
            if(rows.length == 0)
            {
                return res.status(401).json({msg:"The link Not Found"})
            }else{
                return res.redirect(rows.Url)
            }

        });
    },



    RegLink:(req,res)=>{
        const {Url}=req.body;
        Link.find({Url}).then((rows)=>{
            if(rows.length == 0)
            {
                var short = generator.generate({
                    length: 7,
                    numbers: true
                });
                const lk = new Link({
                    _id:new mongoose.Types.ObjectId(),
                    Url:Url,
                    Urlres:short
                });
                lk.save().then((LinK)=>{
                    return res.status(200).json({msg:"Link press is : ",LinK});
                }).catch((error)=>{
                    return res.status(505).json({error});
                });              
            }
            else
            {
                Link.find({Url}).then((rows)=>{
                    return res.status(200).json(rows[0].Urlres);
                });
            }
        });                
    }
};
const mongoose=require("mongoose");
const Link=require("../models/linkpress");
module.exports={
    LogLinkId:(req,res)=>{
      
        Link.findOne({Urlres:req.params.Lid}).then((rows)=>{
            if(rows.length == 0)
            {
                return res.status(401).json({msg:"The link Not Found"})
            }
            else
            {
                return res.redirect(rows.Url);
            }

        });
    },


    RegLink:(req,res)=>{
        const {Url}=req.body;
        Link.find({Url}).then((rows)=>{
            if(rows.length == 0)
            {
               
                var short =  require('../../../functions').idcrept(7);
                Link.find({short}).then((rows)=>{
                    while(short == rows[0].Urlres)
                    {
                        short =  require('../../../functions').idcrept(7);
                    }
                    const lk = new Link({
                        _id:new mongoose.Types.ObjectId(),
                        Url:Url,
                        Urlres:short
                    });
                    lk.save().then(()=>{
                        return res.status(200).json({msg:"Link press is : ",link:short});
                    }).catch((error)=>{
                        return res.status(505).json({error});
                    }); 
                });              
            }
            else
            {
                Link.find({Url}).then((rows)=>{
                    return res.status(200).json({link:rows[0].Urlres});
                });
            }
        });                
    },

    GetAllLink:(req,res)=>{// הצגת כל המוצרים
        Link.find({}).then((link)=>{
          return res.status(200).json(link);
        });
    }
};
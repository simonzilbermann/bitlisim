module.exports={    
    idcrept: function GetStrRandom(num)
    {
        var strnew ="";
        const AZ = "ABCDEFHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        
        for(var i = num;i>0;i--)
        {
            var random = Math.floor(Math.random() * AZ.length);
            strnew +=  AZ[random];
        }
        return strnew;
    }
};
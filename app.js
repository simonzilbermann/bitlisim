//חיבור לספריי אקפרסס
const express=require('express');
//ניצור לאפליקציה מסוג אקספרס
const app = express();
const mongoose = require('mongoose');
//נוסיף מספר שכבות ביננים מובנות
const cors=require('cors');//ספרייה זו מטפלת בהרשאות הגישה ליישום
//נוסיף שכבה של לוגs
const morgan=require('morgan');
//טעינת משתני הסביבה לתוך אובייקט במערכת
require('dotenv').config();

//חיבור הראוטר של המשתמשים אל האפליקציה
const LinkPressRouter=require("./api/v1/routes/linkpress");

app.use(morgan('dev'));
//הוספת שכבת הביניים של
app.use(cors());
//נוסיף שכבה שמקבלת ומתרגמת נתונים שנשלחו בפורמט גייסון
app.use(express.json());
//נוסיף שכבה שמקבלת ומתרגמת נתונים שנשלחו בפורמט urlencoded
app.use(express.urlencoded({
    extended:false
}));

//טעינת מחרוזת ההתחברות מתוך משתנה הסביבה
const uri ="mongodb+srv://simon:yaron123@cluster0.aas0e.mongodb.net/LinkPress";
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{console.log('mongo db connected')});


app.use("/press",LinkPressRouter);
//הגדרת נקודת קצה סופית עבור שגיאת 404 כתובת לא נמצאה
app.all("*",(req,res)=>{
    res.status(404).json({msg:"404 Page not Fount"})
    });

module.exports=app;//ייצוא לאפליקציה של אקספרס
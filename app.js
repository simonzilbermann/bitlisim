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
//ספריאה המקבלת נתיבים במרחת הקבצים 
const path = require('path');//מקבלת נתיב יחסי ןמחזירה נתיב אפסולותי

const hbs = require('hbs');
//רישום ספריית התבניות החלקיות במערכת
hbs.registerPartials(path.join(__dirname,'views/partials'));

//חיבור הראוטר של המשתמשים אל האפליקציה
const LinkPressRouter=require("./api/v1/routes/linkpress");
//אגדרה של תיקיאה שתחיל את תבניות האיצוב לדפים
app.set('views', path.join(__dirname,'views'));//מחילה את מסתרפגים שלי
//מנואה תצוגות של תפלאתים
app.set('view engine','hbs');

app.get('/',(req,res)=>{
    res.render('index',{
        list:'List URL'
    });
});

app.get('/pres',(req,res)=>{
    res.render('ListUrl',{

    });
});



app.use(morgan('dev'));
//הוספת שכבת הביניים של
app.use(cors());
//נוסיף שכבה שמקבלת ומתרגמת נתונים שנשלחו בפורמט גייסון
app.use(express.json());
//נוסיף שכבה שמקבלת ומתרגמת נתונים שנשלחו בפורמט urlencoded
app.use(express.urlencoded({
    extended:false
}));
//הגדרת תיקייה לקבצים סטאטיים
app.use(express.static('public'));//קבצים שאינם עוברים עיבוד בשרת

//טעינת מחרוזת ההתחברות מתוך משתנה הסביבה
const uri ="mongodb+srv://simon:yaron123@cluster0.aas0e.mongodb.net/LinkPress";
mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{console.log('mongo db connected')});


app.use("/press",LinkPressRouter);
//הגדרת נקודת קצה סופית עבור שגיאת 404 כתובת לא נמצאה
app.all("*",(req,res)=>{
    res.status(404).json({msg:"404 Page not Fount"})
    });

module.exports=app;//ייצוא לאפליקציה של אקספרס
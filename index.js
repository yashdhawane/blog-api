const express = require('express');
const app=express();
const mongoose = require('mongoose');
const path= require('path')
app.use(express.urlencoded({ extended: true })); 
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const session =require("express-session");
const flash = require('connect-flash');
const BloglistingsRouter= require("./routes/bloglisting.js");



app.engine('ejs', ejsMate);
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

const sessionOptions={
    secret:"secretstring",
    resave:false,
    saveUninitialized:true,
    cookie:{
      expires:Date.now()+7*24*60*1000,
      maxAge:7*24*60*1000,
      httpOnly:true, 
    }
  };
  
  app.use(session(sessionOptions));
  app.use(flash());


  app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
  });


main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/blog-api');

}
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use("/bloglisting",BloglistingsRouter);


app.get("/",(req,res)=>{
    res.send("working")
});


app.listen(3000,()=>{
    console.log("server  is listening")
});
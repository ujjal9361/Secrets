//Importing modules
const express=require('express');
const mongoose=require('mongoose');

//Bcrypt config
const bcrypt=require('bcrypt');//Module for hash 
const saltRounds=10;

//Importing models
const User=require("./models/user.js")


//Initializing app variable
const app=express();

//Middlewares definition
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));

//Mongoose setup
mongoose.set('strictQuery','false');
mongoose.connect("mongodb://localhost:27017/userDB",{useNewUrlParser:true});


//Variables definiton
const port=process.env.PORT || 3000;


//Different Routes

//Home route
app.route("/")
    .get((req,res)=>{
        res.render("home");
        })

//Login route
app.route("/login")
        .get((req,res)=>{
            res.render("login");
            })
        .post((req,res)=>{
            User.findOne({username:req.body.username},(err,foundUser)=>{
                if(foundUser){
                    bcrypt.compare(req.body.password,foundUser.password,(err,result)=>{
                        if(result){
                                res.render("secrets")
                            }
                            else{
                                res.send("Incorrect password.")
                            }
                    })
                }
                else{   
                res.send('Email doesnot exist. Register first');
                }
            })
            
        })

//Register route
app.route("/register")
            .get((req,res)=>{
                res.render("register");
                })
            .post((req,res)=>{
                User.findOne({username:req.body.username},(err,foundUser)=>{
                    if(foundUser){
                        res.send("Email already exists..Log in to use your existing email");
                    }
                    else{
                        bcrypt.hash(req.body.password,saltRounds,(err,hash)=>{
                            const newUser=new User({
                                username:req.body.username,
                                password:hash
                            })
                                newUser.save();
                                res.render("secrets");
                        })
                        
                    }
                })
            })

//Setting up the port
app.listen(port,()=>{
    console.log(`Server listening at port ${port}: http://localhost:${port}`)
})

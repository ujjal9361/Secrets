//Importing modules
const express=require('express');
const mongoose=require('mongoose');

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
                    User.findOne({username:req.body.username,password:req.body.password},(err,fetchedUser)=>{
                        if(fetchedUser){
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
                        const newUser=new User({
                            username:req.body.username,
                            password:req.body.password
                        })
                        newUser.save();
                        res.render("secrets");
                    }
                })
            })

//Setting up the port
app.listen(port,()=>{
    console.log(`Server listening at port ${port}: http://localhost:${port}`)
})

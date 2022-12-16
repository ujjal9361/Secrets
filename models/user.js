require('dotenv').config();//For using environment variables

const mongoose=require('mongoose');
const md5=require('md5');


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const User=mongoose.model("User",userSchema);

module.exports=User;
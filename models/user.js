require('dotenv').config();//For using environment variables

const mongoose=require('mongoose');
const encrypt=require('mongoose-encryption');


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
const secret=process.env.SECRET;
userSchema.plugin(encrypt,{secret:secret,encryptedFields:['password']})
const User=mongoose.model("User",userSchema);

module.exports=User;
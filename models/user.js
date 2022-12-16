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
const secret="CLB35AF059";
userSchema.plugin(encrypt,{secret:secret,encryptedFields:['password']})
const User=mongoose.model("User",userSchema);

module.exports=User;
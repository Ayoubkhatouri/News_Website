import mongoose from "mongoose";
import bcrypt from 'bcryptjs'


const userSchema=mongoose.Schema({
     nom:{
        type:String,
        required:true
     },
     email:{
        type:String,
        required:true,
        unique:true
     },
     password:{
        type:String,
        required:true
     },
     isAdmin:{
        type:Boolean,
        required:true,
        default:false
     },
     isauthor:{
        type:Boolean,
        required:true,
        default:false
     },
},{
    timestamps:true //with mongoose it will create the createdat and updated at fields automatically
})


//we make a function here to check the password
userSchema.methods.matchPassword = async function (enteredPassword){ //we call it matchPassword
   return await bcrypt.compare(enteredPassword,this.password) //this is the user in userController
}


const User=mongoose.model('User',userSchema) //after schema we create a model of our user

export default User
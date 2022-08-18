import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'



const protect =asyncHandler( async(req,resp,next)=>{
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
       try {

        token =req.headers.authorization.split(" ")[1]
         const decoded=jwt.verify(token,process.env.JWT_SECRET)
         req.user=await User.findById(decoded.id).select('-password')
         next()
       } catch (error) {
        console.log(error)
        resp.status(401)
        throw new Error('Vous n\'avez pas l\'accès , token failed')
        
       }
    }
    if(!token){
        resp.status(401)
        throw new Error('Vous n\'avez pas l\'accès, no token')
    }
})

const admin=(req,resp,next)=>{
    if(req.user && req.user.isAdmin){
        next() //next means success
    }
    else {
        resp.status(401)
        throw new Error('Seulement l\'admin qui a l\'autorisation')
    }
}

const adminOrAuthor=(req,resp,next)=>{
    if(req.user && (req.user.isAdmin || req.user.isauthor)){
        next() //next means success
    }
    else {
        resp.status(401)
        throw new Error('Seulement l\'admin et les journalistes qui ont l\'autorisation')
    }
}


export {
    protect,
    admin,
    adminOrAuthor,  
}
import User from '../models/userModel.js'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken' 
import bcrypt from 'bcryptjs'


//@desc Auth user && get token
//@route Post /api/users/login
//@access Public 
export const authUser=asyncHandler(async(req,resp)=>{
   const {email,password}=req.body //we get this from the form input 

    const user =await User.findOne({email:email}) // this from database

    if(user && await user.matchPassword(password)){
        resp.json({
            _id:user._id,
            nom:user.nom,
            email:user.email,
            isAdmin:user.isAdmin,
            isauthor:user.isauthor,
            token:genarateToken(user._id)
        })
    }
    else {
        resp.status(401)
        throw new Error('Erreur dans email ou password')
    }
})

//register user
export const registerUser=asyncHandler(async(req,resp)=>{
    const {nom,email,password}=req.body

    const userExists =await User.findOne({email:email})
    if(userExists){
        resp.status(400)
        throw new Error('L\'utilisateur existe déjà')
    }

    //hashing password
    const salt =await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(password,salt)

    const user=await User.create({
        nom,
        email,
        password:hashedPassword
    })

    if(user){
        resp.status(201).json({
            _id:user._id,
            nom:user.nom,
            email:user.email,
            isAdmin:user.isAdmin,
            isauthor:user.isauthor,
            token:genarateToken(user._id)
        })
    }
    else{
        resp.status(400)
        throw new Error('Les informations ne sont pas valide')
    }
})



 //@desc    Update user profile
//@route    PUT /api/users/profile
//@access PRIVATE 
export const updateUserProfile=asyncHandler(async(req,resp)=>{ //we get the user profile from the token 
    //cause we send the id in the token 
const user=await User.findById(req.user._id)
if(user){
 user.nom=req.body.nom || user.nom //we check what we wanna change
 user.email=req.body.email || user.email
 if(req.body.password){
    //first lets hash the passsword
const salt=await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(req.body.password,salt)
user.password=hashedPassword
 }
 const updatedUser=await user.save()
 resp.json({
    _id:updatedUser._id,
    nom:updatedUser.nom,
    email:updatedUser.email,
    isAdmin:updatedUser.isAdmin,
    token:genarateToken(updatedUser._id)
})

}
else {
    resp.status(404) 
throw new Error('User not found')
}
})


 //@desc    Get all users
//@route    GET /api/users/
//@access PRIVATE /admin
export const getAllUsers=asyncHandler(async(req,resp)=>{
    const users=await User.find({})
    resp.json(users)
})


 //@desc    Delete a user
//@route    DELETE /api/users/
//@access PRIVATE /admin

    export const deleteUser=asyncHandler(async(req,resp)=>{ 
        const user=await User.findById(req.params.id)
        if(user){
            await user.remove()
            resp.json({message:'Utilisateur a été supprimer'})
        }
        else{
            resp.status(404)
            throw new Error('L\'utilisateur n\'exist pas')
        }
})



//@desc    Update user 
//@route    PUT /api/users/:id
//@access PRIVATE /admin 
export const updateUser=asyncHandler(async(req,resp)=>{ //we get the user profile from the token 
    //cause we send the id in the token 
const user=await User.findById(req.params.id)
if(user){
    user.nom=req.body.nom || user.nom //we check what we wanna change
    user.email=req.body.email || user.email
    if(req.body.isAdmin === false || req.body.isAdmin ===true)
    user.isAdmin=req.body.isAdmin 
    else
    user.isAdmin=user.isAdmin  

    if(req.body.isauthor === false || req.body.isauthor ===true)
    user.isauthor=req.body.isauthor 
    else
    user.isauthor=user.isauthor   


const updatedUser=await user.save()
resp.json({
    _id:updatedUser._id,
    nom:updatedUser.nom,
    email:updatedUser.email,
    isAdmin:updatedUser.isAdmin,
    isauthor:updatedUser.isauthor
})
}
else {
resp.status(404) 
throw new Error('L\'utilisateur n\'exist pas')
}
})


//@desc GET by Id
//@route    GET /api/users/:id
//@access PRIVATE/Admin
export const getUserById=asyncHandler(async(req,resp)=>{ 
    const user=await User.findById(req.params.id).select('-password')
    if(user)
        resp.json(user)
    else 
    resp.status(404)
        throw new Error('L\'utilisateur n\'exist pas')
    })





//Generate a token 
const genarateToken=(id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET ,{expiresIn : '30d'})
}
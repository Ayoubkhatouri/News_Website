import axios from "axios";


//Login user
const login=async(userdata)=>{

    const {data}=await axios.post('/api/users/abonnez',userdata)//data here is {email,password}
    if(data){
        localStorage.setItem('userLogin',JSON.stringify(data))
    }
    return data
}

//Register user
const register=async(userdata)=>{

    const {data}=await axios.post('/api/users/register',userdata)//data here is {nom,email,password}
    if(data){
        localStorage.setItem('userLogin',JSON.stringify(data))
    }
    return data
}


//Update User Profile
const updateUser=async(userdata,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const {data}=await axios.put('/api/users/profile',userdata,config)
    if(data)
    localStorage.setItem('userLogin',JSON.stringify(data))
    return data
}

//get all Users Profile
const getAllUsers=async(token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const {data}=await axios.get('/api/users',config)

    return data
}

//Delete User
const deleteUser=async(id,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    await axios.delete(`/api/users/${id}`,config)
}

//Update User
const adminUpdateUser=async(user,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
   const {data} =await axios.put(`/api/users/${user.id}`,user,config)
   return data
}


//get user details
const getUserDetails=async(id,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const {data}=await axios.get(`/api/users/${id}`,config)
    return data
}





const userService={
    login,
    register,
    updateUser,
    getAllUsers,
    deleteUser,
    adminUpdateUser,
    getUserDetails
}

export default userService
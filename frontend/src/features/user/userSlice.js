import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import userService from './userService'


//get the user from local storage
const userLogin=JSON.parse(localStorage.getItem('userLogin'))

const initialState={
    userLogin:userLogin ? userLogin : null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
    userUpdateInfo:{
     isErrorUpdate:false,
    isSuccessUpdate:false,
    isLoadingUpdate:false,
    messageUpdate:''
    },
    AllUsersInfo:{
        AllUsers:[],
        isErrorAllUsers:false,
       isSuccessAllUsers:false,
       isLoadingAllUsers:false,
       messageAllUsers:''
    },
    deleteUserInfo:{
        SuccessDelete:false,    
        LoadingDelete:false,
        ErrorDelete:false,
        messageDelete:''
    },
    UserDetailsInfo:{
        userDetails:{},
        SuccessgetUserDetails:false,    
        LoadinggetUserDetails:false,
        ErrorgetUserDetails:false,
        messagegetUserDetails:''
    },
    
}

//login user
export const login=createAsyncThunk('user/login',async(userData,thunkAPI)=>{
    try {
        return await userService.login(userData) //userData={email,password}
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})


//register user
export const register=createAsyncThunk('user/register',async(userData,thunkAPI)=>{
    try {
        return await userService.register(userData) //userData={nom,email,password}
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//Update User Profile
export const updateUser=createAsyncThunk('user/update',async(userdata,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().user.userLogin.token
        return await userService.updateUser(userdata,token)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

//Update User Profile
export const getAllUsers=createAsyncThunk('users/getAll',async(_,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().user.userLogin.token
        return await userService.getAllUsers(token)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})

//Delete User
export const deleteUser=createAsyncThunk('delete/user',async(id,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().user.userLogin.token
         await userService.deleteUser(id,token)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})


//Update User
export const adminUpdateUser=createAsyncThunk('adminupdate/user',async(user,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().user.userLogin.token
       return  await userService.adminUpdateUser(user,token)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)

    }
})


//get user profile
export const getUserDetails=createAsyncThunk('user/details',async(id,thunkAPI)=>{
    try {
        const token=thunkAPI.getState().user.userLogin.token
        return await userService.getUserDetails(id,token)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})





export const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        reset:(state)=>{}
    },
    extraReducers:(builder)=>{
        builder
        .addCase(login.pending,(state)=>{
        state.isLoading=true
    })
        .addCase(login.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess= true       
        state.userLogin=action.payload 
    })
        .addCase(login.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.message=action.payload
        state.userLogin=null
    })

///////////////////////////////////

    .addCase(register.pending,(state)=>{
        state.isLoading=true
    })
        .addCase(register.fulfilled,(state,action)=>{
        state.isLoading=false
        state.isSuccess= true       
        state.userLogin=action.payload 
    })
        .addCase(register.rejected,(state,action)=>{
        state.isLoading=false
        state.isError=true
        state.message=action.payload
        state.userLogin=null
    })

/////////////////////////
    .addCase(updateUser.pending,(state)=>{
        state.userUpdateInfo.isLoadingUpdate=true
    })
        .addCase(updateUser.fulfilled,(state,action)=>{
        state.userUpdateInfo.isLoadingUpdate=false
        state.userUpdateInfo.isSuccessUpdate= true       
        state.userLogin=action.payload 
        state.userUpdateInfo.messageUpdate="Les Modifications ont été effectuées avec succès"
    })
        .addCase(updateUser.rejected,(state,action)=>{
        state.userUpdateInfo.isLoadingUpdate=false
        state.userUpdateInfo.isErrorUpdate=true
        state.userUpdateInfo.messageUpdate=action.payload 
    })
        


    /////////////////////////
    .addCase(getAllUsers.pending,(state)=>{
        state.AllUsersInfo.isLoadingAllUsers=true
    })
        .addCase(getAllUsers.fulfilled,(state,action)=>{
        state.AllUsersInfo.isLoadingAllUsers=false
        state.AllUsersInfo.isSuccessAllUsers= true       
        state.AllUsersInfo.AllUsers=action.payload 
     
    })
        .addCase(getAllUsers.rejected,(state,action)=>{
        state.AllUsersInfo.isLoadingAllUsers=false
        state.AllUsersInfo.isErrorAllUsers=true
        state.AllUsersInfo.messageAllUsers=action.payload 
    })


       
    .addCase(deleteUser.pending,(state)=>{
        state.deleteUserInfo.LoadingDelete=true
    })
        .addCase(deleteUser.fulfilled,(state,action)=>{
        state.deleteUserInfo.LoadingDelete=false
        state.deleteUserInfo.SuccessDelete= true       

    })
        .addCase(deleteUser.rejected,(state,action)=>{
            state.deleteUserInfo.LoadingDelete=false
            state.deleteUserInfo.ErrorDelete= true  
            state.deleteUserInfo.messageDelete=action.payload 
    })


/////////////////////////
.addCase(adminUpdateUser.pending,(state)=>{
    state.userUpdateInfo.isLoadingUpdate=true
})
    .addCase(adminUpdateUser.fulfilled,(state,action)=>{
    state.userUpdateInfo.isLoadingUpdate=false
    state.userUpdateInfo.isSuccessUpdate= true       
    state.userUpdateInfo.messageUpdate="Les Modifications ont été effectuées avec succès"
})
    .addCase(adminUpdateUser.rejected,(state,action)=>{
    state.userUpdateInfo.isLoadingUpdate=false
    state.userUpdateInfo.isErrorUpdate=true
    state.userUpdateInfo.messageUpdate=action.payload 
})
    
/////////////////////////
.addCase(getUserDetails.pending,(state)=>{
    state.UserDetailsInfo.LoadinggetUserDetails=true
})
    .addCase(getUserDetails.fulfilled,(state,action)=>{
    state.UserDetailsInfo.LoadinggetUserDetails=false
    state.UserDetailsInfo.SuccessgetUserDetails= true       
    state.UserDetailsInfo.userDetails=action.payload
})
    .addCase(getUserDetails.rejected,(state,action)=>{
    state.UserDetailsInfo.LoadinggetUserDetails=false
    state.UserDetailsInfo.ErrorgetUserDetails=true
    state.UserDetailsInfo.messagegetUserDetails=action.payload 
})

        }
    })



export const {reset}=userSlice.actions
export default userSlice.reducer
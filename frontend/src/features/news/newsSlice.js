import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import newsService from './newsService'

const initialState={

    allnewsInfo:{
        allnews:[],
        allnewsLoading:false,
        allnewsError:false,
        allnewsSucces:false,
        allnewsMessageError:'',
    },
    singleNewsInfo:{
        singleNews:{},
        singleNewsLoading:false,
        singleNewsError:false,
        singleNewsSucces:false,
        singleNewsMessageError:'',
    },
    createNewsInfo:{
        Loadingcreate:false,
        Errorcreate:false,
        messagecreate:'',
        Successcreate:false
    },
    updateNewsInfo:{
        NewNews:{},
        Loadingupdate:false,
        Errorupdate:false,
        messageupdate:'',
        Successupdate:false,
        addedLike:false,
        addedDisLike:false
    },
    updateNewsInfo2:{
        NewNews2:{},
        Loadingupdate2:false,
        Errorupdate2:false,
        messageupdate2:'',
        Successupdate2:false,
        addedLike2:false,
        addedDisLike2:false
    },
    deleteNewsInfo:{
        Loadingdelete:false,
        Errordelete:false,
        messagedelete:'',
        Successdelete:false
    },
    NewsInCrouselInfo:{
        allnews:[],
        allnewsLoading:false,
        allnewsError:false,
        allnewsSucces:false,
        allnewsMessageError:'',
    },
    allLastDayNewsInfo:{
      LastDayNews:[],
      LastDayNewsLoading:false,
      LastDayNewsError:false,
      LastDayNewsSucces:false,
      LastDayNewsMessageError:'',
    },
    commentAddInfo:{
        SuccessAdd:false,
        LoadingAdd:false,
        ErrorAdd:false,
        messageErrorAdd:''
    },

   
}


//get all news
export const listAllNews=createAsyncThunk('news/getAll',async(keyword,thunkAPI)=>{
    try {
        return await newsService.listAllNews(keyword)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get a single news
export const listSingleNews=createAsyncThunk('news/getSingle',async(id,thunkAPI)=>{
    try {
        return await newsService.listSingleNews(id)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


//create a news
export const createNews=createAsyncThunk('news/create',async(news,thunkAPI)=>{
    try {
         await newsService.createNews(news,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//update a news
export const updateNews=createAsyncThunk('news/update',async(news,thunkAPI)=>{
    try {
        await newsService.updateNews(news,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})
//delete a news
export const deleteNews=createAsyncThunk("/news/delete",async(id,thunkAPI)=>{
    try {
        await newsService.deleteNews(id,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//add a Like
export const addLike=createAsyncThunk("/news/addLike",async(id,thunkAPI)=>{
    try {
     
     return await newsService.addLike(id,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//delete a news
export const addDislike=createAsyncThunk("/news/addDisLike",async(id,thunkAPI)=>{
    try {
        
     return await newsService.addDislike(id,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



//add a Like Single News Page
export const addLike2=createAsyncThunk("/news/addLike2",async(id,thunkAPI)=>{
    try {
     
     return await newsService.addLike2(id,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//delete a Dislike  Single News Page
export const addDislike2=createAsyncThunk("/news/addDisLike2",async(id,thunkAPI)=>{
    try {
        
     return await newsService.addDislike2(id,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get all news
export const getNewsCarousel=createAsyncThunk('news/getNewsCarousel',async(_,thunkAPI)=>{
    try {
        return await newsService.getNewsCarousel()
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//get all news in the last day
export const getDayNews=createAsyncThunk('news/lastDay',async(_,thunkAPI)=>{
    try {
        return await newsService.getDayNews()
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//add a commnet
export const NewsAddCommnet=createAsyncThunk('news/comment',async(comment_AndID_News,thunkAPI)=>{
    try {
         await newsService.NewsAddCommnet(comment_AndID_News,thunkAPI)
    } catch (error) {
        const message=(error.response &&  error.response.data && error.response.data.message) 
        || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})





export const newsSlice=createSlice({
    name:'news',
    initialState,
    reducers:{
        reset1:(state)=>{
            state.createNewsInfo={
            Loadingcreate:false,
            Successcreate:false,
            Errorcreate:false,
            messagecreate:''
        }
        state.updateNewsInfo={
            NewNews:{},
            Loadingupdate:false,
            Successupdate:false,
            Errorupdate:false,
            messageupdate:'',
            addedLike:false,
            addedDisLike:false
        }
        state.updateNewsInfo2={
            NewNews2:{},
            Loadingupdate2:false,
            Successupdate2:false,
            Errorupdate2:false,
            messageupdate2:'',
            addedLike2:false,
            addedDisLike2:false
        }
      
        state.deleteNewsInfo={
            Loadingdelete:false,
            Successdelete:false,
            Errordelete:false,
            messagedelete:''
        }
     
    },
    reset2:(state)=>{
        state.singleNewsInfo={
            singleNews:{},
            singleNewsLoading:false,
            singleNewsError:false,
            singleNewsSucces:false,
            singleNewsMessageError:'',
        }
    },
    reset3:(state)=>{
state.commentAddInfo={
    SuccessAdd:false,
    LoadingAdd:false,
    ErrorAdd:false,
    messageErrorAdd:''
}
    }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(listAllNews.pending,(state)=>{
            state.allnewsInfo.allnewsLoading=true
        })
        .addCase(listAllNews.fulfilled,(state,action)=>{
             state.allnewsInfo.allnewsLoading=false
             state.allnewsInfo.allnewsSucces=true
             state.allnewsInfo.allnews=action.payload 
        })
        .addCase(listAllNews.rejected,(state,action)=>{
             state.allnewsInfo.allnewsLoading=false
             state.allnewsInfo.allnewsError=true
             state.allnewsInfo.allnewsMessageError=action.payload 
        })
///////////////////////////////
        .addCase(listSingleNews.pending,(state)=>{
            state.singleNewsInfo.singleNewsLoading=true
        })
        .addCase(listSingleNews.fulfilled,(state,action)=>{
            state.singleNewsInfo.singleNewsLoading=false
            state.singleNewsInfo.singleNewsSucces=true
            state.singleNewsInfo.singleNews=action.payload 
        })
        .addCase(listSingleNews.rejected,(state,action)=>{
            state.singleNewsInfo.singleNewsLoading=false
            state.singleNewsInfo.singleNewsError=true
            state.singleNewsInfo.singleNewsMessageError=action.payload 
        })

        .addCase(createNews.pending,(state)=>{
            state.createNewsInfo.Loadingcreate=true
        })
            .addCase(createNews.fulfilled,(state,action)=>{
            state.createNewsInfo.Loadingcreate=false
            state.createNewsInfo.Successcreate= true       
        })
            .addCase(createNews.rejected,(state,action)=>{
                state.createNewsInfo.Loadingcreate=false
                state.createNewsInfo.Errorcreate= true  
                state.createNewsInfo.messagecreate=action.payload 
        })


        .addCase(updateNews.pending,(state)=>{
            state.updateNewsInfo.Loadingupdate=true
        })
            .addCase(updateNews.fulfilled,(state,action)=>{
            state.updateNewsInfo.Loadingupdate=false
            state.updateNewsInfo.Successupdate= true 
        
        })
            .addCase(updateNews.rejected,(state,action)=>{
                state.updateNewsInfo.Loadingupdate=false
                state.updateNewsInfo.Errorupdate= true  
                state.updateNewsInfo.messageupdate=action.payload   
        })


        .addCase(deleteNews.pending,(state)=>{
            state.deleteNewsInfo.Loadingdelete=true
        })
            .addCase(deleteNews.fulfilled,(state,action)=>{
            state.deleteNewsInfo.Loadingdelete=false
            state.deleteNewsInfo.Successdelete= true 
        
        })
            .addCase(deleteNews.rejected,(state,action)=>{
                state.deleteNewsInfo.Loadingdelete=false
                state.deleteNewsInfo.Errordelete= true  
                state.deleteNewsInfo.messagedelete=action.payload   
        })


        .addCase(addLike.pending,(state)=>{
            state.updateNewsInfo.Loadingupdate=true
        })
            .addCase(addLike.fulfilled,(state,action)=>{
                state.updateNewsInfo.NewNews=action.payload
            state.updateNewsInfo.Loadingupdate=false
            state.updateNewsInfo.Successupdate= true 
            state.updateNewsInfo.addedLike= true 
        })
            .addCase(addLike.rejected,(state,action)=>{
                state.updateNewsInfo.Loadingupdate=false
                state.updateNewsInfo.Errorupdate= true  
                state.updateNewsInfo.messageupdate=action.payload 
        })


        
        .addCase(addDislike.pending,(state)=>{
            state.updateNewsInfo.Loadingupdate=true
        })
            .addCase(addDislike.fulfilled,(state,action)=>{
        state.updateNewsInfo.NewNews=action.payload
            state.updateNewsInfo.Loadingupdate=false
            state.updateNewsInfo.Successupdate= true 
            state.updateNewsInfo.addedDisLike= true 
        
        })
            .addCase(addDislike.rejected,(state,action)=>{
                state.updateNewsInfo.Loadingupdate=false
                state.updateNewsInfo.Errorupdate= true  
                state.updateNewsInfo.messageupdate=action.payload   
        })


        .addCase(addLike2.pending,(state)=>{
           
            state.updateNewsInfo2.Loadingupdate2=true
        })
            .addCase(addLike2.fulfilled,(state,action)=>{
               
            state.updateNewsInfo2.NewNews2=action.payload
            state.updateNewsInfo2.Loadingupdate2=false
            state.updateNewsInfo2.Successupdate2= true 
            state.updateNewsInfo2.addedLike2= true 
        })
            .addCase(addLike2.rejected,(state,action)=>{
                
                state.updateNewsInfo2.Loadingupdate2=false
                state.updateNewsInfo2.Errorupdate2= true  
                state.updateNewsInfo2.messageupdate2=action.payload 
        })


        .addCase(addDislike2.pending,(state)=>{
            state.updateNewsInfo2.Loadingupdate2=true
        })
            .addCase(addDislike2.fulfilled,(state,action)=>{
  
            state.updateNewsInfo2.NewNews2=action.payload
            state.updateNewsInfo2.Loadingupdate2=false
            state.updateNewsInfo2.Successupdate2= true 
            state.updateNewsInfo2.addedDisLike2= true 
        
        })
            .addCase(addDislike2.rejected,(state,action)=>{
               
                state.updateNewsInfo2.Loadingupdate2=false
                state.updateNewsInfo2.Errorupdate2= true  
                state.updateNewsInfo2.messageupdate2=action.payload 
        })


        .addCase(getNewsCarousel.pending,(state)=>{
            state.NewsInCrouselInfo.allnewsLoading=true
        })
        .addCase(getNewsCarousel.fulfilled,(state,action)=>{
             state.NewsInCrouselInfo.allnewsLoading=false
             state.NewsInCrouselInfo.allnewsSucces=true
             state.NewsInCrouselInfo.allnews=action.payload 
        })
        .addCase(getNewsCarousel.rejected,(state,action)=>{
             state.NewsInCrouselInfo.allnewsLoading=false
             state.NewsInCrouselInfo.allnewsError=true
             state.NewsInCrouselInfo.allnewsMessageError=action.payload 
        })


        .addCase(getDayNews.pending,(state)=>{
            state.allLastDayNewsInfo.LastDayNewsLoading=true
        })
        .addCase(getDayNews.fulfilled,(state,action)=>{
             state.allLastDayNewsInfo.LastDayNewsLoading=false
             state.allLastDayNewsInfo.LastDayNewsSucces=true
             state.allLastDayNewsInfo.LastDayNews=action.payload 
        })
        .addCase(getDayNews.rejected,(state,action)=>{
             state.allLastDayNewsInfo.LastDayNewsLoading=false
             state.allLastDayNewsInfo.LastDayNewsError=true
             state.allLastDayNewsInfo.LastDayNewsMessageError=action.payload 
        })



        .addCase(NewsAddCommnet.pending,(state)=>{
            state.commentAddInfo.LoadingAdd=true
        })
            .addCase(NewsAddCommnet.fulfilled,(state,action)=>{
            state.commentAddInfo.LoadingAdd=false
            state.commentAddInfo.SuccessAdd= true       
        })
            .addCase(NewsAddCommnet.rejected,(state,action)=>{
                state.commentAddInfo.LoadingAdd=false
                state.commentAddInfo.ErrorAdd= true  
                state.commentAddInfo.messageErrorAdd=action.payload
        })

    }
})


export const {reset1,reset2,reset3}=newsSlice.actions
export default newsSlice.reducer
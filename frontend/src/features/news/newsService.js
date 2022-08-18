import axios from 'axios'


//get all news
const listAllNews=async(keyword)=>{
    let response
    if(keyword)
    response=await  axios.get(`/api/news?keyword=${keyword}`)
    else
    response=await axios.get('/api/news/')
    return response.data
}

//get a single news by id
const listSingleNews=async(id)=>{
    const {data}=await axios.get(`/api/news/${id}`)
    return data
}


//create a news
const createNews=async(news,thunkAPI)=>{
    //get user info
    const state=thunkAPI.getState()
    const userLogin=state.user.userLogin
 
    const config={
       headers:{
          Authorization:`Bearer ${userLogin.token}`
       }
    }
 
    await axios.post(`/api/news`,news,config)
   
 }

 //update News
 const updateNews=async(news,thunkAPI)=>{
    const state=thunkAPI.getState()
    const userLogin=state.user.userLogin

    const config={
        headers:{
            Authorization:`Bearer ${userLogin.token}`
        }
    }

    await axios.put(`/api/news/${news._id}`,news,config)
 }

 //delete News
 const deleteNews=async(id,thunkAPI)=>{
    const state=thunkAPI.getState()
    const userLogin=state.user.userLogin
    
    const config={
        headers:{
            Authorization:`Bearer ${userLogin.token}`
        }
    }
    await axios.delete(`/api/news/${id}`,config)
 }

  //add Like 
  const addLike=async(id,thunkAPI)=>{
    const state=thunkAPI.getState()
    const userLogin=state.user.userLogin
  
    const config={
        headers:{
            Authorization:`Bearer ${userLogin.token}`
        }
    }
    const response= await axios.post(`/api/news/${id}/like`,{},config)
    return response.data
 }

 //add disLike 
 const addDislike=async(id,thunkAPI)=>{
    const state=thunkAPI.getState()
    const userLogin=state.user.userLogin

    const config={
        headers:{
            Authorization:`Bearer ${userLogin.token}`
        }
    }
  const response= await axios.post(`/api/news/${id}/disLike`,{},config)
  return response.data
 }


 //add Like 2
 const addLike2=async(id,thunkAPI)=>{
    const state=thunkAPI.getState()
    const userLogin=state.user.userLogin
  
    const config={
        headers:{
            Authorization:`Bearer ${userLogin.token}`
        }
    }
    const response= await axios.post(`/api/news/${id}/like`,{},config)
    return response.data
 }

 //add disLike 
 const addDislike2=async(id,thunkAPI)=>{
    const state=thunkAPI.getState()
    const userLogin=state.user.userLogin

    const config={
        headers:{
            Authorization:`Bearer ${userLogin.token}`
        }
    }
  const response= await axios.post(`/api/news/${id}/disLike`,{},config)
  return response.data
 }


 //get all news in carousel
const getNewsCarousel=async()=>{
    const response=await axios.get('/api/news/carousel')
    return response.data
}

 //get all news in last day
 const getDayNews=async()=>{
    const response=await axios.get('/api/news/day')
    return response.data
}

//add a comment
const NewsAddCommnet=async(comment_AndID_News,thunkAPI)=>{
    //get user info
    const state=thunkAPI.getState()
    const userLogin=state.user.userLogin
 
    const config={
       headers:{
          Authorization:`Bearer ${userLogin.token}`
       }
    }
 
  await axios.post(`/api/news/${comment_AndID_News.NewsId}/comments`,comment_AndID_News,config)
 }


const newsService={
    listAllNews,
    listSingleNews,
    createNews,
    updateNews,
    deleteNews,
    addLike,
    addDislike,
    addLike2,
    addDislike2,
    getNewsCarousel,
    getDayNews,
    NewsAddCommnet
}

export default newsService
import React,{useEffect} from 'react'
import SingleNewsVideos from '../components/SingleNewsVideos'
import { useDispatch ,useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { listAllNews } from '../features/news/newsSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import SearchBox from '../components/SearchBox'
const NewsVideoScreen = () => {
     
  const dispatch=useDispatch()
  const params=useParams()
  const {allnewsError,allnewsSucces,allnewsLoading,allnewsMessageError,allnews}=useSelector(state=>state.news.allnewsInfo)
  
  const allVideosNews=allnews.filter(n=>n.isVideo && n.publié)

  const keyword=params.keyword
  useEffect(()=>{
   dispatch(listAllNews(keyword))
  },[dispatch,keyword])



  if (allnewsLoading)
  return <Loader/>

  return (
    <div>
        <div className='myDivSearch'>
        <h3 className='titleOfNews'>VIDEOS NEWS</h3>
        <SearchBox className='myBoxSearch' />
        </div>
      {allnewsError ? <Message variant='danger'>{allnewsMessageError}</Message> : (
         <div className="imgs-container">
      {allVideosNews.map((news)=>(
       <SingleNewsVideos key={news._id} news={news}/>
      ))}
</div>
      )}
    </div>
  )
}

export default NewsVideoScreen

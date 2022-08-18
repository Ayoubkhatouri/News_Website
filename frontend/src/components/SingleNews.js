import React,{useEffect,useState} from 'react'
import {  Card } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addLike,addDislike,reset1 } from '../features/news/newsSlice'

const SingleNews = ({news}) => {

  const [NumLike,setNumLikes]=useState(news.likes.length)
  const [NumDislike,setNumDisLikes]=useState(news.disLikes.length)

  const {userLogin}=useSelector(state=>state.user)
  const {updateNewsInfo}=useSelector(state=>state.news)
  const {Successupdate,NewNews,addedDisLike,addedLike}=updateNewsInfo

  const navigate=useNavigate()
  let LikeThePost=false
  let disLikesPost=false
if(userLogin){
   LikeThePost=news.likes.includes(userLogin._id)
   disLikesPost=news.disLikes.includes(userLogin._id)
}

  const [myColorLike,setMyColorLike]=useState(LikeThePost ? '#485785' : '')
  const [myColorDislike,setMyColorDislike]=useState(disLikesPost ? '#485785' : '')
  const dispatch=useDispatch()
 




useEffect(()=>{ 
  if(Successupdate && NewNews && NewNews.likes && NewNews._id===news._id){
    setNumLikes(NewNews.likes.length)
    setNumDisLikes(NewNews.disLikes.length)
    if(myColorLike==='' && addedLike){
    setMyColorLike('#485785')
    setMyColorDislike('')
  }
    if(myColorDislike === '' && addedDisLike){
    setMyColorLike('')
    setMyColorDislike('#485785')
    }
    if(myColorLike==='#485785' && addedLike){
      setMyColorLike('')
    }
      if(myColorDislike === '#485785' && addedDisLike){
      setMyColorDislike('')
      }
  }
},[Successupdate,news.likes.length,news.disLikes.length,NewNews,news,LikeThePost,disLikesPost])




const handlLike=()=>{
  dispatch(reset1())
  dispatch(addLike(news._id))

}

const handlDislike=()=>{
  dispatch(reset1())
  dispatch(addDislike(news._id))

}

const handleClick=()=>{
  navigate(`/news/${news._id}`)
  window.location.reload()
}
  return (
    <Card  className='my-3 p-3 rounded myCard'>
    <Link onClick={handleClick} to={`/news/${news._id}`}>
        <Card.Img className='image' src={news.image} variant='top' width='263.98' height='175.88'/>
    </Link>
    <Card.Body>
    <Link onClick={handleClick} to={`/news/${news._id}`}>
       <Card.Title as='div' className='titre'><strong>{news.titre}</strong></Card.Title>
    </Link>
    <Card.Text as='div' className='category'>
    Category: {news.category}
    </Card.Text>
    <Card.Text as='div' className='reviews' > 
    <button onClick={handlLike} className='likes' style={{color:myColorLike }} > 
    <i className="fa-solid fa-thumbs-up"></i>:{NumLike }
    </button>
   <button onClick={handlDislike}  className='dislikes' style={{color:myColorDislike }}>
   <i className="fa-solid fa-thumbs-down"></i>:{NumDislike} 
   </button>
    </Card.Text>
   
    
    </Card.Body>
</Card>
  )
}

export default SingleNews

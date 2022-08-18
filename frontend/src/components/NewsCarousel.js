import React,{useEffect} from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import { Carousel,Image } from 'react-bootstrap'
import Loader from './Loader'
import Message from './Message'
import { getNewsCarousel } from '../features/news/newsSlice'
import { useDispatch, useSelector } from 'react-redux'



const NewsCarousel = () => {
    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {allnewsError,allnewsSucces,allnewsLoading,allnewsMessageError,allnews}=useSelector(state=>state.news.NewsInCrouselInfo)
    
    const allImagesNews=allnews.filter(n=>!n.isVideo && n.publié)
    useEffect(()=>{
        dispatch(getNewsCarousel())
    },[dispatch])

    const handleClick=(id)=>{
        navigate(`/news/${id}`)
        window.location.reload()
      }

  return <>
  {allnewsLoading? <Loader/> : allnewsError ? <Message variant='danger'>{allnewsMessageError}</Message> :(
    <Carousel fade pause='hover' className='myCarousel bg-dark'>
        {allImagesNews.map((news)=>(
            <Carousel.Item key={news._id}>
                <Link onClick={()=>handleClick(news._id)} to={`/news/${news._id}`}>
                    <Image className='imageCarousel' src={news.image} alt={news.name} fluid/>
                    <Carousel.Caption className='carousel-caption'>
                        <h2 style={{color:'white'}}>{news.titre}</h2>
                    </Carousel.Caption>
                </Link>
            </Carousel.Item>
        ))}
    </Carousel>
  )
        }
  </>
  
}


export default NewsCarousel
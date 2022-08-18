import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'
import { listAllNews, reset2,getDayNews } from '../features/news/newsSlice'
import SingleNews from '../components/SingleNews'
import {Row,Col} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import NewsCarousel from '../components/NewsCarousel'
import { Link } from 'react-router-dom'
import SearchBox from '../components/SearchBox'



const HomeScreen = () => {

  
  function formaterDate(str){
    return  str.substring(11,16)
    }
    const params=useParams()
    const keyword=params.keyword
  
  const dispatch=useDispatch()
  const {allnewsError,allnewsSucces,allnewsLoading,allnewsMessageError,allnews}=useSelector(state=>state.news.allnewsInfo)
  
  const allImagesNews=allnews.filter(n=>!n.isVideo && n.publié)

  const {LastDayNewsError,LastDayNewsSucces,LastDayNewsLoading,LastDayNewsMessageError,LastDayNews}=useSelector(state=>state.news.allLastDayNewsInfo)
 
  
  useEffect(()=>{
    dispatch(reset2())
   dispatch(listAllNews(keyword))
   dispatch(getDayNews())
  },[dispatch,keyword])



  if (allnewsLoading)
  return <Loader/>

  return (
    <div>
      <Row className='mt-3' >
        <Col  sm={12} md={9} lg={8} xl={8} >
        <h3 className='recomm'>RECOMMANDATIONS</h3>
      <NewsCarousel />
      </Col>
      < Col className='todayNews'  sm={12} md={3} lg={4} xl={4}>
      <h3>24 HEURES</h3>
      {LastDayNewsLoading && <Loader/>}
      {LastDayNewsError && <Message variant='danger'>{LastDayNewsMessageError}</Message>}
      <div className='titreNewstoday'>
       { LastDayNews.map((news)=>(
        <Link key={news._id} className='lien' to={news.isVideo ?`/videos/${news._id}`: `/news/${news._id}`}>
        <h6 style={{fontWeight:'bold'}}  key={news._id}>{formaterDate(news.updatedAt)} : <span style={{color:'black'}}>{news.titre}</span></h6>
        </Link>
       ))}
       </div>
      </Col>
      </Row>
      <div className='myDivSearch'>
      <h3 className='titleOfNews '>ARTICLES </h3>
      <SearchBox className='myBoxSearch' />
      </div>
      <br className='myLigne'/>
      {allnewsError ? <Message variant='danger'>{allnewsMessageError}</Message> : (
            <Row>
            {allImagesNews.map((news)=>(
                <Col  key={news._id}xs={12} sm={10} md={6} lg={4} xl={3}>
                    <SingleNews news={news}/>
                </Col>
            ))}
          </Row>
      )}
  
    </div>
  )
}

export default HomeScreen

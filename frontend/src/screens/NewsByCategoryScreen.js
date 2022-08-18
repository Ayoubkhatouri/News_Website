import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import { listAllNews } from '../features/news/newsSlice'
import SingleNews from '../components/SingleNews'
import {Row,Col} from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { useParams } from 'react-router-dom'
import SearchBox from '../components/SearchBox'



const NewsByCategoryScreen = () => {
  
  const dispatch=useDispatch()
  const params=useParams()
  const category=params.category
  const keyword=params.keyword

  const {allnewsError,allnewsSucces,allnewsLoading,allnewsMessageError,allnews}=useSelector(state=>state.news.allnewsInfo)
 
  
  
  useEffect(()=>{
   dispatch(listAllNews(keyword))
  },[dispatch,keyword])

  const newsSameCategory=allnews.filter((n)=>(n.category.toLowerCase()===category && !n.isVideo && n.publié))


  if (allnewsLoading)
  return <Loader/>

  return (
    <div>

    
      {allnewsError ? <Message variant='danger'>{allnewsMessageError}</Message> : (
        <>{
        newsSameCategory.length===0 ? <h1>Pas d'articles sur {category} </h1>:(
          <>
          <div className='myDivSearch'>
          <h3 className='categorySingle'>{category.toUpperCase()} ARTICLES</h3>
          <SearchBox className='myBoxSearch' />
          </div>
            <Row>
            {newsSameCategory.map((news)=>(
                <Col  key={news._id} sm={12} md={6} lg={4} xl={3}>
                    <SingleNews news={news}/>
                </Col>
            ))}
          </Row>
          </>
        )    
}</>
      ) }      
    </div>
      )
}

export default NewsByCategoryScreen

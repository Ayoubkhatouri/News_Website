import React,{useState,useEffect} from 'react'
import { useParams,Link,useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import SingleNews from '../components/SingleNews'
import {Row,Col,ListGroup,Form,Button} from 'react-bootstrap'
import { listSingleNews ,listAllNews,reset1,addDislike2,addLike2,NewsAddCommnet,getDayNews} from '../features/news/newsSlice'
import SingleNewsVideos from '../components/SingleNewsVideos'



const SingleVideoNewsScreen = () => {
  
  function formaterDate(str){
  return  str.substring(0,16).replace('T',' à ')
  }
  const [comment ,setComment]=useState('')
    const params=useParams()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {singleNewsError,singleNewsLoading,singleNewsSucces,singleNewsMessageError,singleNews}=useSelector(state=>state.news.singleNewsInfo)
    const {allnewsError,allnewsSucces,allnewsLoading,allnewsMessageError,allnews}=useSelector(state=>state.news.allnewsInfo)
   
    const {userLogin}=useSelector(state=>state.user)
    const {updateNewsInfo2}=useSelector(state=>state.news)
    const {Successupdate2 ,NewNews2,addedDisLike2,addedLike2}=updateNewsInfo2

    const {LastDayNewsError,LastDayNewsSucces,LastDayNewsLoading,LastDayNewsMessageError,LastDayNews}=useSelector(state=>state.news.allLastDayNewsInfo)

   

    const newsSameCategory=allnews.filter((n)=>(n.category===singleNews.category && n._id!==singleNews._id && n.isVideo && n.publié))
    
    const [NumLike,setNumLikes]=useState(singleNews.likes && singleNews.likes.length )
    const [NumDislike,setNumDisLikes]=useState(singleNews.disLikes && singleNews.disLikes.length )
   
    const {ErrorAdd,SuccessAdd,LoadingAdd,messageErrorAdd}=useSelector(state=>state.news.commentAddInfo)
  
  const [myColorLike,setMyColorLike]=useState('')
  const [myColorDislike,setMyColorDislike]=useState('')
  
  useEffect(()=>{
    dispatch(listSingleNews(params.id))
    dispatch(listAllNews())
    dispatch(getDayNews())
  },[params.id,dispatch])

  useEffect(() => {
    if(SuccessAdd){
        alert('Commantaire est ajouté !')
        setComment('')
    }
    dispatch(listSingleNews(params.id))

}, [dispatch,params.id,SuccessAdd])


  useEffect(()=>{
    if(Successupdate2 && NewNews2 && NewNews2.likes && NewNews2._id===singleNews._id){
      setNumLikes(NewNews2.likes.length)
      setNumDisLikes(NewNews2.disLikes.length)
      if(myColorLike==='' && addedLike2){
      setMyColorLike('#485785')
      setMyColorDislike('')
    }
      if(myColorDislike === '' && addedDisLike2){
      setMyColorLike('')
      setMyColorDislike('#485785')
      }
      if(myColorLike==='#485785' && addedLike2){
        setMyColorLike('')
      }
        if(myColorDislike === '#485785' && addedDisLike2){
        setMyColorDislike('')
        }
    }
  },[Successupdate2,singleNews.likes,singleNews.length,NewNews2,singleNews])
  
  
  
      const handlLike=()=>{
        dispatch(reset1())
        dispatch(addLike2(singleNews._id))
        
      }
      
      const handlDislike=()=>{
        dispatch(reset1())
        dispatch(addDislike2(singleNews._id))
    
      }
  
  //just to detect when we press the back button in the page
      function detectePressBack(){
        navigate('/videos')
        window.location.reload()
      }
  window.addEventListener("popstate",detectePressBack)


  const sumbmitHandler=(e)=>{
    e.preventDefault()
    const comment_AndID_News={
        NewsId:params.id,
        comment:comment
    }
    dispatch(NewsAddCommnet(comment_AndID_News))
  }
  

    if(singleNewsLoading)
    return <Loader/>

  return (
    <>
    
      {singleNewsError ? <Message variant="danger">{singleNewsMessageError}</Message> : (
        <>
      <h3 className='categorySingle' >{singleNews.category && singleNews.category.toUpperCase()}</h3>
    <h1 className='mb-0'>{singleNews.titre}</h1>
    <Row>
    <Col  sm={12} md={9} lg={8} xl={8} className='mt-3' >
        <ListGroup variant='flush'>
            <ListGroup.Item>
            <iframe className='ytb-video' src={singleNews.video} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            <div>
            {singleNews.auteur && singleNews.auteur.nom} : "crée le {singleNews.createdAt && formaterDate(singleNews.createdAt)} ,modifée le {singleNews.updatedAt &&formaterDate( singleNews.updatedAt)}"
            </div>
            </ListGroup.Item>
            <ListGroup.Item>
            <h3 style={{ fontWeight:'bold'}}>
                {singleNews.description}
            </h3>
           </ListGroup.Item>  
           <ListGroup.Item>
          <p style={{fontSize:"20px"}}>{singleNews.plusInformation}</p> 
          </ListGroup.Item>
          <ListGroup.Item>
          <div className='reviews'>
          <button onClick={handlLike} className='likes' style={{color:(!Successupdate2 &&  userLogin && singleNews.likes && singleNews.likes.includes(userLogin._id))  ? '#485785' : myColorLike}} > 
            <i className="fa-solid fa-thumbs-up"></i>:{NumLike ||(singleNews.likes && singleNews.likes.length) }
          </button>
          <button onClick={handlDislike}  className='dislikes' style={{color:(!Successupdate2 && userLogin && singleNews.disLikes && singleNews.disLikes.includes(userLogin._id))  ? '#485785':myColorDislike }}>
            <i className="fa-solid fa-thumbs-down"></i>:{NumDislike || (singleNews.disLikes && singleNews.disLikes.length)}
          </button>
          </div>
          </ListGroup.Item>

          <ListGroup.Item>
          <Row>
                <Col md={6}>
                    <h4 className='comments'>Commentaires</h4>
                       { !(singleNews && singleNews.comments && singleNews.comments.length>0) && <Message>Pas de Commentaire</Message>}
                       { (singleNews && singleNews.comments && singleNews.comments.length>0) &&(
                       <ListGroup variant='flush'>
                                {singleNews.comments.map((c)=>(
                                    <ListGroup.Item key={c._id}>
                                        <strong>{c.nom}</strong>
                                        <p>{formaterDate(c.createdAt)}</p>
                                        <p>{c.comment}</p>
                                    </ListGroup.Item>
                                               
                                ))}
                                    </ListGroup>)
                                }
                                </Col>
                                <Col md={6}>
                                <h4 className='comments'>Ajouté Votre Commentaire</h4>
                                 <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    
                                    {ErrorAdd && <Message variant='danger'>{messageErrorAdd}</Message>}
                                    {userLogin ? (
                                    <Form onSubmit={sumbmitHandler}>                                     
                                        <Form.Group controlId='comment'>
                                            <Form.Label>commenté</Form.Label>
                                            <Form.Control as='textarea' row='3' value={comment}
                                            onChange={(e)=>setComment(e.target.value)}>
                                            </Form.Control>
                                        </Form.Group>
                                        <Button className='mt-3' type='submit' variant='primary'>Ajouter</Button>
                                    </Form>)
                                        :
                                    <Message>SVP <Link to='/users/abonnez'>Abonnez vous</Link> Pour Ajouter Un Commentaire{" "} </Message>}
                                </ListGroup.Item>
                                </ListGroup>
                </Col>
            </Row>
            </ListGroup.Item>
</ListGroup>
     </Col>

     <Col className='todayNews'  sm={12} md={3} lg={4} xl={4}>
      <h3>24 HEURES</h3>
      {LastDayNewsLoading && <Loader/>}
      {LastDayNewsError && <Message variant='danger'>{LastDayNewsMessageError}</Message>}
      <div className='titreNewstoday'>
       {LastDayNews && LastDayNews.map((news)=>(
        <Link key={news._id} className='lien' to={news.isVideo ?`/videos/${news._id}`: `/news/${news._id}`}>
        <h6 style={{fontWeight:'bold'}}  key={news._id}>{formaterDate(news.updatedAt)} : <span style={{color:'black'}}>{news.titre}</span></h6>
        </Link>
       ))}
       </div>
       </Col>
    </Row>
    <Row>
  
       {allnewsLoading ? <Loader/> : allnewsError ? <Message variant='danger'>{allnewsMessageError}</Message>:(
       <>
       <div className="imgs-container">
       {newsSameCategory.map((news)=>(
            <Col key={news._id}  xs={12} sm={10} md={6} lg={4} xl={3} >
                <SingleNewsVideos key={news._id} news={news}/>
            </Col>
        ))}
        </div>
        </>
       )}
    </Row>
    </>
      )}
    
      
    </>
  )
}

export default SingleVideoNewsScreen

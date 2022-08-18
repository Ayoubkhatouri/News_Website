import axios from 'axios'
import React,{useState,useEffect} from 'react'
import { Link, useNavigate ,useParams} from "react-router-dom"
import {Form ,Button, Spinner} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { listSingleNews,updateNews,reset1} from '../features/news/newsSlice.js'
import Loader from '../components/Loader'


 const UpdateNewsScreen  = () => {
    const params=useParams()
    const newsId=params.id

    const [uploading,setUploading]=useState(false)
   

    const [titre,setTitre]=useState('')
    const [image,setImage]=useState("")
    const [description,setDescription]=useState('')
    const [plusInformation,setPlusInformation]=useState('')
    const [category,setCategory]=useState('')
    const [isVideo,setIsVideo]=useState(false)
    const [video,setVideo]=useState('')
    const [publié,setPublié]=useState(false)
    const [ajoutéInterface,setAjoutéInterface]=useState(false)
   

   
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const news=useSelector(state=>state.news)

    const {singleNewsLoading,singleNewsError,singleNewsSucces,singleNewsMessageError,singleNews}=news.singleNewsInfo
    
    const {Loadingupdate,Errorupdate,Successupdate,messageupdate}=news.updateNewsInfo
     


    useEffect(()=>{
        if(Successupdate){
            dispatch(reset1())
            navigate('/')
        }
else{
      if(!singleNews.titre || singleNews._id !== newsId){
        dispatch(listSingleNews(newsId))
      }
      else{
        setTitre(singleNews.titre)
        setPlusInformation(singleNews.plusInformation)
        setImage(singleNews.image)
        setIsVideo(singleNews.isVideo)
        setCategory(singleNews.category)
        setVideo(singleNews.video)
        setDescription(singleNews.description)
        setPublié(singleNews.publié)
        setAjoutéInterface(singleNews.ajoutéInterface)
      }
    }
    },[dispatch,singleNews,newsId,Successupdate,navigate])

    const uploadFileHandler=async(e)=>{
        const file=e.target.files[0]
        const formData=new FormData()
        formData.append('image',file)
        setUploading(true)
        try {
            const config={
                headers:{
                    'Content-Type':'multipart/form-data'
                }
            }
            const {data}=await axios.post('/api/upload',formData,config)
            setImage(data) //cause we send back the path in the backend
            setUploading(false)
        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }
    

const submitHandler=(e)=>{
e.preventDefault()
    dispatch(updateNews({
        _id:newsId,
        titre,
        plusInformation,
        image,
        isVideo,
        category,
        description,
        video,
        publié,
        ajoutéInterface
    }))
 
}

  if(singleNewsLoading)
  return <Spinner/>

  return (
    <>
    <Link to='/' className='btn btn-light my-3'>Revenir</Link>
    <FormContainer>
        <h1>Edit News</h1>
        {Successupdate && <Message>{messageupdate}</Message>}
        {Loadingupdate && <Loader/>}
        {Errorupdate && <Message variant='danger'>{messageupdate}</Message>}
       
        {singleNewsLoading ? <Loader/> : singleNewsError ? <Message variant='danger'>{singleNewsError}</Message>:(
           <Form onSubmit={submitHandler}>
           <Form.Group controlId='titre'>
               <Form.Label>Titre</Form.Label>
               <Form.Control type='text' placeholder='Entrer Un Titre' value={titre}
               onChange={(e)=>setTitre(e.target.value)}> 
               </Form.Control>
           </Form.Group>
           <Form.Group controlId='image' className='mt-3'>
               <Form.Label>Image </Form.Label>
               <Form.Control type='text' placeholder='Entrer Une Image' value={image}
               onChange={(e)=>setImage(e.target.value)}> 
               </Form.Control>
               <Form.Control type='file' label='Choose File'  onChange={uploadFileHandler}></Form.Control>
                    {uploading && <Loader/>}
           </Form.Group>
           <Form.Group controlId='description' className='mt-3'>
               <Form.Label>Description </Form.Label>
               <Form.Control as='textarea' type='text' rows={4} placeholder='Description' value={description}
               onChange={(e)=>setDescription(e.target.value)}> 
               </Form.Control>
           </Form.Group>
           <Form.Group controlId='plusInformation' className='mt-3' >
               <Form.Label>Ajouter Plus D'informations </Form.Label>
               <Form.Control as='textarea' type='text' rows={6} placeholder='Informations' value={plusInformation}
               onChange={(e)=>setPlusInformation(e.target.value)}> 
               </Form.Control>
           </Form.Group>
           <Form.Group controlId='category' className='mt-3'>
               <Form.Label>Category </Form.Label>
               <Form.Control  as  ='select'  value={category}
               onChange={(e)=>setCategory(e.target.value)}> 
               <option></option>
               <option>Politique</option>
               <option>Economie</option>
               <option>Sport</option>
               <option>Societe</option>
               <option>Monde</option>
               </Form.Control>
               </Form.Group>
               <Form.Group controlId='Publie' className='mt-3'>
               <Form.Check type='switch'  label="Publié" value={publié} checked={publié}
               onChange={()=>setPublié(!publié)}> 
               </Form.Check>
           </Form.Group>
           <Form.Group controlId='isVideo' className='mt-3'>
               <Form.Check type='switch'  label="Video" value={isVideo} checked={isVideo}
               onChange={()=>setIsVideo(!isVideo)}> 
               </Form.Check>
           </Form.Group>
           <Form.Group controlId='isajoutéInterface' className='mt-3'>
               <Form.Check type='switch'  label="Ajouté aux importants News" value={ajoutéInterface} checked={ajoutéInterface}
               onChange={()=>setAjoutéInterface(!ajoutéInterface)}> 
               </Form.Check>
           </Form.Group>
           {isVideo && (
           <Form.Group controlId='video' className='mt-3'>
           <Form.Label>Lien Video Youtube   </Form.Label>
           <Form.Control type='text' placeholder='lien video' value={video}
           onChange={(e)=>setVideo(e.target.value)}> 
           </Form.Control>
           </Form.Group>
           )}
          <Button type='submit' variant='primary' className='mt-3'>Modifié</Button>
       </Form>
        )}
        

    </FormContainer>
    </>
   
  )
}

export default UpdateNewsScreen

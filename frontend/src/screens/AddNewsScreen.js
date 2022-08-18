import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom"
import FormContainer from '../components/FormContainer'
import {Form ,Button, Row ,Col, Spinner} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createNews } from '../features/news/newsSlice'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'



const AddNewsScreen = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [titre,setTitre]=useState('')
    const [image,setImage]=useState('')
    const [description,setDescription]=useState('')
    const [plusInformation,setPlusInformation]=useState('')
    const [category,setCategory]=useState('')
    const [isVideo,setIsVideo]=useState(false)
    const [video,setVideo]=useState('')
    const [uploading,setUploading]=useState(false)


    const {isError,isSuccess,isLoading,message,userLogin}=useSelector(state=>state.user)
    const {Loadingcreate,Errorcreate,messagecreate,Successcreate}=useSelector(state=>state.news.createNewsInfo)

    useEffect(()=>{
     if(Successcreate)
     navigate('/')
       
    },[Successcreate,navigate])
  
   

    const submitHandler=(e)=>{
        e.preventDefault()
       dispatch(createNews({
        user:userLogin._id,
        titre,
        image,
        description,
        plusInformation,
        category,
        isVideo,
        video,
        publié:userLogin.isAdmin ? true : false
       }))
    }

    
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
    
    if(Loadingcreate)
    return <Spinner/>

  return (
    <FormContainer>
        <h1>Crée un nouveau news</h1>
        {Errorcreate && <Message variant='danger'>{messagecreate}</Message>}
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
                <option>Société</option>
                <option>Monde</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='isVideo' className='mt-3'>
                <Form.Check type='switch'  label="Video" value={isVideo}
                onChange={(e)=>setIsVideo(!isVideo)}> 
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
         
            <Button type='submit' variant='primary' className='mt-3'>{userLogin.isAdmin ? 'Publié' : 'Ajouter'}</Button>
        </Form>
    </FormContainer>
  )
}

export default AddNewsScreen

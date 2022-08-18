import React,{useState} from 'react'
import   {useNavigate,useParams} from 'react-router-dom'
import {Form,Button} from 'react-bootstrap'


const SearchBox = () => {
    const [keyword,setKeyword]=useState('')
     const navigate=useNavigate()
     const params=useParams()
     const category=params.category
     
   
    const submitHandler=(e)=>{
        e.preventDefault()
       
        if(keyword.trim()){

            if(!category)
            if(window.location.href.includes('videos')){
                navigate(`/videos/rechercher/${keyword}`)
            }
            else
            navigate(`/rechercher/${keyword}`)
            else{
              
            navigate(`/${category}/rechercher/${keyword}`)
            
        }
        }
        else{
            navigate('/')
        }
    }   
  return (
    <Form onSubmit={submitHandler} className='d-flex' style={{height:'40px'}}>
        <Form.Control type='text' name='q'  onChange={(e)=>setKeyword(e.target.value)}
        placeholder='Rechercher un article' ></Form.Control>
        <Button type='submit' variant='outline-success' className='p-2'>
            Rechercher
        </Button>
    </Form>
  )
}

export default SearchBox
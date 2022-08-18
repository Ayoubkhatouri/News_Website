import React,{useState,useEffect} from 'react'
import { Link, useNavigate ,useParams} from "react-router-dom"
import {Form ,Button, Spinner} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { getUserDetails,adminUpdateUser } from '../features/user/userSlice'
import Loader from '../components/Loader'


 const UserEditbyAdminScreen = () => {
    const params=useParams()
    const userId=params.id
   

    const [nom,setNom]=useState('')
    const [email,setEmail]=useState('')
    const [isAdmin,setisAdmin]=useState(false)
    const [isauthor,setisauthor]=useState(false)
   

 
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const user=useSelector(state=>state.user)
    const {LoadingUserDetails,ErrorUserDetails,userDetails}=user.UserDetailsInfo
    const  {isLoadingUpdate,isErrorUpdate,messageUpdate}=user.userUpdateInfo


    useEffect(()=>{
      if(!userDetails.nom || userDetails._id!==userId){
        dispatch(getUserDetails(userId))
      }
      else{
        setNom(userDetails.nom)
        setEmail(userDetails.email)
        setisAdmin(userDetails.isAdmin)
        setisauthor(userDetails.isauthor)
      }
    },[dispatch,userDetails,userId])

const submitHandler=(e)=>{
 e.preventDefault()
 dispatch(adminUpdateUser({id:userId,nom,email,isAdmin,isauthor}))

    navigate('/admin/userList')
    window.location.reload(true);
}


  if(LoadingUserDetails)
  return <Spinner/>

  return (
    <>
    <Link to='/admin/userList' className='btn btn-light my-3'>Go Back</Link>
    <FormContainer>
        <h1>Edit user</h1>
        {isLoadingUpdate && <Loader/>}
        {isErrorUpdate && <Message variant='danger'>{messageUpdate}</Message>}
        {LoadingUserDetails ? <Loader/> : ErrorUserDetails ? <Message variant='danger'>{messageUpdate}</Message>:(
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='nom'>
                    <Form.Label>Nom </Form.Label>
                    <Form.Control type='nom' placeholder='Nom' value={nom}
                    onChange={(e)=>setNom(e.target.value)}> 
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control type='email' placeholder='email' value={email}
                    onChange={(e)=>setEmail(e.target.value)}> 
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='isadmin' className='my-2'>
                    <Form.Check type='checkbox' label='Admin' checked={isAdmin}
                    onChange={(e)=>setisAdmin(e.target.checked)}> 
                    </Form.Check>
                </Form.Group>
                <Form.Group controlId='isauthor' className='my-2'>
                    <Form.Check type='checkbox' label='Auteur' checked={isauthor}
                    onChange={(e)=>setisauthor(e.target.checked)}> 
                    </Form.Check>
                </Form.Group>
                <Button type='submit' variant='primary'>Modifié</Button>
            </Form>
        )}
        

    </FormContainer>
    </>
   
  )
}

export default UserEditbyAdminScreen

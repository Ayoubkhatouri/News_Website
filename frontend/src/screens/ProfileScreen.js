import React,{useState,useEffect} from 'react'
import {  useNavigate } from "react-router-dom"
import {Form ,Button, Row ,Col, Spinner, Table} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import {updateUser} from '../features/user/userSlice'
import Loader from '../components/Loader'



 const ProfileScreen = () => {
    const [nom,setNom]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [Message2,setMessage2]=useState(null)
    const dispatch=useDispatch()


    const navigate=useNavigate()
    const user=useSelector(state=>state.user)
    const {userLogin}=user
    const {isLoadingUpdate,isErrorUpdate,isSuccessUpdate,messageUpdate}=user.userUpdateInfo

    

    useEffect(()=>{
      if(! userLogin){ // means is not logged in 
        navigate('/login')
    }   
    else{
        setNom(userLogin.nom)
        setEmail(userLogin.email)
    }
    },[navigate,userLogin,dispatch])

const submitHandler=(e)=>{
 e.preventDefault()
 if(password !== confirmPassword){
    setMessage2('Entrer le meme password svp')
 }
 else{
  const  id=userLogin._id
    
  dispatch(updateUser({id,nom,email,password}))


 }

}


  if(isLoadingUpdate)
  return <Spinner/>

  return <Row>
    <Col >
    <h2>{userLogin.nom} Profile </h2>
    {Message2 && <Message variant='danger'>{Message2}</Message>}
        {isErrorUpdate && <Message variant='danger'>{messageUpdate}</Message>}
        {isSuccessUpdate && <Message variant='success'>{messageUpdate}</Message>}
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='nom'>
                <Form.Label>Nom </Form.Label>
                <Form.Control type='nom' placeholder='Entrer le nom' value={nom}
                onChange={(e)=>setNom(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='email' className='mt-3'>
                <Form.Label>Email Adress</Form.Label>
                <Form.Control type='email' placeholder='Entrer email' value={email}
                onChange={(e)=>setEmail(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='mt-3'>
                <Form.Label>Mot De Passe </Form.Label>
                <Form.Control type='password' placeholder='Entrer mot de passe' value={password}
                onChange={(e)=>setPassword(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword' className='mt-3'>
                <Form.Label>Confirm Password </Form.Label>
                <Form.Control type='password' placeholder='Confirm password' value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-3'>Modifié</Button>
        </Form>
    </Col>
    
  </Row>
}

export default ProfileScreen

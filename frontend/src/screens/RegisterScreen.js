import React,{useState,useEffect} from 'react'
import { Link, useNavigate, useLocation } from "react-router-dom"
import {Form ,Button, Row ,Col, Spinner} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import {register} from '../features/user/userSlice'
import FormContainer from '../components/FormContainer'


 const RegisterScreen = () => {
    const [nom,setNom]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')
    const [Message2,setMessage2]=useState(null)

    const dispatch=useDispatch()
    const navigate=useNavigate()
    const user=useSelector(state=>state.user)
    const {isLoading,isError,isSuccess,message,userLogin}=user

   
    useEffect(()=>{
      if(isSuccess || userLogin){ // means is logged in 
        navigate('/')
    }   

    },[navigate,userLogin,isSuccess,dispatch])

const submitHandler=(e)=>{
 e.preventDefault()
 if(password !== confirmPassword){
    setMessage2('Passwords do not match')
 }
 else{
    dispatch(register({nom,email,password})) 
 }

}


  if(isLoading)
  return <Spinner/>

  return (
    <FormContainer>
        <h1>Identifiez Vous</h1>
        {Message2 && <Message variant='danger'>{Message2}</Message>}
        {isError && <Message variant='danger'>{message}</Message>}
        <Form onSubmit={submitHandler}>
        <Form.Group controlId='name'>
                <Form.Label>Nom </Form.Label>
                <Form.Control type='name' placeholder='Entrer Votre Nom' value={nom}
                onChange={(e)=>setNom(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='email' className='mt-3'>
                <Form.Label>Adresse Email</Form.Label>
                <Form.Control type='email' placeholder='Enter Votre Email' value={email}
                onChange={(e)=>setEmail(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='password' className='mt-3'>
                <Form.Label>Mot De Passe </Form.Label>
                <Form.Control type='password' placeholder='Enter password' value={password}
                onChange={(e)=>setPassword(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword' className='mt-3'>
                <Form.Label>Confirmez Mot De Passe </Form.Label>
                <Form.Control type='password' placeholder='Confirm password' value={confirmPassword}
                onChange={(e)=>setConfirmPassword(e.target.value)}> 
                </Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-3'>S'identifiez</Button>
        </Form>
        <Row className='py-3'>
          <Col>
          Vous avez déja un compte ?<Link to='/users/abonnez'>S'abonnez</Link>
          </Col>
        </Row>
    </FormContainer>
  )
}

export default RegisterScreen

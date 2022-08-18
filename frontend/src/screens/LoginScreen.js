import React,{useState,useEffect} from 'react'
import { Link, useNavigate } from "react-router-dom"
import FormContainer from '../components/FormContainer'
import {Form ,Button, Row ,Col, Spinner} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../features/user/userSlice'
import Message from '../components/Message'



const LoginScreen = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const {isError,isSuccess,isLoading,message,userLogin}=useSelector(state=>state.user)

    useEffect(()=>{
        if(isSuccess || userLogin)
        navigate('/')
       
    },[dispatch,isSuccess,userLogin,navigate])
  
   



    const submitHandler=(e)=>{
        e.preventDefault()
        dispatch(login({email,password}))
    }

    if(isLoading)
    return <Spinner/>

  return (
    <FormContainer>
        <h1>Abonnez Vous</h1>
        {isError && <Message variant='danger'>{message}</Message>}
        <Form onSubmit={submitHandler}>
            <Form.Group controlId='email'>
                <Form.Label>Adresse Email</Form.Label>
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
            <Button type='submit' variant='primary' className='mt-3'>S'abonnez</Button>
        </Form>
        <Row className='py-3'>
          <Col>
                Déja un compte <Link to='/users/register'>S'inscrire</Link>
          </Col>
        </Row>
    </FormContainer>
  )
}

export default LoginScreen

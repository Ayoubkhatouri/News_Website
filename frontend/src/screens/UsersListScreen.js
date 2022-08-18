import React,{useEffect} from 'react'
import {  useNavigate } from "react-router-dom"
import { LinkContainer } from "react-router-bootstrap"
import {Table,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getAllUsers,deleteUser} from '../features/user/userSlice.js'

const UsersListScreen = () => {

    const dispatch=useDispatch()

    const user=useSelector(state=>state.user)
    const {isLoadingAllUsers,isErrorAllUsers,messageAllUsers,AllUsers}=user.AllUsersInfo
    const {userLogin}=user

    const AllUsersExceptAdmin=AllUsers.filter(user=>user._id!==userLogin._id)


    

    const navigate=useNavigate()
    useEffect(()=>{ 
        if(userLogin && userLogin.isAdmin){
       
        dispatch(getAllUsers())
        }
        else{
            navigate('/login')
        }
    },[dispatch,navigate,userLogin])

    const deleteHndler=(id)=>{
        if(window.confirm("Are you sure ?")){
        dispatch(deleteUser(id))
        window.location.reload(true);
    }
}


  return (
    <>
        <h1>Users</h1> 
        {isLoadingAllUsers ? <Loader/> : isErrorAllUsers ? <Message variant='danger'>{messageAllUsers}</Message> : (
            <Table striped bordered="true" hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>EMAIL</th>
                        <th>ADMIN</th>
                        <th>auteur</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {AllUsersExceptAdmin.map((user)=>(
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>{user.nom}</td>
                            <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                            <td>
                                {user.isAdmin ? (<i className='fas fa-check' style={{color:'green'}}></i>) :(
                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                )}
                            </td>
                            <td>
                                {user.isauthor ? (<i className='fas fa-check' style={{color:'green'}}></i>) :(
                                    <i className='fas fa-times' style={{color:'red'}}></i>
                                )}
                            </td>
                            <td >
                                <LinkContainer to={`/admin/users/modifier/${user._id}`}>
                                <Button variant='primary' className='btn-sm mx-2 mt-1'>
                                        <i className='fas fa-edit' style={{color:'green'}}></i>
                                    </Button>
                                </LinkContainer>
                                <Button variant='danger'  className='btn-sm mx-2 mt-1' onClick={()=>deleteHndler(user._id)}>
                                <i className='fas fa-trash'  style={{color:'red'}}></i>
                                </Button>
                      </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        )}
    </>
  )
}

export default UsersListScreen
import React from 'react'
import {  useNavigate } from 'react-router-dom'
import { Nav,Navbar,Container,NavDropdown } from 'react-bootstrap'
import { LinkContainer} from 'react-router-bootstrap'
import { useSelector } from 'react-redux'


const Header = () => {
 
  const navigate=useNavigate()

  const user=useSelector(state=>state.user)
  const {userLogin}=user


  const logoutHandler=()=>{
    localStorage.removeItem('userLogin')
    navigate('/')
    window.location.reload();
  }
  

  return (
    <header className='myHeader'>
          <Navbar bg="primary" variant='dark'  expand="lg" collapseOnSelect className='myNav'>
     
      <LinkContainer to='/'>
        <Navbar.Brand className='logo'>Media Maroc</Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className='abonnement'>
        {userLogin ? (
              <NavDropdown   title={userLogin.nom.toUpperCase()}  >
                <LinkContainer to='users/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
                {userLogin && userLogin.isauthor &&  (
                <LinkContainer to='/ajouterNews'>
                 <NavDropdown.Item>Ajouter News</NavDropdown.Item>
               </LinkContainer>
                )}
                {userLogin && userLogin.isAdmin &&  (
                  <>
               <LinkContainer to='/admin/userList'>
                 <NavDropdown.Item>Users</NavDropdown.Item>
               </LinkContainer>
               <LinkContainer to='/admin/publies/newsList'>
                 <NavDropdown.Item>News Publiés</NavDropdown.Item>
               </LinkContainer>
               <LinkContainer to='/admin/enattente/newsList'>
                 <NavDropdown.Item>News En attente</NavDropdown.Item>
               </LinkContainer>
               </>
            )} 
                <NavDropdown.Item onClick={logoutHandler} style={{color:'red'}}>Se déconnecter</NavDropdown.Item>
              </NavDropdown>
            ) :(
               <LinkContainer to="users/abonnez">
               <Nav.Link className='signIn navItems'><i className='fas fa-user' ></i> S'abonnez</Nav.Link>
               </LinkContainer>
            )}
            </div>
          <Nav className="ml-auto navbar-links">
          
          <LinkContainer to='/politique'>
            <Nav.Link className='navItems'><i className="fa-solid fa-scale-balanced"></i> POLITIQUE </Nav.Link>
          </LinkContainer>

          <LinkContainer to='/economie'>
            <Nav.Link className='navItems'><i className="fa-solid fa-circle-dollar-to-slot"></i> ECONOMIE </Nav.Link>
         </LinkContainer>

         <LinkContainer to='/sport'>
            <Nav.Link className='navItems'><i className="fa-solid fa-baseball"></i> SPORT </Nav.Link>
        </LinkContainer>

        <LinkContainer to='/société'>
            <Nav.Link className='navItems'><i className="fa-solid fa-user-group"></i>SOCIETE </Nav.Link>
        </LinkContainer>

        <LinkContainer to="/monde">
            <Nav.Link className='navItems'><i className="fa-solid fa-globe"></i> MONDE </Nav.Link>
         </LinkContainer>

         <LinkContainer to="/videos">
            <Nav.Link className='navItems'><i className="fa-solid fa-clapperboard"></i> VIDEOS </Nav.Link>
        </LinkContainer>
  
        </Nav>
             
        </Navbar.Collapse>

    </Navbar>
    </header>
  )
}

export default Header
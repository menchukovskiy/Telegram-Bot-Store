import React, { useContext, useState } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { INDEX, CONTROL_PANEL_ROUTE } from '../utils/const';
import Button from 'react-bootstrap/Button';
import { observer } from "mobx-react-lite"
import LoginFormModal from './LoginFormModal';
import RegistrationFormModal from './RegistrationFormModal'
import { getText } from '../utils/language'; 
import { useDispatch, useSelector } from 'react-redux';
import { removeUser, setDefaultState } from '../store/slice/userSlice';

const NavBar = observer( () => {
    const store = useSelector(state => state.user);
    const user = store.user
    
    const [ loginFormVisible, setLoginForm ] = useState( false )
    const [ RegistrationFormVisible, setRegistrationForm ] = useState( false )
    const history = useNavigate()
    const dispatch = useDispatch()

   


    const logOut = () => {
      dispatch( removeUser() )
    }

    const getControlPanel = () => {
      history(CONTROL_PANEL_ROUTE)
    }

    const handlerLogin = () => {
      setLoginForm(false)
      dispatch( setDefaultState())
    }

    const handlerRegistration = () => {
      setRegistrationForm(false)
      dispatch( setDefaultState())
    }

    const location = useLocation();

    
    

    return (
        <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <NavLink to={INDEX}>LOGO</NavLink>
          <Nav className="ml-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
          
            {user.isAuth ?
            <Nav className='ml-auto'>
                <Button onClick={getControlPanel} className='m-2' variant="info">{getText('CONTROL_PANEL')}</Button>
                <Button onClick={logOut} className='m-auto' variant="light">{getText('EXIT')}</Button>
             </Nav>
             :
             <Nav className='ml-auto'>
                <Button 
                 onClick={ () => setRegistrationForm( true ) } 
                className='m-2' 
                variant="outline-info">{getText('REGISTRATION')}</Button>
                <Button 
                    onClick={ () => setLoginForm( true ) } 
                    className='m-auto' 
                    variant="info">{getText('LOGIN')}</Button>
                <LoginFormModal show={loginFormVisible} onHide={ handlerLogin } />
                <RegistrationFormModal show={RegistrationFormVisible} onHide={ handlerRegistration } />
             </Nav>
             
            }
           
        </Container>
      </Navbar>
    )
})

export default NavBar
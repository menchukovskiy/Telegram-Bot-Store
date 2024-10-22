import Button from "react-bootstrap/esm/Button";
import React from "react";
import Form from "react-bootstrap/Form"
import Modal from 'react-bootstrap/Modal';
import Container from "react-bootstrap/esm/Container";
import { getText } from '../utils/language';
import { useInput } from "../utils/hooks";
import { useNavigate } from 'react-router-dom'
import { CONTROL_PANEL_ROUTE } from '../utils/const';
import { observer } from "mobx-react-lite"
import { useDispatch, useSelector } from 'react-redux';
import { getLogin } from '../store/slice/userSlice'
import BeatLoader from 'react-spinners/BeatLoader'
import ErrorBox from "./ErrorBox"; 

const LoginFormModal = observer( ({ show, onHide }) => {
  const email = useInput('', {isEmpty:true,isEmail:true})
  const password = useInput('', {isEmpty:true })
  const history = useNavigate()
  const dispatch = useDispatch()
  const store = useSelector( state => state.user )
  const user = store.user

  const login = async () => {
   dispatch( getLogin( [ email.value, password.value ] ))
   
    if( user.isAuth ){
      history(CONTROL_PANEL_ROUTE)
    }

  }

  


  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {getText('LOGIN')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <ErrorBox show={store.status} message={store.error} />
         
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control  onChange={ e => email.onChange(e) } onBlur={ e => email.onBlur(e) } value={email.value} type="email" placeholder="name@example.com" />
            { email.getError() }
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control  onChange={ e => password.onChange(e) } onBlur={ e => password.onBlur(e) } value={password.value} type="password" placeholder="********" />
          { password.getError() }
          </Form.Group>
         <Container className="d-flex">
          <Button onClick={ login } disabled={email.inputValid || password.inputValid }  className="m-auto" variant="primary">
          
          { store.status === 'loading' ? <BeatLoader size={9}  color="#fff" /> : getText('BTN_LOGIN') }
          </Button>
          </Container>
        </Form>
      </Modal.Body>
     
    </Modal>
  )
})

export default LoginFormModal
import React from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import Container from "react-bootstrap/esm/Container";
import { getText } from '../utils/language';
import { useInput } from "../utils/hooks";
import { observer } from "mobx-react-lite"
import { useNavigate } from 'react-router-dom'
import { CONTROL_PANEL_ROUTE } from '../utils/const';
import { useDispatch, useSelector } from 'react-redux';
import { getRegistration } from '../store/slice/userSlice'
import BeatLoader from 'react-spinners/BeatLoader'
import ErrorBox from "./ErrorBox";

const RegistrationFormModal = observer( ({ show, onHide }) => {

    const email = useInput('', {isEmpty:true,isEmail:true})
    const password = useInput('', {isEmpty:true })
    const password2 = useInput('',{isEmpty:true, isSame:password.value})
    const login = useInput('',{isEmpty:true})
    const history = useNavigate()
    const dispatch = useDispatch()
    const store = useSelector( state => state.user )
    const user = store.user
    
    const Registration = async () => {
      dispatch( getRegistration( [ email.value, password.value, password2.value, login.value ]) )
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
          {getText('REGISTRATION')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <ErrorBox show={store.status} message={store.error} />
          <Form.Group className="mb-3" controlId="formRegBasicEmail">

            <Form.Label>{getText('ENTER_EMAIL')}</Form.Label>
            <Form.Control  onChange={ e => email.onChange(e) } onBlur={ e => email.onBlur(e) } value={email.value} type="email" placeholder="name@example.com" />
            { email.getError() }
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRegBasicLogin">

            <Form.Label>{getText('ENTER_LOGIN_REG')}</Form.Label>
            <Form.Control  onChange={ e => login.onChange(e) } onBlur={ e => login.onBlur(e) } value={login.value} type="text" placeholder="Login" />
            { login.getError() }
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRegBasicPass">
            <Form.Label>{getText('ENTER_PASSWORD')}</Form.Label>
            <Form.Control   onChange={ e => password.onChange(e) } onBlur={ e => password.onBlur(e) } value={password.value} type="password" placeholder="********" />
            { password.getError() }
          </Form.Group>

          <Form.Group className="mb-3" controlId="formRegBasicPass2">
            <Form.Label>{getText('ENTER_PASSWORD_2')}</Form.Label>
            <Form.Control   onChange={ e => password2.onChange(e) } onBlur={ e => password2.onBlur(e) } value={password2.value}  type="password" placeholder="********" />
            { password2.getError() }
          </Form.Group>
          <Container className="d-flex">
            <Button onClick={Registration} disabled={email.inputValid || password.inputValid || password2.inputValid || login.inputValid } className="m-auto" variant="primary">
            { store.status === 'loading' ? <BeatLoader size={9}  color="#fff" /> : getText('BTN_REGISTRATION') }
            </Button>
          </Container>
        </Form>
      </Modal.Body>

    </Modal>
  )
})

export default RegistrationFormModal
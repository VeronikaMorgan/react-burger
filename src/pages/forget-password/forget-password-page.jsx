import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { emailValidator } from "../../utils/validation";
import pageStyles from '../main-styles.module.css'
import LinkWrapper from "../../components/link-wrapper/link-wrapper";
import { sendResetEmail } from "../../services/thunks/passwordThunks";
import { clearPasswordState } from "../../services/slices/password-slice";
import { getCookie } from "../../utils/cookie";

const ForgetPasswordPage = () => {
  const isLoggedIn = useSelector(store => store.user.isLoggedIn)
  const successSubmit = useSelector(store => store.password.sendResetEmailSuccess)

  const [emailValue, setEmailValue] = useState('')
  const [isEmailValid, setEmailValidity] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleEmailChange = (e) => {
    const { value, validity: { valid } } = e.target
    setEmailValue(value)
    setEmailValidity(!!valid && emailValidator(value))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(sendResetEmail(emailValue))
  }

  useEffect(() => {
   if (successSubmit) {
     navigate('/reset-password', {replace: true, state: {isVisited: true}})
     dispatch(clearPasswordState())
   }
  },[successSubmit, navigate])

  useEffect(() => {
    if(isLoggedIn || getCookie("access")) {
      navigate('/profile')
    }
  }, [isLoggedIn, navigate, getCookie])
  console.log(location.pathname)
  return (
    <main className={pageStyles.wrapper_lg}>
      <form className={`${pageStyles.form_wrapper} mb-20`} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <Input
          type={"email"}
          name={"email"}
          placeholder={"Укажите e-mail"}
          value={emailValue}
          error={!isEmailValid}
          errorText={"некоректный адрес"}
          onChange={handleEmailChange} />
        <Button htmlType="submit" type="primary" size="medium" disabled={!isEmailValid || emailValue === ''}>
          Восстановить
        </Button>
      </form>
      <LinkWrapper link_to={'/login'} link_text={'Войти'} caption={'Вспомнили пароль?'} />
    </main>
  )
}

export default ForgetPasswordPage
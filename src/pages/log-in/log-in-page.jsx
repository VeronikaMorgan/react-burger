import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import pageStyles from '../main-styles.module.css'
import LinkWrapper from "../../components/link-wrapper/link-wrapper";
import { emailValidator, passwordValidator } from "../../utils/validation";
import { login } from "../../services/thunks/userThunks";
import { useForm } from "../../utils/use-form-hook";
import { getCookie } from "../../utils/cookie";

const LogInPage = () => {
  const isLoggedIn = useSelector(store => store.user.isLoggedIn)

  const formState = {
    email: '',
    password: ''
  }
  const { values, handleChange } = useForm(formState)

  const [isEmailValid, setEmailValidity] = useState(true)
  const [isPasswordValid, setPasswordValidity] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleEmailChange = (e) => {
    const { value, validity: { valid } } = e.target
    handleChange(e)
    setEmailValidity(!!valid && emailValidator(value))
  }
  const handlePasswordChange = (e) => {
    const { value, validity: { valid } } = e.target
    handleChange(e)
    setPasswordValidity(!!valid && passwordValidator(value))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(login(values))
  }
  console.log(isLoggedIn)
  useEffect(() => {
    if(isLoggedIn || getCookie("access")) {
      navigate(location.state?.from ? location.state?.from : '/', {replace: true})
    }
  }, [isLoggedIn, navigate, getCookie])

  const isFormEmpty = values.email === '' || values.password === '' ? true : null
  return (
    <main className={pageStyles.wrapper_lg}>
      <form className={`${pageStyles.form_wrapper} mb-15`} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Вход</h1>
        <Input
          type={"email"}
          name={"email"}
          placeholder={"E-mail"}
          value={values.email}
          error={!isEmailValid}
          errorText={"некоректный адрес"}
          onChange={handleEmailChange} />
        <PasswordInput
          name={"password"}
          icon={"ShowIcon"}
          placeholder={"Пароль"}
          value={values.password}
          error={!isPasswordValid}
          errorText={"некоректный пароль"}
          onChange={handlePasswordChange} />
        <Button htmlType="submit" type="primary" size="medium" disabled={isFormEmpty || !isEmailValid || !isPasswordValid}>
          Войти
        </Button>
      </form>
      <LinkWrapper link_to={'/register'} link_text={'Зарегистрироваться'} caption={'Вы — новый пользователь?'} />
      <LinkWrapper link_to={'/forgot-password'} link_text={'Восстановить пароль'} caption={'Восстановить пароль'} />
    </main>
  )
}

export default LogInPage
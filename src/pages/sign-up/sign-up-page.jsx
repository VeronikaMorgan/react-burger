import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import pageStyles from '../main-styles.module.css'
import LinkWrapper from "../../components/link-wrapper/link-wrapper";

import { register } from "../../services/thunks/userThunks";
import { resetSignUp } from "../../services/slices/user-slice";
import { nameValidator, emailValidator, passwordValidator } from "../../utils/validation";
import { useForm } from "../../utils/use-form-hook";
import { getCookie } from "../../utils/cookie";

const SignUpPage = () => {
  const {isLoggedIn, signUpSuccess} = useSelector( state => state.user)
  const formState = {
    name: '',
    email: '',
    password: ''
  }

  const { values, handleChange, setValues } = useForm(formState)
  const [isNameValid, setNameValidity] = useState(true)
  const [isEmailValid, setEmailValidity] = useState(true)
  const [isPasswordValid, setPasswordValidity] = useState(true)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleNameChange = (e) => {
    const { value, validity: { valid } } = e.target
    handleChange(e)
    setNameValidity(!!valid && nameValidator(value))
  }
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
    dispatch(register(values))
  }
  
  useEffect(() => {
    if(signUpSuccess) {
      dispatch(resetSignUp())
      navigate('/login', {replace: true})
    }
  }, [signUpSuccess])
  useEffect(() => {
    if(isLoggedIn || getCookie("access")) {
      navigate('/profile', {replace: true})
    }
  }, [isLoggedIn, navigate, getCookie])

  const isFormEmpty = values.email === '' || values.name === '' || values.password === '' ? true : null
  const isFormInValid = !isPasswordValid || !isEmailValid || !isNameValid
  return (
    <main className={pageStyles.wrapper_lg}>
      <form className={`${pageStyles.form_wrapper} mb-15`} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Регистрация</h1>
        <Input
          type={"text"}
          name={"name"}
          placeholder={"Имя"}
          value={values.name}
          error={!isNameValid}
          errorText={"длиннееее"}
          onChange={handleNameChange}
        />
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

        <Button htmlType="submit" type="primary" size="medium" disabled={ isFormInValid || isFormEmpty} >
          Зарегистрироваться
        </Button>
      </form>
      <LinkWrapper link_to={'/login'} link_text={'Войти'} caption={'Уже зарегистрированы?'} />
    </main>
  )
}

export default SignUpPage
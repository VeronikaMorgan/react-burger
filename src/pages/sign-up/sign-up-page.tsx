import React, { FC } from "react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/app-hooks";
import { useNavigate } from "react-router-dom";
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import pageStyles from '../main-styles.module.css'
import LinkWrapper from "../../components/link-wrapper/link-wrapper";

import { register } from "../../services/thunks/userThunks";
import { resetSignUp } from "../../services/slices/user-slice";
import { nameValidator, emailValidator, passwordValidator } from "../../utils/validation";
import { useForm } from "../../utils/hooks/use-form-hook";
import { getCookie } from "../../utils/cookie";
import { TUserSignUpData } from "../../utils/types/types";

const SignUpPage:FC = () => {
  const {isLoggedIn, signUpSuccess} = useAppSelector( state => state.user)

  const formState = {
    name: '',
    email: '',
    password: ''
  }

  const { values, handleChange } = useForm<TUserSignUpData>(formState)
  const [isNameValid, setNameValidity] = useState<boolean>(true)
  const [isEmailValid, setEmailValidity] = useState<boolean>(true)
  const [isPasswordValid, setPasswordValidity] = useState<boolean>(true)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, validity: { valid } } = e.target
    handleChange(e)
    setNameValidity(!!valid && nameValidator(value))
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, validity: { valid } } = e.target
    handleChange(e)
    setEmailValidity(!!valid && emailValidator(value))
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, validity: { valid } } = e.target
    handleChange(e)
    setPasswordValidity(!!valid && passwordValidator(value))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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

  const isFormEmpty = values.email === '' || values.name === '' || values.password === '' ? true : undefined
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
          aria-invalid={!isPasswordValid}
          aria-errormessage={"некоректный пароль"}
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
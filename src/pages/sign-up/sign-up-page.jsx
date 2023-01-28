import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import pageStyles from '../main-styles.module.css'
import LinkWrapper from "../../components/link-wrapper/link-wrapper";

import { register } from "../../services/slices/register-slice";
import { nameValidator, emailValidator, passwordValidator } from "../../utils/validation";
import { useForm } from "../../utils/use-form-hook";

const SignUpPage = () => {
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
        <Input
          type={"password"}
          name={"password"}
          icon={"ShowIcon"}
          placeholder={"Пароль"}
          value={values.password}
          error={!isPasswordValid}
          errorText={"некоректный пароль"}
          onChange={handlePasswordChange} />

        <Button htmlType="submit" type="primary" size="medium" disabled={!isEmailValid && !isNameValid && !isPasswordValid}>
          Зарегистрироваться
        </Button>
      </form>
      <LinkWrapper link_to={'/login'} link_text={'Войти'} caption={'Уже зарегистрированы?'} />
    </main>
  )
}

export default SignUpPage
import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import pageStyles from '../main-styles.module.css'
import LinkWrapper from "../../components/link-wrapper/link-wrapper";
import { setEmailValue, setPasswordValue } from "../../services/slices/login-slice";
import { emailValidator, passwordValidator } from "../../utils/validation";
import { login } from "../../services/slices/login-slice";
import { useForm } from "../../utils/use-form-hook";
const LogInPage = () => {
  const formState = {
    email: '',
    password: ''
  }
  const { values, handleChange } = useForm(formState)

  const [isEmailValid, setEmailValidity] = useState(true)
  const [isPasswordValid, setPasswordValidity] = useState(true)
  const dispatch = useDispatch()

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
        <Input
          type={"password"}
          name={"password"}
          icon={"ShowIcon"}
          placeholder={"Пароль"}
          value={values.password}
          error={!isPasswordValid}
          errorText={"некоректный пароль"}
          onChange={handlePasswordChange} />
        <Button htmlType="submit" type="primary" size="medium" disabled={!isEmailValid || !isPasswordValid}>
          Войти
        </Button>
      </form>
      <LinkWrapper link_to={'/register'} link_text={'Зарегистрироваться'} caption={'Вы — новый пользователь?'} />
      <LinkWrapper link_to={'/forgot-password'} link_text={'Восстановить пароль'} caption={'Восстановить пароль'} />
    </main>
  )
}

export default LogInPage
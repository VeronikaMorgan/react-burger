import React from "react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { emailValidator, passwordValidator } from "../../utils/validation";
import LinkWrapper from "../../components/link-wrapper/link-wrapper";
import pageStyles from '../main-styles.module.css'

const ResetPasswordPage = () => {
  // const { email, password } = useSelector(store => store.login.inputData)
  // const { inputData } = useSelector(store => store.login)

  // const [isEmailValid, setEmailValidity] = useState(true)
  // const [isPasswordValid, setPasswordValidity] = useState(true)
  // const dispatch = useDispatch()

  // const handleEmailChange = (e) => {
  //   const { value, validity: { valid } } = e.target
  //   dispatch(setEmailValue(value))
  //   setEmailValidity(!!valid && emailValidator(value))
  // }
  // const handlePasswordChange = (e) => {
  //   const { value, validity: { valid } } = e.target
  //   dispatch(setPasswordValue(value))
  //   setPasswordValidity(!!valid && passwordValidator(value))
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   dispatch(login(inputData))
  // }
  return (
    <main className={pageStyles.wrapper_lg}>
      {/* <form className={`${pageStyles.form_wrapper} mb-15`} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <Input
          type={"email"}
          name={"E-mail"}
          placeholder={"Введите новый пароль"}
          value={email}
          error={!isEmailValid}
          errorText={"некоректный адрес"}
          onChange={handleEmailChange} />
        <Input
          type={"password"}
          name={"Пароль"}
          icon={"ShowIcon"}
          placeholder={"Введите код из письма"}
          value={password}
          error={!isPasswordValid}
          errorText={"некоректный пароль"}
          onChange={handlePasswordChange} />
        <Button htmlType="submit" type="primary" size="medium" >
          Сохранить
        </Button>
      </form>
      <LinkWrapper link_text={"Войти"} link_to={"/login"} caption={'Вспомнили пароль?'}/> */}
    </main>
  
  )
}

export default ResetPasswordPage
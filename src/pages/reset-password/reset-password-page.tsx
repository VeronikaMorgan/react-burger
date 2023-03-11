import React, { FC } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/app-hooks";
import { Input, Button, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components'
import { passwordValidator, codeValidator } from "../../utils/validation";
import { useForm } from "../../utils/hooks/use-form-hook";
import { resetPassword } from "../../services/thunks/passwordThunks";
import LinkWrapper from "../../components/link-wrapper/link-wrapper";
import pageStyles from '../main-styles.module.css'
import { getCookie } from "../../utils/cookie";
import { TResetData } from "../../utils/types/types";

const ResetPasswordPage:FC = () => {
  const isLoggedIn = useAppSelector(store => store.user.isLoggedIn)
  const resetSuccess = useAppSelector(store => store.password.resetPasswordSuccess)
  
  const formState = {
    password: '',
    code: ''
  }

  const {values, handleChange } = useForm<TResetData>(formState)
  const [isPasswordValid, setPasswordValidity] = useState<boolean>(true)
  const [isCodeValid, setCodeValidity] = useState<boolean>(true)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, validity: { valid } } = e.target
    handleChange(e)
    setPasswordValidity(!!valid && passwordValidator(value))
  }
  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, validity: { valid } } = e.target
    handleChange(e)
    setCodeValidity(!!valid && codeValidator(value))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(resetPassword(values))
  }

  useEffect(() => {
    if (resetSuccess) {
      navigate('/login', {replace: true})
    }
   },[resetSuccess, navigate])

   useEffect(() => {
     if(!location?.state?.isVisited) {
       navigate('/login', {replace: true})
     }
   },[location])
   
   useEffect(() => {
    if(isLoggedIn || getCookie("access")) {
      navigate('/profile')
    }
  }, [isLoggedIn, navigate, getCookie])

  return (
    <main className={pageStyles.wrapper_lg}>
      <form className={`${pageStyles.form_wrapper} mb-15`} onSubmit={handleSubmit}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <PasswordInput
          name={"password"}
          placeholder={"Введите новый пароль"}
          value={values.password}
          aria-invalid={!isPasswordValid}
          aria-errormessage={"пароль должен быть длиннее 5 символов"}
          onChange={handlePasswordChange}
          icon={"ShowIcon"}/>
        <Input
          type={"text"}
          name={"code"}
          placeholder={"Введите код из письма"}
          value={values.code}
          error={!isCodeValid}
          errorText={"некорректный формат кода"}
          onChange={handleCodeChange} />
        <Button htmlType="submit" type="primary" size="medium" disabled={!isPasswordValid || !isCodeValid || values.password === '' || values.code === ''} >
          Сохранить
        </Button>
      </form>
      <LinkWrapper link_text={"Войти"} link_to={"/login"} caption={'Вспомнили пароль?'}/>
    </main>
  
  )
}

export default ResetPasswordPage
import React from "react";
import { useState, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { nameValidator, passwordValidator, emailValidator } from "../../utils/validation";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import pageStyles from '../../pages/main-styles.module.css'
import { getUser } from "../../services/slices/user-slice";
import { getCookie } from "../../utils/cookie";
import { useForm } from "../../utils/use-form-hook";

const ProfileForm = () => {
  const formState = {
    name: '',
    email: '',
    password: ''
  }
  const { values, handleChange, setValues} = useForm(formState)
  const [isNameValid, setNameValidity] = useState(true)
  const [isEmailValid, setEmailValidity] = useState(true)
  const [isPasswordValid, setPasswordValidity] = useState(true)
  const dispatch = useDispatch()
  
  const handleNameChange = (e) => {
    const {value, validity: {valid}} = e.target
    handleChange(e)
    setNameValidity(!!valid && nameValidator(value))
  }
  const handleEmailChange = (e) => {
    const {value, validity: {valid}} = e.target
    handleChange(e)
    setEmailValidity(!!valid && emailValidator(value))
  }
  const handlePasswordChange = (e) => {
    const {value, validity: {valid}} = e.target
    handleChange(e)
    setPasswordValidity(!!valid && passwordValidator(value))
  }
  
  const onIconClick = (e) => {
    e.target.closest('.input__container ').focus()
    console.log(getCookie('access'))
  }

  const handleClick = () => {
    dispatch(getUser())
  }
  
  return (
    <form  className={pageStyles.form_wrapper}>
     <Input
          type={"text"}
          name={"name"}
          placeholder={"Имя"}
          value={values.name}
          icon={"EditIcon"}
          error={!isNameValid}
          errorText={"имя должно быть длиннее 5 символов"}
          onChange={handleNameChange}
          onIconClick={onIconClick}
         />
        <Input
          type={"email"}
          name={"email"}
          placeholder={"E-mail"}
          icon={"EditIcon"}
          value={values.email}
          error={!isEmailValid}
          errorText={"некоректный адрес"}
          onChange={handleEmailChange}
          onIconClick={onIconClick}/>
        <Input
          type={"password"}
          name={"password"}
          icon={"EditIcon"}
          placeholder={"Пароль"}
          value={values.password}
          error={!isPasswordValid}
          errorText={"пароль должен быть длиннее 5 символов"}
          onChange={handlePasswordChange}
          onIconClick={onIconClick}/>
           <Button htmlType="button" type="primary" size="small" extraClass="ml-2" onClick={handleClick}/>
  </form>
  )
}

export default ProfileForm
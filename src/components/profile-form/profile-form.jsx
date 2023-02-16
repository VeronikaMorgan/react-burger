import React from "react";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { nameValidator, passwordValidator, emailValidator } from "../../utils/validation";
import { Input, Button, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'

import formStyles from './profile-form.module.css';
import { getUser } from "../../services/thunks/userThunks";
import { useForm } from "../../utils/use-form-hook";
import { patchUser } from "../../services/thunks/userThunks";

const ProfileForm = () => {
  const userData = useSelector(store => store.user.userData)
  const formState = {
    name: '',
    email: '',
    password: ''
  }
  const { values, handleChange, setValues } = useForm(formState)
  const [areButtonsVisible, setButtonsVisible] = useState(false)
  const [isNameFocus, setNameFocus] = useState(false)
  const [isNameValid, setNameValidity] = useState(true)
  const [isEmailValid, setEmailValidity] = useState(true)
  const [isPasswordValid, setPasswordValidity] = useState(true)
  const [isPasswordDirty, setPasswordDirty] = useState(false)
  const [isNameChanged, setNameChanged] = useState(false)
  const [isEmailChanged, setEmailChanged] = useState(false)
  const [isPasswordChanged, setPasswordChanged] = useState(false)
  const dispatch = useDispatch()
  
  const nameRef = useRef(null)
   
  useEffect(() => {
    if(!userData.name) {
      dispatch(getUser())
      setValues({...userData, password: ''})
      return;
    }
    setValues({...userData, password: ''})
  },[userData, dispatch])

  useEffect(() => {
     setButtonsVisible(isNameChanged || isEmailChanged || isPasswordChanged || isPasswordDirty)
  }, [isNameChanged, isEmailChanged, isPasswordChanged, isPasswordDirty])

  const handleNameChange = (e) => {
    const { value, validity: { valid } } = e.target
    handleChange(e)
    setNameChanged(value !== userData.name)
    setNameValidity(!!valid && nameValidator(value))
  }
  const handleEmailChange = (e) => {
    const { value, validity: { valid } } = e.target
    handleChange(e)
    setEmailChanged(value !== userData.email)
    setEmailValidity(!!valid && emailValidator(value))
  }
  const handlePasswordChange = (e) => {
    const { value, validity: { valid } } = e.target
    handleChange(e)
    setPasswordChanged(value !== '')
    setPasswordDirty(true)
    setPasswordValidity(!!valid && passwordValidator(value))
  }

  const onIconClick = () => {
   setNameFocus(true)
   nameRef.current.focus()
  }
  const handleEdit = () => {
    const newData = {}
    isNameChanged && (newData.name = values.name)
    isEmailChanged && (newData.email = values.email)
    isPasswordChanged && (newData.password = values.password)
    dispatch(patchUser(newData))
    setButtonsVisible(false)
  }

  const handleReset = () => {
    setValues({...userData, password: ''})
    setNameValidity(true)
    setEmailValidity(true)
    setPasswordValidity(true)
    setNameChanged(false)
    setEmailChanged(false)
    setPasswordChanged(false)
    setPasswordDirty(false)
  }
  
  return (
    <form className={formStyles.wrapper}>
      <Input
        type={"text"}
        name={"name"}
        placeholder={"Имя"}
        value={values.name || ''}
        icon={"EditIcon"}
        error={!isNameValid}
        errorText={"имя должно быть длиннее 5 символов"}
        onChange={handleNameChange}
        onIconClick={onIconClick}
        ref={nameRef}
        disabled={!isNameFocus}
        onBlur={() => setNameFocus(false)}
      />
      <EmailInput
        name={"email"}
        placeholder="E-mail"
        isIcon={true}
        value={values.email || ''}
        error={!isEmailValid}
        errorText={"некоректный адрес"}
        onChange={handleEmailChange}
      />
      <PasswordInput
        name={"password"}
        icon="EditIcon"
        placeholder={"Пароль"}
        value={values.password || ''}
        error={!isPasswordValid}
        errorText={"пароль должен быть длиннее 5 символов"}
        onChange={handlePasswordChange} />
      {areButtonsVisible ?
        <div className={formStyles.buttons}>
          <Button htmlType="button" type="primary" size="small" onClick={handleReset}><p className="text text_type_main-small">Отмена</p></Button>
          <Button htmlType="button" type="primary" size="small" onClick={handleEdit} disabled={!isNameValid || !isEmailValid || !isPasswordValid}><p className="text text_type_main-small">Сохранить</p></Button>
        </div>
        : null}
    </form>
  )
}

export default ProfileForm
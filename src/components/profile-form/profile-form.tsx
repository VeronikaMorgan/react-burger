import React, { FC } from "react";
import { useState, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks/app-hooks";
import { nameValidator, passwordValidator, emailValidator } from "../../utils/validation";
import { Input, Button, PasswordInput, EmailInput } from '@ya.praktikum/react-developer-burger-ui-components'

import formStyles from './profile-form.module.css';
import { getUser } from "../../services/thunks/userThunks";
import { useForm } from "../../utils/hooks/use-form-hook";
import { patchUser } from "../../services/thunks/userThunks";
import { TPatchUserData } from "../../utils/types/types";

const ProfileForm: FC = () => {
  const userData = useAppSelector(store => store.user.userData)

  const formState = {
    name: '',
    email: '',
    password: ''
  }

  const { values, handleChange, setValues } = useForm<TPatchUserData>(formState)
  const [areButtonsVisible, setButtonsVisible] = useState<boolean>(false)
  const [isNameFocus, setNameFocus] = useState<boolean>(false)
  const [isEmailFocus, setEmailFocus] = useState<boolean>(false)
  const [isPasswordFocus, setPasswordFocus] = useState<boolean>(false)

  const [isNameValid, setNameValidity] = useState<boolean>(true)
  const [isEmailValid, setEmailValidity] = useState<boolean>(true)
  const [isPasswordValid, setPasswordValidity] = useState<boolean>(true)
  const [isPasswordDirty, setPasswordDirty] = useState<boolean>(false)

  const [isNameChanged, setNameChanged] = useState<boolean>(false)
  const [isEmailChanged, setEmailChanged] = useState<boolean>(false)
  const [isPasswordChanged, setPasswordChanged] = useState<boolean>(false)

  const dispatch = useAppDispatch()
   
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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, validity: { valid } } = e.target
    handleChange(e)
    setNameChanged(value !== userData.name)
    setNameValidity(!!valid && nameValidator(value))
  }
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, validity: { valid } } = e.target
    handleChange(e)
    setEmailChanged(value !== userData.email)
    setEmailValidity(!!valid && emailValidator(value))
  }
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, validity: { valid } } = e.target
    handleChange(e)
    setPasswordChanged(value !== '')
    setPasswordDirty(true)
    setPasswordValidity(!!valid && passwordValidator(value))
  }

  // const onIconClick = () => {
  //  setNameFocus(true)
  //  nameRef?.current?.focus()
  // }
  const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const newData: TPatchUserData = {}
    isNameChanged && (newData.name = values.name)
    isEmailChanged && (newData.email = values.email)
    isPasswordChanged && (newData.password = values.password)
    dispatch(patchUser(newData))
    setNameChanged(false)
    setEmailChanged(false)
    setPasswordChanged(false)
    setPasswordDirty(false)
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
    <form className={formStyles.wrapper} onSubmit={(e) => handleEdit(e)}>
      <Input
        type={"text"}
        name={"name"}
        placeholder={"Имя"}
        value={values.name || ''}
        icon={"EditIcon"}
        error={!isNameValid}
        errorText={"имя должно быть длиннее 5 символов"}
        onChange={handleNameChange}
        disabled={!isNameFocus}
        onBlur={() => setNameFocus(false)}
        onIconClick={() => setNameFocus(true)}
      />
      <Input
        type={"email"}
        name={"email"}
        placeholder="E-mail"
        icon={"EditIcon"}
        value={values.email || ''}
        error={!isEmailValid}
        errorText={"некорректный формат"}
        onChange={handleEmailChange}
        disabled={!isEmailFocus}
        onBlur={() => setEmailFocus(false)}
        onIconClick={() => setEmailFocus(true)}
      />
      <Input
        type={"password"}
        name={"password"}
        icon="EditIcon"
        placeholder={"Пароль"}
        value={values.password || ''}
        error={!isPasswordValid}
        errorText={"пароль должен быть длиннее 5 символов"}
        onChange={handlePasswordChange}
        disabled={!isPasswordFocus}
        onBlur={() => setPasswordFocus(false)}
        onIconClick={() => setPasswordFocus(true)} />

      {areButtonsVisible ?
        <div className={formStyles.buttons}>
          <Button htmlType="button" type="primary" size="small" onClick={handleReset}><p className="text text_type_main-small">Отмена</p></Button>
          <Button htmlType="submit" type="primary" size="small" disabled={!isNameValid || !isEmailValid || !isPasswordValid}><p className="text text_type_main-small">Сохранить</p></Button>
        </div>
        : null}
    </form>
  )
}

export default ProfileForm
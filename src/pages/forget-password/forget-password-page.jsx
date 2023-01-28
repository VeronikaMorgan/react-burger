import React from "react";
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import pageStyles from '../main-styles.module.css'
import LinkWrapper from "../../components/link-wrapper/link-wrapper";
const ForgetPasswordPage = () => {
  return (
    <main className={pageStyles.wrapper_lg}>
      <div className={`${pageStyles.form_wrapper} mb-20`}>
        <h1 className="text text_type_main-medium">Восстановление пароля</h1>
        <Input
          type={"email"}
          name={"E-mail"}
          placeholder={"Укажите e-mail"}
          value={'value'} />
        <Button htmlType="button" type="primary" size="medium">
          Восстановить
        </Button>
      </div>
      <LinkWrapper link_to={'/login'} link_text={'Войти'} caption={'Вспомнили пароль?'} />
    </main>
  )
}

export default ForgetPasswordPage
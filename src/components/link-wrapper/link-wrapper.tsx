import React, { FC } from "react";
import { Link } from "react-router-dom";
import styles from './link-wrapper.module.css'

interface LinkWrapperProps {
  link_to: string
  link_text: string
  caption: string
}

const LinkWrapper: FC<LinkWrapperProps> = ({link_to, link_text, caption}) => {
  return (
    <div className={styles.wrapper}>
      <p className="text text_type_main-small text_color_inactive">{caption}</p>
      <Link to={link_to} className={`${styles.link} link-default text text_type_main-small`}>{link_text}</Link>
    </div>
  )
}

export default LinkWrapper
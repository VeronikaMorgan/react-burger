import React, { FC } from "react";
import loaderStyles from './loader.module.css'

const Loader: FC = () => {
  return (
    <div className={loaderStyles.container}>
      <span className={loaderStyles.circle}></span>
      <span className={loaderStyles.circle}></span>
      <span className={loaderStyles.circle}></span>
      <span className={loaderStyles.circle}></span>
    </div>
  )
}

export default Loader
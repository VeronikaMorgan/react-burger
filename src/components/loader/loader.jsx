import React from "react";
import loaderStyles from './loader.module.css'

const Loader = () => {
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
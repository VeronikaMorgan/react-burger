import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCookie } from "../../utils/cookie";

const ProtectedRouteElement = ({element}) => {
  const location = useLocation()
  const isLoggedIn = useSelector(store => store.user.isLoggedIn);
  console.log(location.pathname, getCookie('access'), isLoggedIn)
  return isLoggedIn || getCookie('access') ? element : <Navigate to="/login" replace={true} state={{from: location.pathname}}/>
}

export default ProtectedRouteElement
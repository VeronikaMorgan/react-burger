import React, { FC } from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks/app-hooks";
import { getCookie } from "../../utils/cookie";

const ProtectedRouteElement:FC = () => {
  const location = useLocation()
  const isLoggedIn = useAppSelector(store => store.user.isLoggedIn)
  return isLoggedIn || getCookie('access') ? <Outlet/> : <Navigate to="/login" replace={true} state={{from: location.pathname}}/>
}

export default ProtectedRouteElement
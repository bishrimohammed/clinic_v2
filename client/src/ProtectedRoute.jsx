import { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { setlogin } from "./store/authSlice";
import { useDispatch } from "react-redux";

const ProtectedRoute = () => {
  let isLogin = JSON.parse(localStorage.getItem("currentUser"));
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("currentUser") !== null) {
      //console.log(localStorage.getItem("currentUser"));
      const user = JSON.parse(localStorage.getItem("currentUser"));

      dispatch(setlogin(user));
      //navigate("/");
    } else {
      navigate("/login", { replace: true });
    }

    return () => {};
  }, [dispatch, isLogin, navigate]);
  return isLogin ? <Outlet /> : null;
};

export default ProtectedRoute;

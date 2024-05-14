import React, { Suspense } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
//import dotenv from "dotenv";

import "./app.css";
import "react-toastify/dist/ReactToastify.css";

import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./ProtectedRoute";
import Login2 from "./views/pages/Login2";
import ChangePassword from "./views/pages/ChangePassword";

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/pages/login/Login"));
// const Register = React.lazy(() => import("./views/pages/register/Register"));
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));

function App() {
  // dotenv.config();
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/login2" name="Login Page" element={<Login2 />} />
          <Route path="/changePassword" element={<ChangePassword />}></Route>
          {/* <Route
            exact
            path="/register"
            name="Register Page"
            element={<Register />}
          /> */}
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          <Route element={<ProtectedRoute />}>
            <Route path="*" element={<DefaultLayout />} />
          </Route>
          {/* <Route path="*" name="Home" element={<DefaultLayout />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

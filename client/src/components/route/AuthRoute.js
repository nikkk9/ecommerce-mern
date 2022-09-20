import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, useNavigate } from "react-router-dom";
import Loader from "../loader/Loader";

// const AuthRoute = ({ element: Component, ...rest }) => {
//   const { authenticated, fetching } = useSelector((state) => state.user);
//   return (
//     <>
//       {!fetching && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (!authenticated) {
//               return <Navigate to="/login-signup" />;
//             }
//             return <Component {...props} />;
//           }}
//         />
//       )}
//     </>
//   );
// };

const AuthRoute = (props) => {
  const { Component } = props;
  const { authenticated, fetching } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authenticated) {
      navigate("/login-signup");
    }
  }, [navigate]);
  return <>{fetching ? <Loader /> : <Component />}</>;
};

export default AuthRoute;

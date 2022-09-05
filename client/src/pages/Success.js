import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/layout/Header";
const Success = () => {
  const location = useLocation();
  console.log(location);
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",

          alignItems: "center",
          height: "70vh",
          width: "100%",
        }}
      >
        <h2
          style={{
            padding: "1rem",
            backgroundColor: "teal",
            color: "white",
            borderRadius: ".2rem",
          }}
        >
          PAYMENT SUCCESSFULL !!!
        </h2>
      </div>
    </>
  );
};

export default Success;

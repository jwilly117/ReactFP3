import React from "react";
import LoginForm from "../components/LoginForm";
import { Container, Typography } from "@mui/material";
import "../styles.css";

const LoginPage = () => {
  return (
    <Container maxWidth="sm" style={{ marginTop: "100px" }}>
      <Typography variant="h4" align="center" gutterBottom>
        <img src="../../public/images/fleetpay_dark.jpg" alt="" />
      </Typography>
      <LoginForm />
      <p style={{ textAlign: "center",
        color: "lightgrey"
      }}>2025 Ellis Ventures </p>
    </Container>
  );
};

export default LoginPage;

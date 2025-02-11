import React, { useState } from "react";
import { TextField, Button, Paper, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === "admin@example.com" && password === "password") {
      localStorage.setItem("authenticated", "true");
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    
    <Paper elevation={5} sx={{
      padding: 4,
      // width: "350px",
      textAlign: "center",
      borderRadius: "10px",
      // backgroundColor: "#cccccc",  // Blue Background for the Form
      color: "#363636",  // Text color white for better contrast
      fontWeight: "bolder"
    }}>
      <Typography variant="h5" align="center" gutterBottom>
        User Login
      </Typography>
      <form onSubmit={handleLogin}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
        >
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default LoginForm;

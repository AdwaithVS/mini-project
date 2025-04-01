import React, { useState } from "react";
import axiosInstance from "../axiosInstance";
import { Container, TextField, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = async () => {
        try {
            const res = await axiosInstance.post("/register", { email, password });
            localStorage.setItem("userEmail", email); // Still needed for initial setup
            localStorage.setItem("mentalHealthStatus", "new");
            alert("Registration Successful! Please log in.");
            navigate("/login");
        } catch (error) {
            alert(error.response?.data?.message || "Registration failed. Try again.");
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
            >
                <Typography variant="h5" sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600, color: "#1976d2" }}>
                    Register
                </Typography>
                <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    sx={{ mt: 2, "& .MuiOutlinedInput-root": { borderRadius: 20 } }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    fullWidth
                    label="Password"
                    type="password"
                    variant="outlined"
                    sx={{ mt: 2, "& .MuiOutlinedInput-root": { borderRadius: 20 } }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, borderRadius: 20, py: 1.5, "&:hover": { bgcolor: "#1565c0" } }}
                    onClick={handleRegister}
                >
                    Register
                </Button>
            </Paper>
        </Container>
    );
};

export default Register;
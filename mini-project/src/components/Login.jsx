import React, { useState, useContext } from "react";
import { AuthContext } from "../AuthContext"; // Import AuthContext
import axiosInstance from "../axiosInstance";
import { Container, TextField, Button, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext); // Use context
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!email || !password) {
            alert("Please enter both email and password");
            return;
        }
        try {
            const response = await axiosInstance.post("/login", { email, password });
            console.log("Login Response:", response.data);
            login(email, {
                mentalHealthStatus: response.data.emotion_analysis?.overall?.status || "new", // Use status string, default to "new"
                questionnaireCompleted: response.data.questionnaire_completed || false,
                questionnaireAnswers: response.data.questionnaire_answers || {},
            });
            navigate("/");
        } catch (error) {
            console.error("Login Error:", error);
            alert(error.response?.data?.message || "Login failed. Please try again.");
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
                    Login
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
                    onClick={handleLogin}
                >
                    Login
                </Button>
            </Paper>
        </Container>
    );
};

export default Login;
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../AuthContext"; // Import AuthContext
import axiosInstance from "../axiosInstance";
import { Container, Paper, Typography, Button, CircularProgress, Avatar, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const { logout, userEmail } = useContext(AuthContext); // Use context
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (!userEmail) {
                console.error("User email not found");
                return;
            }
            try {
                const res = await axiosInstance.get("/profile", {
                    headers: { "User-Email": userEmail },
                });
                setUserData(res.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };
        fetchUserProfile();
    }, [userEmail]);

    const handleLogout = () => {
        logout();
        navigate("/");
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
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Avatar sx={{ width: 100, height: 100, mb: 2, bgcolor: "#1976d2" }} />
                    <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: "'Roboto', sans-serif", color: "#1976d2" }}>
                        User Profile
                    </Typography>
                </Box>
                {userData ? (
                    <Typography variant="h6" sx={{ mt: 2, fontSize: "1.25rem", color: "#333" }}>
                        <strong>Email:</strong> {userData.email}
                    </Typography>
                ) : (
                    <CircularProgress sx={{ mt: 3, color: "#388e3c" }} />
                )}
                <Button
                    variant="contained"
                    color="error"
                    sx={{ mt: 3, borderRadius: 20, px: 4, py: 1.5, fontSize: "1rem", "&:hover": { bgcolor: "#b71c1c" } }}
                    onClick={handleLogout}
                >
                    Logout
                </Button>
            </Paper>
        </Container>
    );
};

export default Profile;
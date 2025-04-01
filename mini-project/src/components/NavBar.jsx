import React, { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const NavBar = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                bgcolor: "#1976d2",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
        >
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{ flexGrow: 1, fontFamily: "'Roboto', sans-serif", fontWeight: 500 }}
                    component={Link}
                    to="/"
                    style={{ textDecoration: "none", color: "inherit" }}
                >
                    CareerMind
                </Typography>
                {isAuthenticated ? (
                    <>
                        <Button
                            color="inherit"
                            onClick={handleLogout}
                            sx={{ borderRadius: 20, px: 3, textTransform: "none", "&:hover": { bgcolor: "rgba(255,255,255,0.2)" } }}
                        >
                            Logout
                        </Button>
                        <IconButton component={Link} to="/profile" sx={{ "&:hover": { bgcolor: "rgba(255,255,255,0.2)" } }}>
                            <AccountCircleIcon sx={{ fontSize: 40, color: "white" }} />
                        </IconButton>
                    </>
                ) : (
                    <>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/login"
                            sx={{ borderRadius: 20, px: 3, textTransform: "none", "&:hover": { bgcolor: "rgba(255,255,255,0.2)" } }}
                        >
                            Login
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/register"
                            sx={{ borderRadius: 20, px: 3, textTransform: "none", "&:hover": { bgcolor: "rgba(255,255,255,0.2)" } }}
                        >
                            Register
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
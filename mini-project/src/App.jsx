import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { AuthProvider } from "./AuthContext";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Questionnaire from "./components/Questionnaire";
import Results from "./components/Results";
import Recommendations from "./components/Recommendations";
import MentalHealthResources from "./components/MentalHealthResources";
import NavBar from "./components/NavBar";
import ExtraQuestionnaire from "./components/ExtraQuestionnaire";
import ChatBot from "./components/ChatBot";
import Profile from "./components/Profile";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#d32f2f" },
    success: { main: "#388e3c" },
    background: { default: "#f5f7fa" },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none" },
      },
    },
  },
});

const globalStyles = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #E3F2FD 0%, #90CAF9 100%)",
  display: "flex",
  flexDirection: "column",
  paddingTop: "64px",
};

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavBar = location.pathname === "/register" || location.pathname === "/login";

  return (
    <>
      {!hideNavBar && <NavBar />}
      {children}
    </>
  );
};

// New child component to handle useLocation
const AppContent = () => {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/": "CareerMind - Home",
      "/login": "CareerMind - Login",
      "/register": "CareerMind - Register",
      "/profile": "CareerMind - Profile",
      "/questionnaire": "CareerMind - Questions",
    };
    document.title = titles[location.pathname] || "CareerMind";
  }, [location.pathname]);

  return (
    <div style={globalStyles}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/questionnaire" element={<Layout><Questionnaire /></Layout>} />
        <Route path="/extra-questionnaire" element={<Layout><ExtraQuestionnaire /></Layout>} />
        <Route path="/results" element={<Layout><Results /></Layout>} />
        <Route path="/recommendations" element={<Layout><Recommendations /></Layout>} />
        <Route path="/mental-health-resources" element={<Layout><MentalHealthResources /></Layout>} />
        <Route path="/chatbot" element={<Layout><ChatBot /></Layout>} />
        <Route path="/profile" element={<Layout><Profile /></Layout>} />
      </Routes>
    </div>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
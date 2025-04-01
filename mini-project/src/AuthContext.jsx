import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem("user") === "loggedIn");
  const [userEmail, setUserEmail] = useState(localStorage.getItem("userEmail") || null);
  const [mentalHealthStatus, setMentalHealthStatus] = useState(localStorage.getItem("mentalHealthStatus") || "new");
  const [questionnaireCompleted, setQuestionnaireCompleted] = useState(localStorage.getItem("questionnaireCompleted") === "true");

  const login = (email, data) => {
    setIsAuthenticated(true);
    setUserEmail(email);
    setMentalHealthStatus(data.mentalHealthStatus || "new");
    setQuestionnaireCompleted(data.questionnaireCompleted || false);
    localStorage.setItem("user", "loggedIn");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("mentalHealthStatus", data.mentalHealthStatus || "new");
    localStorage.setItem("questionnaireCompleted", data.questionnaireCompleted || "false");
    window.dispatchEvent(new Event("storage"));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    setMentalHealthStatus("new");
    setQuestionnaireCompleted(false);
    localStorage.clear();
    window.dispatchEvent(new Event("storage"));
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(localStorage.getItem("user") === "loggedIn");
      setUserEmail(localStorage.getItem("userEmail") || null);
      setMentalHealthStatus(localStorage.getItem("mentalHealthStatus") || "new");
      setQuestionnaireCompleted(localStorage.getItem("questionnaireCompleted") === "true");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      userEmail,
      mentalHealthStatus,
      questionnaireCompleted,
      login,
      logout,
      setQuestionnaireCompleted, // Add setter
      setMentalHealthStatus // Add setter
    }}>
      {children}
    </AuthContext.Provider>
  );
};
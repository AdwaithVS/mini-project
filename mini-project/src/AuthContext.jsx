import React, { createContext, useState } from "react";

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
    localStorage.setItem("questionnaireCompleted", data.questionnaireCompleted ? "true" : "false");
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    setMentalHealthStatus("new");
    setQuestionnaireCompleted(false);
    localStorage.clear();
  };

  // Removed useEffect with storage listener since it’s not needed for same-tab updates

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      userEmail,
      mentalHealthStatus,
      questionnaireCompleted,
      login,
      logout,
      setQuestionnaireCompleted,
      setMentalHealthStatus
    }}>
      {children}
    </AuthContext.Provider>
  );
};
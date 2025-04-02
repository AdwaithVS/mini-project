import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../AuthContext";
import { Container, Typography, Paper, Box, Card, CardActionArea, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import QuizIcon from "@mui/icons-material/Assignment";
import CareerIcon from "@mui/icons-material/Work";
import ChatIcon from "@mui/icons-material/Chat";
import HealthIcon from "@mui/icons-material/HealthAndSafety";
import LoginIcon from "@mui/icons-material/Login";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const Home = () => {
  const { isAuthenticated, userEmail, mentalHealthStatus, questionnaireCompleted } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Reset loading state when authentication or user data changes
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 100); // Brief delay to ensure state sync
    return () => clearTimeout(timer);
  }, [isAuthenticated, userEmail, mentalHealthStatus, questionnaireCompleted]);

  if (isLoading) {
    return (
      <Typography sx={{ textAlign: "center", mt: 10, fontFamily: "'Roboto', sans-serif", color: "#555" }}>
        Loading...
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ pt: 10, pb: 4 }}>
      <Paper
        sx={{
          mt: 4,
          p: 4,
          textAlign: "center",
          backgroundImage: `url("/banner.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "#fff",
          borderRadius: 3,
          minHeight: "350px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
        elevation={4}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        />
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <Typography variant="h3" fontWeight="bold" sx={{ fontFamily: "'Roboto', sans-serif" }}>
            Welcome to CareerMind
          </Typography>
          <Typography variant="h6" sx={{ mt: 1, fontStyle: "italic", fontSize: "1.2rem" }}>
            AI-Driven Career & Mental Wellness Guidance
          </Typography>
        </Box>
      </Paper>

      {!isAuthenticated ? (
        <Box mt={4} display="flex" justifyContent="center" textAlign="center" gap={3} flexWrap="wrap">
          <FeatureCard
            title="Login"
            description="Access your personalized recommendations and assessments."
            icon={<LoginIcon sx={{ fontSize: 50, color: "#1976d2" }} />}
            link="/login"
          />
          <FeatureCard
            title="Register"
            description="Create an account to start your journey."
            icon={<PersonAddIcon sx={{ fontSize: 50, color: "#d32f2f" }} />}
            link="/register"
          />
        </Box>
      ) : (
        <Box mt={4} display="flex" justifyContent="center" textAlign="center" gap={3} flexWrap="wrap">
          {!questionnaireCompleted ? (
            <FeatureCard
              title="Mental Assessment Test"
              description="Evaluate your emotional well-being and career readiness."
              icon={<QuizIcon sx={{ fontSize: 50, color: "#1976d2" }} />}
              link="/questionnaire"
            />
          ) : (
            <>
              {mentalHealthStatus === "Mentally Fit ✅" || mentalHealthStatus === "Mild Concerns ⚠️" ? (
                <FeatureCard
                  title="Get Career Path Insights"
                  description="Receive AI-driven recommendations tailored to your skills."
                  icon={<CareerIcon sx={{ fontSize: 50, color: "#d32f2f" }} />}
                  link="/recommendations"
                />
              ) : (
                <FeatureCard
                  title="Mental Health Resources"
                  description="Explore self-care resources and support."
                  icon={<HealthIcon sx={{ fontSize: 50, color: "#2e7d32" }} />}
                  link="/mental-health-resources"
                />
              )}
              <FeatureCard
                title="Chat with our Assistant"
                description="Ask AI about career and mental wellness guidance."
                icon={<ChatIcon sx={{ fontSize: 50, color: "#388e3c" }} />}
                link="/chatbot"
              />
            </>
          )}
        </Box>
      )}
    </Container>
  );
};

const FeatureCard = ({ title, description, icon, link }) => (
  <Card
    sx={{
      width: 300,
      borderRadius: 3,
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      transition: "transform 0.3s, box-shadow 0.3s",
      "&:hover": { transform: "scale(1.05)", boxShadow: "0 4px 12px rgba(0,0,0,0.12)" },
    }}
  >
    <CardActionArea component={Link} to={link}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>{icon}</Box>
        <Typography variant="h6" fontWeight="bold" sx={{ color: "#333", fontFamily: "'Roboto', sans-serif" }}>
          {title}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1, color: "#555", fontSize: "1rem" }}>
          {description}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default Home;
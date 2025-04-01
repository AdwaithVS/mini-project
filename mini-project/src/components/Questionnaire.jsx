import React, { useState, useEffect, useContext } from "react"; // Add useContext to the import
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box, LinearProgress, Paper, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import axiosInstance from "../axiosInstance";

const questions = [
  { id: 1, text: "How often have you felt nervous, anxious, or on edge in the last two weeks?", options: ["Never", "Several days", "More than half the days", "Nearly every day"] },
  { id: 2, text: "How often have you not been able to stop or control worrying in the last two weeks?", options: ["Never", "Several days", "More than half the days", "Nearly every day"] },
  { id: 3, text: "How often have you had trouble relaxing in the last two weeks?", options: ["Never", "Several days", "More than half the days", "Nearly every day"] },
  { id: 4, text: "How often have you been so restless that it is hard to sit still in the last two weeks?", options: ["Never", "Several days", "More than half the days", "Nearly every day"] },
  { id: 5, text: "How often have you become easily annoyed or irritable in the last two weeks?", options: ["Never", "Several days", "More than half the days", "Nearly every day"] },
  { id: 6, text: "How often have you felt down, depressed, or hopeless in the last two weeks?", options: ["Never", "Several days", "More than half the days", "Nearly every day"] },
  { id: 7, text: "How often have you had trouble falling asleep, staying asleep, or sleeping too much in the last two weeks?", options: ["Never", "Several days", "More than half the days", "Nearly every day"] },
  { id: 8, text: "How often have you had a poor appetite or overeaten in the last two weeks?", options: ["Never", "Several days", "More than half the days", "Nearly every day"] },
  { id: 9, text: "How often have you felt bad about yourself or that you are a failure in the last two weeks?", options: ["Never", "Several days", "More than half the days", "Nearly every day"] },
  { id: 10, text: "How often have you moved or spoken so slowly that others noticed in the last two weeks?", options: ["Never", "Several days", "More than half the days", "Nearly every day"] },
  { id: 11, text: "How often have you thought that you would be better off dead in the last two weeks?", options: ["Never", "Several days", "More than half the days", "Nearly every day"] },
  { id: 12, text: "How often have you felt that you were unable to control important things in your life in the last month?", options: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"] },
  { id: 13, text: "How often have you felt nervous and 'stressed' in the last month?", options: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"] },
  { id: 14, text: "How often have you felt confident about your ability to handle personal problems in the last month?", options: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"] },
  { id: 15, text: "How often have you felt that things were going your way in the last month?", options: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"] },
  { id: 16, text: "How often have you been able to control irritations in your life in the last month?", options: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"] },
  { id: 17, text: "How often have you been angered because of things outside your control in the last month?", options: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"] },
  { id: 18, text: "How often have you felt difficulties were piling up so high you could not overcome them in the last month?", options: ["Never", "Almost never", "Sometimes", "Fairly often", "Very often"] },
  { id: 19, text: "In the last two weeks, how often have you been feeling optimistic about the future?", options: ["None of the time", "Rarely", "Some of the time", "Often", "All of the time"] },
  { id: 20, text: "In the last two weeks, how often have you been feeling useful?", options: ["None of the time", "Rarely", "Some of the time", "Often", "All of the time"] },
  { id: 21, text: "In the last two weeks, how often have you been feeling relaxed?", options: ["None of the time", "Rarely", "Some of the time", "Often", "All of the time"] },
  { id: 22, text: "In the last two weeks, how often have you been dealing with problems well?", options: ["None of the time", "Rarely", "Some of the time", "Often", "All of the time"] },
  { id: 23, text: "In the last two weeks, how often have you been thinking clearly?", options: ["None of the time", "Rarely", "Some of the time", "Often", "All of the time"] },
  { id: 24, text: "In the last two weeks, how often have you been feeling close to other people?", options: ["None of the time", "Rarely", "Some of the time", "Often", "All of the time"] },
  { id: 25, text: "In the last two weeks, how often have you been able to make up your own mind about things?", options: ["None of the time", "Rarely", "Some of the time", "Often", "All of the time"] },
];

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const { questionnaireCompleted, userEmail, setQuestionnaireCompleted, setMentalHealthStatus } = useContext(AuthContext); // Add setters
  const navigate = useNavigate();

  useEffect(() => {
    const storedAnswers = localStorage.getItem("questionnaireAnswers");
    if (questionnaireCompleted && storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
      setIsCompleted(true);
    }
    setProgress(((currentQuestion + 1) / questions.length) * 100);
  }, [currentQuestion, questionnaireCompleted]);

  const handleAnswerChange = (event) => {
    setAnswers({ ...answers, [questions[currentQuestion].id]: event.target.value });
  };

  const handleNext = () => {
    if (!answers[questions[currentQuestion].id]) {
      alert("Please select an answer before proceeding.");
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitAnswers();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitAnswers = async () => {
    try {
      if (!userEmail) {
        alert("You must be logged in to submit the questionnaire.");
        navigate("/login");
        return;
      }
      const finalAnswers = { answers: { ...answers }, email: userEmail };
      if (Object.keys(answers).length !== questions.length) {
        alert("Please answer all questions before submitting.");
        return;
      }
      console.log("Submitting answers:", JSON.stringify(finalAnswers, null, 2));
      const response = await axiosInstance.post("/submit-questionnaire", finalAnswers);
      if (response.data.status) {
        // Update AuthContext directly
        setQuestionnaireCompleted(true);
        setMentalHealthStatus(response.data.status); // Update mentalHealthStatus with backend result
        localStorage.setItem("questionnaireCompleted", "true");
        localStorage.setItem("mentalHealthStatus", response.data.status);
        localStorage.setItem("questionnaireAnswers", JSON.stringify(answers));
        navigate("/results", {
          state: {
            score: response.data.score,
            status: response.data.status,
            details: response.data.details
          }
        });
      } else {
        console.error("Submission failed:", response.data);
        alert("Submission failed: " + (response.data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error submitting questionnaire:", error.response?.data || error.message);
      alert("Failed to submit. Please try again later. Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div>
      {isCompleted ? (
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
              background: "linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600, color: "#1976d2" }}>
              You have already completed the questionnaire.
            </Typography>
            <pre style={{ textAlign: "left", background: "#f0f0f0", padding: "1rem", borderRadius: "8px" }}>
              {JSON.stringify(answers, null, 2)}
            </pre>
          </Paper>
        </Container>
      ) : (
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Paper
            elevation={3}
            sx={{
              p: 4,
              borderRadius: 3,
              background: "linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h5" gutterBottom sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600, color: "#1976d2" }}>
              Mental Health Assessment
            </Typography>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{ height: 12, borderRadius: 6, mb: 3, backgroundColor: "#e0e0e0", "& .MuiLinearProgress-bar": { bgcolor: "#388e3c" } }}
            />
            <Typography variant="h6" sx={{ mb: 2, fontSize: "1.25rem", color: "#333" }}>
              {questions[currentQuestion].text}
            </Typography>
            <RadioGroup value={answers[questions[currentQuestion].id] || ""} onChange={handleAnswerChange}>
              {questions[currentQuestion].options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio sx={{ color: "#1976d2", "&.Mui-checked": { color: "#1976d2" } }} />}
                  label={option}
                  sx={{ mb: 1, "& .MuiFormControlLabel-label": { fontSize: "1.1rem", color: "#555" } }}
                />
              ))}
            </RadioGroup>
            <Box mt={4} display="flex" justifyContent="space-between">
              <Button
                variant="contained"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                sx={{ borderRadius: 20, px: 4, py: 1.5, bgcolor: "#d32f2f", "&:hover": { bgcolor: "#b71c1c" }, "&:disabled": { bgcolor: "#ccc" } }}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                sx={{ borderRadius: 20, px: 4, py: 1.5, "&:hover": { bgcolor: "#1565c0" } }}
              >
                {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
              </Button>
            </Box>
          </Paper>
        </Container>
      )}
    </div>
  );
};

export default Questionnaire;
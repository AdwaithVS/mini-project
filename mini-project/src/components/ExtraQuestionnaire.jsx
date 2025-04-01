import React, { useState } from "react";
import { Container, Paper, Typography, FormControl, RadioGroup, FormControlLabel, Radio, Button, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

const extraQuestions = [
    { question: "Do you frequently experience overwhelming stress?", options: ["Yes", "Sometimes", "No"] },
    { question: "Have you had trouble sleeping due to emotional distress?", options: ["Yes", "Sometimes", "No"] },
    { question: "Do you feel hopeless or unable to find joy in activities?", options: ["Yes", "Sometimes", "No"] },
    { question: "Have you had thoughts of self-harm?", options: ["Yes", "Sometimes", "No"] },
    { question: "Would you be willing to talk to a professional about your mental well-being?", options: ["Yes", "Maybe", "No"] }
];

const ExtraQuestionnaire = () => {
    const [responses, setResponses] = useState(Array(extraQuestions.length).fill(""));
    const navigate = useNavigate();
    const location = useLocation();
    const initialStatus = location.state?.status || "Moderate Concerns ❗";

    const handleChange = (index, value) => {
        const updatedResponses = [...responses];
        updatedResponses[index] = value;
        setResponses(updatedResponses);
    };

    const handleSubmit = () => {
        const severeResponses = responses.filter(response => response === "Yes").length;

        if (severeResponses >= 3) {
            navigate("/mental-health-resources");
        } else {
            navigate("/results", { state: { status: "Moderate Concerns ❗", score: initialStatus } });
        }
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} sx={{ p: 4, mt: 6, textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    Additional Questions
                </Typography>

                <Box sx={{ textAlign: "left" }}>
                    {extraQuestions.map((q, index) => (
                        <FormControl key={index} component="fieldset" sx={{ mt: 3, display: "block" }}>
                            <Typography variant="body1" sx={{ fontWeight: "bold", mb: 1 }}>
                                {q.question}
                            </Typography>
                            <RadioGroup
                                row
                                value={responses[index]}
                                onChange={(e) => handleChange(index, e.target.value)}
                                sx={{ justifyContent: "flex-start" }}
                            >
                                {q.options.map((option, i) => (
                                    <FormControlLabel key={i} value={option} control={<Radio />} label={option} sx={{ mr: 3 }} />
                                ))}
                            </RadioGroup>
                        </FormControl>
                    ))}
                </Box>

                <Button onClick={handleSubmit} variant="contained" sx={{ mt: 4, px: 4 }}>
                    Submit
                </Button>
            </Paper>
        </Container>
    );
};

export default ExtraQuestionnaire;

import React from "react";
import { Container, Paper, Typography, Button, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { score, status, details } = location.state || {};
    const wellbeingScore = Number(score) || 0;

    return (
        <Container maxWidth="md" sx={{ py: 4 }}>
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    mt: 2,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
            >
                <Typography variant="h4" gutterBottom color="primary" sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600 }}>
                    Assessment Results
                </Typography>

                <Typography variant="h6" sx={{ mt: 2, fontSize: "1.25rem", color: "#333" }}>
                    Overall Well-being Score: <strong>{wellbeingScore.toFixed(2)}</strong>
                </Typography>
                <Typography
                    variant="h5"
                    sx={{ mt: 3, fontSize: "1.5rem", color: status?.includes("🚨") ? "error.main" : "#388e3c" }}
                >
                    {status || "Unknown"}
                </Typography>

                {details && (
                    <Box mt={3} textAlign="left">
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 500, color: "#1976d2" }}>Detailed Scores:</Typography>
                        <Typography sx={{ color: "#555" }}>GAD-7 (Anxiety): {details.gad7.score} - {details.gad7.status}</Typography>
                        <Typography sx={{ color: "#555" }}>PHQ-9 (Depression): {details.phq9.score} - {details.phq9.status}</Typography>
                        <Typography sx={{ color: "#555" }}>PSS (Stress): {details.pss.score} - {details.pss.status}</Typography>
                        <Typography sx={{ color: "#555" }}>WEMWBS (Well-being): {details.wemwbs.score} - {details.wemwbs.status}</Typography>
                    </Box>
                )}

                <Box mt={4} display="flex" justifyContent="center" gap={2}>
                    {status === "Mentally Fit ✅" || status === "Mild Concerns ⚠️" ? (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => navigate("/recommendations")}
                            sx={{ borderRadius: 20, px: 4, py: 1.5, "&:hover": { bgcolor: "#1565c0" } }}
                        >
                            View Career Recommendations
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => navigate("/mental-health-resources")}
                            sx={{ borderRadius: 20, px: 4, py: 1.5, "&:hover": { bgcolor: "#b71c1c" } }}
                        >
                            View Mental Health Resources
                        </Button>
                    )}
                    <Button
                        variant="outlined"
                        onClick={() => navigate("/")}
                        sx={{ borderRadius: 20, px: 4, py: 1.5, "&:hover": { bgcolor: "#e3f2fd" } }}
                    >
                        Return to Home
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default Results;
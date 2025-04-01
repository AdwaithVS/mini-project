import React from "react";
import { Container, Paper, Typography, Button, Box, Card, CardContent } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";

const professionals = [
    { name: "Dr. Amal Krishna", specialty: "Clinical Psychologist", contact: "amal@mentalwellness.com" },
    { name: "Dr. Aaron Varghese", specialty: "Psychiatrist", contact: "aaron@mindcare.org" },
    { name: "Dr. Abhai Suresh", specialty: "Licensed Therapist", contact: "abhai@therapyconnect.com" },
    { name: "Dr. Adwaith V S", specialty: "Licensed Therapist", contact: "adwaith@therapyconnect.com" },
];

const MentalHealthResources = () => {
    const navigate = useNavigate();

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
                    Mental Health Support Resources
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 3, fontSize: "1.1rem" }}>
                    Your responses indicate moderate to severe mental health concerns. Prioritizing your well-being is important. Here are some helpful resources:
                </Typography>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" color="secondary" sx={{ mb: 1, fontWeight: 500 }}>
                        🌿 Self-Care Tips
                    </Typography>
                    {["Practice deep breathing and meditation", "Maintain a consistent sleep routine", "Engage in activities that bring joy"].map((tip, index) => (
                        <Typography key={index} variant="body2" sx={{ ml: 2, mb: 0.5, color: "#555" }}>
                            - {tip}
                        </Typography>
                    ))}
                </Box>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" color="secondary" sx={{ mb: 1, fontWeight: 500 }}>
                        📞 Mental Health Helplines
                    </Typography>
                    {["National Helpline: 1800-599-0019", "Local Mental Health Support Centers"].map((line, index) => (
                        <Typography key={index} variant="body2" sx={{ ml: 2, mb: 0.5, color: "#555" }}>
                            - {line}
                        </Typography>
                    ))}
                </Box>

                <Box>
                    <Typography variant="h6" color="secondary" sx={{ mb: 2, fontWeight: 500 }}>
                        Contact a Mental Health Professional
                    </Typography>
                    {professionals.map((prof, index) => (
                        <Card
                            key={index}
                            sx={{
                                mb: 2,
                                p: 2,
                                display: "flex",
                                alignItems: "center",
                                borderRadius: 2,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.12)" },
                            }}
                        >
                            <PersonIcon sx={{ fontSize: 40, color: "#1976d2", mr: 2 }} />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="body1" fontWeight="bold" sx={{ color: "#333" }}>{prof.name}</Typography>
                                <Typography variant="body2" color="textSecondary">{prof.specialty}</Typography>
                                <Typography variant="body2" color="textSecondary">{prof.contact}</Typography>
                            </CardContent>
                            <Button
                                variant="contained"
                                color="secondary"
                                sx={{ borderRadius: 20, px: 3, textTransform: "none", "&:hover": { bgcolor: "#b71c1c" } }}
                                href={`mailto:${prof.contact}`}
                            >
                                Contact
                            </Button>
                        </Card>
                    ))}
                </Box>

                <Box mt={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/")}
                        sx={{ borderRadius: 20, px: 4, py: 1.5, fontSize: "1rem", "&:hover": { bgcolor: "#1565c0" } }}
                    >
                        Home
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default MentalHealthResources;
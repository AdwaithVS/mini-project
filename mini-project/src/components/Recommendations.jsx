import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Paper, Typography, Button, Box, Card, CardContent, CardActions, IconButton, Tooltip } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import PersonIcon from "@mui/icons-material/Person";

const careerExperts = [
    { name: "Mr. Ramesh V", title: "Senior Career Counselor", contact: "+91 98765 43210" },
    { name: "Ms. Priya S", title: "Certified Career Coach", contact: "+91 87654 32109" },
];

const careerContacts = [
    { name: "National Career Service", contact: "1800-425-1514", website: "https://www.ncs.gov.in/" },
    { name: "AICTE Career Guidance", contact: "011-26131576", website: "https://www.aicte-india.org/" },
    { name: "University Career Cell", contact: "Contact your university's career office for personalized advice." },
];

const Recommendations = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const mentalHealthScore = location.state?.mentalHealthScore || 0;

    const getPlaceholderMessage = () => {
        if (mentalHealthScore <= 9) {
            return "Based on your responses, we will provide career recommendations once our AI-powered career database is integrated. Stay tuned!";
        } else {
            return "Your results indicate moderate to severe mental health concerns. Before career guidance, we recommend exploring mental health resources.";
        }
    };

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
                    Recommendations
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ mb: 3, fontSize: "1.1rem" }}>
                    {getPlaceholderMessage()}
                </Typography>

                <Box mt={4}>
                    <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
                        Career Guidance Experts
                    </Typography>
                    <Box display="flex" justifyContent="center" gap={3} flexWrap="wrap">
                        {careerExperts.map((expert, index) => (
                            <Card
                                key={index}
                                sx={{
                                    width: 280,
                                    borderRadius: 2,
                                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                    "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.12)" },
                                }}
                            >
                                <CardContent>
                                    <PersonIcon sx={{ fontSize: 50, color: "#1976d2", mb: 1 }} />
                                    <Typography variant="h6" fontWeight="bold" sx={{ color: "#333" }}>{expert.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">{expert.title}</Typography>
                                    <Typography variant="body2" sx={{ mt: 1, color: "#555" }}>📞 {expert.contact}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ borderRadius: 20, textTransform: "none", "&:hover": { bgcolor: "#e3f2fd" } }}
                                    >
                                        Contact
                                    </Button>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                </Box>

                <Box mt={4}>
                    <Typography variant="h5" color="primary" gutterBottom sx={{ fontWeight: 500 }}>
                        Career Guidance Institutes
                    </Typography>
                    {careerContacts.map((contact, index) => (
                        <Card
                            key={index}
                            sx={{
                                mt: 2,
                                borderRadius: 2,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.12)" },
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" sx={{ color: "#333" }}>{contact.name}</Typography>
                                <Typography variant="body2" color="textSecondary">{contact.contact}</Typography>
                            </CardContent>
                            {contact.website && (
                                <CardActions>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        href={contact.website}
                                        target="_blank"
                                        sx={{ borderRadius: 20, textTransform: "none", "&:hover": { bgcolor: "#e3f2fd" } }}
                                    >
                                        Visit Website
                                    </Button>
                                </CardActions>
                            )}
                        </Card>
                    ))}
                </Box>

                <Box mt={4} display="flex" justifyContent="center" gap={2}>
                    {mentalHealthScore > 9 && (
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
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/")}
                        sx={{ borderRadius: 20, px: 4, py: 1.5, "&:hover": { bgcolor: "#1565c0" } }}
                    >
                        Return to Home
                    </Button>
                </Box>
            </Paper>

            <Tooltip title="Chat with AI Assistant">
                <IconButton
                    sx={{
                        position: "fixed",
                        bottom: 20,
                        right: 20,
                        backgroundColor: "#388e3c",
                        color: "#fff",
                        "&:hover": { backgroundColor: "#2e7d32" },
                        width: 60,
                        height: 60,
                    }}
                    onClick={() => navigate("/chatbot")}
                >
                    <ChatIcon sx={{ fontSize: 32 }} />
                </IconButton>
            </Tooltip>
        </Container>
    );
};

export default Recommendations;
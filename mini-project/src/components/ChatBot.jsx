import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Button, Box } from "@mui/material";

const Chatbot = () => {
    const [userMessage, setUserMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);

    const handleSendMessage = async () => {
        if (!userMessage.trim()) return;

        const newChat = [...chatHistory, { sender: "user", text: userMessage }];
        setChatHistory(newChat);

        setTimeout(() => {
            setChatHistory([...newChat, { sender: "bot", text: "I'm here to help!" }]);
        }, 1000);

        setUserMessage("");
    };

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: 3,
                    background: "linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
            >
                <Typography variant="h5" textAlign="center" sx={{ fontFamily: "'Roboto', sans-serif", fontWeight: 600, color: "#1976d2" }}>
                    AI Chatbot
                </Typography>
                <Box
                    sx={{
                        mt: 2,
                        height: "300px",
                        overflowY: "auto",
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        p: 2,
                        background: "#fff",
                    }}
                >
                    {chatHistory.map((msg, index) => (
                        <Typography
                            key={index}
                            sx={{
                                textAlign: msg.sender === "user" ? "right" : "left",
                                mb: 1,
                                p: 1,
                                borderRadius: 2,
                                bgcolor: msg.sender === "user" ? "#e3f2fd" : "#f0f0f0",
                                maxWidth: "100%",
                                display: "block",
                            }}
                        >
                            <strong>{msg.sender === "user" ? "You: " : "Bot: "}</strong>{msg.text}
                        </Typography>
                    ))}
                </Box>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Type your message..."
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    sx={{ mt: 2, "& .MuiOutlinedInput-root": { borderRadius: 20 } }}
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, borderRadius: 20, py: 1.5, "&:hover": { bgcolor: "#1565c0" } }}
                    onClick={handleSendMessage}
                >
                    Send
                </Button>
            </Paper>
        </Container>
    );
};

export default Chatbot;
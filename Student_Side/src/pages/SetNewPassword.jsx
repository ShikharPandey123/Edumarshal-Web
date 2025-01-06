
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Paper,
    CircularProgress,
    Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/lab/Alert";

import axios from "axios";
import Cookies from "js-cookie";

const SetNewPassword = () => {
    const [newPassword, setnewPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storednewPassword = Cookies.get("rememberednewPassword");
        if (storednewPassword) setUsername(storednewPassword);
    }, []);

    const signIn = async () => {
        try {
            setLoading(true);
            const item = { newPassword, otp };
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_API}/v1/student/setNewPassword`,
                item,
                { withCredentials: true }
            );
            if (response.status === 200) {
                setSnackbarOpen(true);
                navigate("/", {
                    state: { successMessage: "Successfully logged in!" },
                });
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            setSnackbarMessage("Invalid Credentials! Please try again later.");
            setSnackbarOpen(true);
            console.error("An error occurred during login", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <div
            style={{
                backgroundImage: `url(./Loginbg.png)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
            }}
        >
            {loading && (
                <CircularProgress
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                />
            )}
            <Paper
                style={{
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    paddingTop: 60,
                    paddingBottom: 60,
                    paddingLeft: 40,
                    paddingRight: 40,
                    borderRadius: "10px",
                    width: "100%",
                    maxWidth: "400px",
                    backdropFilter: "blur(10px)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <h1
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: "550",
                            marginBottom: "16px",
                        }}
                    >
                        Set New Password
                    </h1>

                    <TextField
                        variant="outlined"
                        style={{ width: "100%", marginBottom: "24px" }}
                        label="Enter Your New Password"
                        value={newPassword}
                        onChange={(e) => setnewPassword(e.target.value)}
                        placeholder=""
                        autoComplete="newPassword"
                    />
                  

                    <Button
                        style={{
                            backgroundColor: "#004BB8",
                            color: "white",
                            width: "100%",
                            maxWidth: "400px",
                            padding: "12px",
                            borderRadius: "5px",
                            "&:hover": {
                                backgroundColor: "skyblue",
                            },
                        }}
                        onClick={signIn}
                        disabled={loading}
                    >
                        {loading ? (
                            <CircularProgress
                                size={20}
                                style={{ color: "white" }}
                            />
                        ) : (
                            "Set Password"
                        )}
                    </Button>

                   
                </div>
            </Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <MuiAlert
                    onClose={handleSnackbarClose}
                    severity="error"
                    elevation={6}
                    variant="filled"
                >
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </div>
    );
};

export default SetNewPassword;


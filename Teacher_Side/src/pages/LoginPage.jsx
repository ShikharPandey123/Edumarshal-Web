import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    TextField,
    Button,
    Checkbox,
    FormControlLabel,
    Paper,
    IconButton,
    InputAdornment,
    CircularProgress,
    Snackbar,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import MuiAlert from "@mui/lab/Alert";
import axios from "axios";
import Cookies from "js-cookie";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [emailError, setEmailError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedEmail = Cookies.get("rememberedEmail");
        const storedPassword = Cookies.get("rememberedPassword");
        const storedRememberMe = Cookies.get("rememberMe");

        if (storedRememberMe && storedEmail && storedPassword) {
            setEmail(storedEmail);
            setPassword(storedPassword);
            setRememberMe(true);
        }
    }, []);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        if (!validateEmail(newEmail)) {
            setEmailError("Invalid email format");
        } else {
            setEmailError("");
        }
    };

    const signIn = async () => {
        if (!navigator.onLine) {
            setSnackbarMessage("No internet connectivity. Please check your connection and try again.");
            setSnackbarOpen(true);
            return;
        }

        if (!validateEmail(email)) {
            setSnackbarMessage("Please enter a valid email.");
            setSnackbarOpen(true);
            return;
        }

        try {
            setLoading(true);

            const item = { email, password };

            const response = await axios.post(
                'https://akgec-edu.onrender.com/v1/teacher/login', 
                item,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                if (rememberMe) {
                    Cookies.set("rememberedEmail", email);
                    Cookies.set("rememberedPassword", password);
                    Cookies.set("rememberMe", true);
                } else {
                    Cookies.remove("rememberedEmail");
                    Cookies.remove("rememberedPassword");
                    Cookies.remove("rememberMe");
                }

                setSnackbarOpen(true);
                navigate("/dashboard", {
                    state: { successMessage: "Successfully logged in!" },
                });
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            if (!error.response) {
                setSnackbarMessage("No internet connectivity. Please check your connection and try again.");
            } else {
                setSnackbarMessage("Invalid Credentials! Please try again later.");
            }
            setSnackbarOpen(true);
            console.error("An error occurred during login", error);
        } finally {
            setLoading(false);
        }
    };

    const handleShowPasswordToggle = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
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
                            fontSize: "2.0rem",
                            fontWeight: "550",
                            marginBottom: "16px",
                        }}
                    >
                        Teacher Login
                    </h1>
                    <TextField
                        variant="outlined"
                        style={{ width: "100%", marginBottom: "24px" }}
                        label="Email"
                        value={email}
                        onChange={handleEmailChange}
                        placeholder="Enter Your Email"
                        autoComplete="email"
                        error={!!emailError}
                        helperText={emailError}
                        InputProps={{
                            style: {
                                backgroundColor: "rgba(255, 255, 255, 0.1)"
                            }
                        }}
                        InputLabelProps={{
                            style: {
                                backgroundColor: "rgba(255, 255, 255, 0)"
                            }
                        }}
                    />

                    <TextField
                        variant="outlined"
                        style={{ width: "100%", marginBottom: "24px" }}
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your password"
                        autoComplete="current-password"
                        InputProps={{
                            style: {
                                backgroundColor: "rgba(255, 255, 255, 0.1)"
                            },
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleShowPasswordToggle}
                                        style={{ color: "#004BB8" }}
                                    >
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        InputLabelProps={{
                            style: {
                                backgroundColor: "rgba(0,0,0,0)"
                            }
                        }}
                    />


                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "flex-start",
                            marginBottom: "0.8rem",
                        }}
                    >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    color="primary"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(!rememberMe)}
                                />
                            }
                            label="Remember me"
                        />
                    </div>

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
                            "Login"
                        )}
                    </Button>

                    <div className="text-center pt-4 font-normal text-sm ">
                        <span className="font-semibold">
                            Forgot Your Password?{" "}
                        </span>
                        <Link
                            to="/resetPassword"
                            className="text-[#dae9ff] font-normal underline"
                        >
                            Reset Password
                        </Link>
                    </div>
                </div>
            </Paper>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
            >
                <MuiAlert
                    onClose={handleSnackbarClose}
                    severity="success"
                    elevation={6}
                    variant="filled"
                >
                    Successfully logged in!
                </MuiAlert>
            </Snackbar>
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

export default LoginPage;

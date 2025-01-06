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
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [backgroundLoaded, setBackgroundLoaded] = useState(false); // Track background image loading state
    const navigate = useNavigate();

    useEffect(() => {
        // Load background image
        const img = new Image();
        img.src = "./Loginbg.png";
        img.onload = () => {
            setBackgroundLoaded(true);
        };

        // Load remembered user data
        const storedUsername = Cookies.get("rememberedUsername");
        const storedPassword = Cookies.get("rememberedPassword");
        const storedDob = Cookies.get("rememberedDob");
        const storedRememberMe = Cookies.get("rememberMe");

        if (storedRememberMe && storedUsername && storedPassword && storedDob) {
            setUsername(storedUsername);
            setPassword(storedPassword);
            setDob(storedDob);
            setRememberMe(true);
        }
    }, []);

    const signIn = async () => {
        try {
            setLoading(true);

            const formattedDate = dob.split("-").reverse().join("-");
            const item = { username, password, dob: formattedDate };

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_API}/v1/student/login`,
                item,
                {
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                if (rememberMe) {
                    // Store information in cookies
                    Cookies.set("rememberedUsername", username);
                    Cookies.set("rememberedPassword", password);
                    Cookies.set("rememberedDob", dob);
                    Cookies.set("rememberMe", true);
                } else {
                    // Remove cookies if "Remember me" is not checked
                    Cookies.remove("rememberedUsername");
                    Cookies.remove("rememberedPassword");
                    Cookies.remove("rememberedDob");
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
            // Handle any error and display a Snackbar
            // setSnackbarMessage('An error occurred during login. Please try again later.');
            setSnackbarMessage("Invalid Credentials! Please try again later.");
            setSnackbarOpen(true);
            console.error("An error occurred during login", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDateChange = (e) => {
        setDob(e.target.value);
    };

    const handleShowPasswordToggle = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value)) {
            setUsername(value);
        }
    };

    return (
        <div
            style={{
                position: "relative", // Make sure position is relative
                minHeight: "100vh",
                backgroundImage: backgroundLoaded ? `url(./Loginbg.png)` : "none", // Apply background image conditionally
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            {backgroundLoaded && (
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
                        margin: "auto",
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
                                fontFamily: "sans-serif",
                            }}
                        >
                            Login
                        </h1>

                            <TextField
                        variant="outlined"
                        style={{ width: "100%", marginBottom: "24px" }}
                        label="Username"
                        value={username}
                        onChange={handleUsernameChange}
                        placeholder="Enter Your Username"
                        autoComplete="username"
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
                    />

                    <TextField
                        variant="outlined"
                        style={{ width: "100%", marginBottom: "0.8rem" }}
                        label=""
                        type="date"
                        value={dob}
                        onChange={handleDateChange}
                        placeholder="Enter Your Date Of Birth"
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
                        <span className="font-bold font-sans">
                            Forgot Your Password?{" "}
                        </span>
                        <Link
                            to="/resetPassword"
                            className="text-white font-normal font-sans"
                        >
                            Reset Password
                        </Link>
                    </div>
                </div>
                       
                    
                </Paper>
            )}

            {!backgroundLoaded && (
                <div
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                    }}
                >
                    <CircularProgress />
                </div>
            )}

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

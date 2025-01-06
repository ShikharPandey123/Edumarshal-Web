import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Exams from "./pages/Exams";
import Events from "./pages/Events";
import Dashboard from "./pages/Dashboard";
import Classroom from "./pages/Classroom";
import LoginPage from "./pages/LoginPage";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";
import SetNewPassword from "./pages/SetNewPassword";
export default function App() {
    return (
        <Router>
            <Routes>
            <Route exact path="/Exams" element={<Exams/>} />
            <Route exact path="/dashboard" element={<Dashboard/>} />
            <Route exact path="/" element= {<LoginPage/>} />
           < Route exact path="/resetPassword" element={<ResetPassword />} />
                <Route exact path="/VerifyOtp" element={<VerifyOtp />} />
                <Route exact path="/SetNewPassword" element={<SetNewPassword />} />
            <Route exact path="/Classroom" element={<Classroom/>} />
            <Route exact path="/Events" element={<Events/>} />
            <Route exact path="/login" element={<LoginPage/>} />
            </Routes>
        </Router>
    );
}
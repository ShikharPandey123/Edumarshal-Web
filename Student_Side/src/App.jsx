import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoardPage from "./pages/DashBoardPage";
import ProfilePage from "./pages/ProfilePage";
import Classroom from "./pages/Classroom";
import Fees from "./pages/Fees";
import LoginPage from "./pages/LoginPage";
import Events from "./pages/Events";
import PlacementPage from "./pages/Placement";
import Hostel from "./pages/Hostel";
import CustomerCare from "./pages/CustomerCare";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";
import { SetMealTwoTone } from "@mui/icons-material";
import SetNewPassword from "./pages/SetNewPassword";
import PyqPapers from "./pages/PyqPapers";
export default function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<LoginPage />} />
                <Route exact path="/resetPassword" element={<ResetPassword />} />
                <Route exact path="/VerifyOtp" element={<VerifyOtp />} />
                <Route exact path="/SetNewPassword" element={<SetNewPassword />} />
                <Route exact path="/dashboard" element={<DashBoardPage />} />
                <Route exact path="/profile" element={<ProfilePage />} />
                {/* <Route exact path="/hostelpage" element={<HostelPage />} /> */}
                <Route exact path="/Classroom" element={<Classroom/>}/>
                <Route exact path="/Hostel" element={<Hostel/>}/>
                <Route exact path="/Fees" element={<Fees/>}/>
                <Route exact path="/events" element={<Events/>}/>
                <Route exact path="/placement" element={<PlacementPage/>}/>
                <Route exact path="/pyqpapers" element={<PyqPapers/>}/>
            </Routes>
        </Router>
    );
}
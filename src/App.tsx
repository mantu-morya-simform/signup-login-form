import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginSignup from "./component/LoginSignup";
import Profile from "./pages/Profile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginSignup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

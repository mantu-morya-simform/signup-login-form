import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginSignup from "./component/LoginSignup";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthProvider";
import RequiredAuth from "./context/RequiredAuth";
import Home from "./component/Home";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            <RequiredAuth>
              <Home />
            </RequiredAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequiredAuth>
              <Profile />
            </RequiredAuth>
          }
        />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

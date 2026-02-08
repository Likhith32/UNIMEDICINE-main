// src/App.jsx

import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation,
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AIChat from "./pages/AIChat";
import NearbyPlaces from "./pages/NearbyPlaces";
import ImageDiagnosis from "./pages/ImageDiagnosis";
import DoctorConnect from "./pages/DoctorConnect";
import DoctorDashboard from "./pages/DoctorDashboard";

import SmartOTC from "./pages/SmartOTC";

import AppLoader from "./components/AppLoader"; // ⬅️ loader component

// -------------- Protected Route Wrapper -------------- //

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

// -------------- Fixed Navbar (shown on all logged-in pages) -------------- //

const Navbar = () => {
  const { isAuthenticated, role, user, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return null; // no navbar on login

  const handleLogout = () => {
    logout();
  };

  const isActive = (path) =>
    location.pathname === path
      ? {
          backgroundColor: "rgba(139, 92, 246, 0.15)",
          borderLeftColor: "#8b5cf6",
        }
      : {};

  return (
    <nav style={styles.nav}>
      <div style={styles.navInner}>
        {/* Brand */}
        <div style={styles.brand}>
          <div style={styles.brandIcon}>
            <span style={styles.brandIconInner}>✦</span>
          </div>
          <span style={styles.brandText}>UniCare</span>
        </div>

        {/* Links */}
        <div style={styles.links}>
          <Link to="/" style={{ ...styles.link, ...isActive("/") }}>
            Dashboard
          </Link>

          {role === "student" && (
            <>
              <Link to="/ai" style={{ ...styles.link, ...isActive("/ai") }}>
                AI Chat
              </Link>
              <Link
                to="/nearby-places"
                style={{ ...styles.link, ...isActive("/nearby-places") }}
              >
                Nearby
              </Link>
              <Link
                to="/image-diagnosis"
                style={{ ...styles.link, ...isActive("/image-diagnosis") }}
              >
                Image Check
              </Link>
              <Link
                to="/doctor-connect"
                style={{ ...styles.link, ...isActive("/doctor-connect") }}
              >
                Doctor Chat
              </Link>
            </>
          )}

          {role === "doctor" && (
            <Link
              to="/doctor-dashboard"
              style={{
                ...styles.link,
                ...isActive("/doctor-dashboard"),
              }}
            >
              Doctor Dashboard
            </Link>
          )}
        </div>

        {/* User + logout */}
        <div style={styles.right}>
          <span style={styles.userText}>
            {role === "student" && user?.name
              ? `Student: ${user.name}`
              : role === "doctor" && user?.name
              ? `Doctor: ${user.name}`
              : "Logged in"}
          </span>
          <button onClick={handleLogout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

// -------------- Main App Component -------------- //

function App() {
  // loader when app first opens / initializes
  const [bootLoading, setBootLoading] = useState(true);

  useEffect(() => {
    // you can replace this timeout with real init logic (e.g. checking auth)
    const timer = setTimeout(() => setBootLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (bootLoading) {
    return <AppLoader />;
  }

  return (
    <BrowserRouter>
      <Navbar />

      {/* paddingTop so content is not hidden behind fixed navbar */}
      <div style={{ paddingTop: "72px" }}>
        <Routes>
          {/* Public route: Login */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ai"
            element={
              <ProtectedRoute>
                <AIChat />
              </ProtectedRoute>
            }
          />

         
          <Route
            path="/smart-otc"
            element={
              <ProtectedRoute>
                <SmartOTC />
              </ProtectedRoute>
            }
          />

          <Route
            path="/nearby-places"
            element={
              <ProtectedRoute>
                <NearbyPlaces />
              </ProtectedRoute>
            }
          />

          <Route
            path="/image-diagnosis"
            element={
              <ProtectedRoute>
                <ImageDiagnosis />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor-connect"
            element={
              <ProtectedRoute>
                <DoctorConnect />
              </ProtectedRoute>
            }
          />

          <Route
            path="/doctor-dashboard"
            element={
              <ProtectedRoute>
                <DoctorDashboard />
              </ProtectedRoute>
            }
          />

          {/* fallback */}
          <Route
            path="*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// -------------- Navbar styles -------------- //

const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(240,231,255,0.96) 100%)",
    borderBottom: "1px solid rgba(139, 92, 246, 0.18)",
    boxShadow: "0 4px 24px rgba(148, 106, 255, 0.15)",
    backdropFilter: "blur(12px)",
  },
  navInner: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0.75rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1.5rem",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  brandIcon: {
    width: "38px",
    height: "38px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    boxShadow:
      "0 8px 18px rgba(139, 92, 246, 0.55), inset 0 1px 0 rgba(255,255,255,0.4)",
  },
  brandIconInner: {
    fontSize: "1.3rem",
  },
  brandText: {
    fontWeight: 700,
    fontSize: "1.2rem",
    background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  links: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    flex: 1,
    marginLeft: "1.5rem",
  },
  link: {
    padding: "0.45rem 0.9rem",
    borderRadius: "999px",
    borderLeft: "3px solid transparent",
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "#475569",
    textDecoration: "none",
    transition: "all 0.2s ease",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  userText: {
    fontSize: "0.8rem",
    color: "#64748b",
  },
  logoutButton: {
    border: "none",
    borderRadius: "999px",
    padding: "0.4rem 0.9rem",
    fontSize: "0.8rem",
    fontWeight: 600,
    backgroundColor: "#f97373",
    color: "#fff",
    cursor: "pointer",
  },
};

export default App;

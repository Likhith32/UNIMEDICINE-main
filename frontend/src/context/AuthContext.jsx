// src/context/AuthContext.jsx

import React, { createContext, useContext, useEffect, useState } from "react";

// Vite way of reading env vars
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null); // student or doctor object
  const [role, setRole] = useState(null); // "student" | "doctor"
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("auth_token");
      const savedUser = localStorage.getItem("auth_user");
      const savedRole = localStorage.getItem("auth_role");

      if (savedToken && savedUser && savedRole) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        setRole(savedRole);
      }
    } catch (err) {
      console.error("Error reading auth from localStorage:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Persist to localStorage whenever token/user/role changes
  useEffect(() => {
    try {
      if (token && user && role) {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_user", JSON.stringify(user));
        localStorage.setItem("auth_role", role);
      } else {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        localStorage.removeItem("auth_role");
      }
    } catch (err) {
      console.error("Error writing auth to localStorage:", err);
    }
  }, [token, user, role]);

  // ---------- Student login ---------- //

  const loginStudent = async ({ name, level, branch, year, hostel, department }) => {
    try {
      const payload =
        level === "UG"
          ? { name, level, branch, year, hostel }
          : { name, level, department, hostel };

      const res = await fetch(`${API_BASE_URL}/api/auth/student-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.errors?.join(", ") || errorData.error || "Student login failed"
        );
      }

      const data = await res.json();
      setToken(data.token);
      setUser(data.user);
      setRole("student");
      return { success: true, user: data.user };
    } catch (err) {
      console.error("Student login error:", err);
      return { success: false, error: err.message || "Student login failed" };
    }
  };

  // ---------- Doctor login ---------- //

  const loginDoctor = async ({ email, password }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/doctor-login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(
          errorData.errors?.join(", ") || errorData.error || "Doctor login failed"
        );
      }

      const data = await res.json();
      setToken(data.token);
      setUser(data.doctor);
      setRole("doctor");
      return { success: true, doctor: data.doctor };
    } catch (err) {
      console.error("Doctor login error:", err);
      return { success: false, error: err.message || "Doctor login failed" };
    }
  };

  // ---------- Logout ---------- //

  const logout = () => {
    setToken(null);
    setUser(null);
    setRole(null);
    // localStorage gets cleared via useEffect
  };

  const authHeaders = token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};

  const value = {
    token,
    user,
    role,
    loading,
    isAuthenticated: !!token,
    loginStudent,
    loginDoctor,
    logout,
    authHeaders,
    apiBaseUrl: API_BASE_URL,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};

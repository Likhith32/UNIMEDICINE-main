// UserContext.js placeholder
// src/context/UserContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const { user: authUser, role } = useAuth();

  // This will store student-specific info in a convenient shape
  const [studentProfile, setStudentProfile] = useState(null);

  // Whenever authUser or role changes, sync to studentProfile
  useEffect(() => {
    if (role === "student" && authUser) {
      // authUser comes directly from backend:
      // { id, name, level, branch, year, department, hostel }
      setStudentProfile({
        id: authUser.id,
        name: authUser.name,
        level: authUser.level,           // "UG" or "PG"
        branch: authUser.branch || "",   // mostly UG
        year: authUser.year || null,
        department: authUser.department || "",
        hostel: authUser.hostel,
      });
    } else {
      setStudentProfile(null);
    }
  }, [authUser, role]);

  const updateStudentProfile = (updates) => {
    setStudentProfile((prev) => (prev ? { ...prev, ...updates } : prev));
  };

  const value = {
    studentProfile,
    isStudent: role === "student",
    updateStudentProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return ctx;
};

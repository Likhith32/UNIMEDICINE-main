<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppLoader from "../components/AppLoader";
import { motion, AnimatePresence } from "framer-motion";
=======
// src/pages/LoginPage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppLoader from "../components/AppLoader"; // ⬅️ added
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

const HOSTELS = [
  "Boys Hostel 1",
  "Boys Hostel 2",
  "Girls Hostel 1",
  "Girls Hostel 2",
];

const LoginPage = () => {
  const { loginStudent, loginDoctor, isAuthenticated, role, user } = useAuth();
<<<<<<< HEAD
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState(() => {
    const saved = localStorage.getItem("login_mode");
    return saved || "student";
  });
  const [level, setLevel] = useState("UG");
  const isDoctor = mode === "doctor";
=======

  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState("student"); // "student" | "doctor"
  const [level, setLevel] = useState("UG"); // UG | PG
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

  const [studentForm, setStudentForm] = useState({
    name: "",
    branch: "",
    year: 1,
    department: "",
    hostel: HOSTELS[0],
  });

  const [doctorForm, setDoctorForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
<<<<<<< HEAD
  const [failedAttempts, setFailedAttempts] = useState(0);

  // Responsive state
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );

  // Screen size detection
  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setIsMobile(w < 768);
      setIsTablet(w >= 768 && w < 1024);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Prevent authenticated users from seeing login
  useEffect(() => {
    if (isAuthenticated) {
      navigate(role === "doctor" ? "/doctor-dashboard" : "/", { replace: true });
    }
  }, [isAuthenticated, role, navigate]);

  // Redirect after login
  useEffect(() => {
    if (!isAuthenticated || !role) return;

    const from = location.state?.from?.pathname;
    if (from && from !== "/login") {
      navigate(from, { replace: true });
    } else if (role === "doctor") {
      navigate("/doctor-dashboard", { replace: true });
    } else {
=======

  // 🔁 After successful login, redirect based on role
  useEffect(() => {
    if (!isAuthenticated || !role) return;

    // If we were redirected here from a protected route, go back there
    const from = location.state?.from?.pathname;

    if (from && from !== "/login") {
      navigate(from, { replace: true });
    } else if (role === "doctor") {
      // Doctors → doctor dashboard
      navigate("/doctor-dashboard", { replace: true });
    } else {
      // Students → main dashboard
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, role, navigate, location.state]);

<<<<<<< HEAD
  // Save login mode preference
  useEffect(() => {
    localStorage.setItem("login_mode", mode);
  }, [mode]);

  // Clear error on mode/level switch
  useEffect(() => {
    setError(null);
  }, [mode, level]);
=======
  const handleStudentChange = (e) => {
    const { name, value } = e.target;
    setStudentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleDoctorChange = (e) => {
    const { name, value } = e.target;
    setDoctorForm((prev) => ({ ...prev, [name]: value }));
  };
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setError(null);
<<<<<<< HEAD

    // Validation
    if (!studentForm.name.trim()) {
      setError("Name is required");
      return;
    }

    if (level === "UG" && !studentForm.branch.trim()) {
      setError("Branch is required for UG students");
      return;
    }

    if (level === "PG" && !studentForm.department.trim()) {
      setError("Department is required for PG students");
      return;
    }

=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    setSubmitting(true);

    const payload =
      level === "UG"
        ? {
<<<<<<< HEAD
            name: studentForm.name.trim(),
            level,
            branch: studentForm.branch.trim(),
=======
            name: studentForm.name,
            level,
            branch: studentForm.branch,
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
            year: Number(studentForm.year),
            hostel: studentForm.hostel,
          }
        : {
<<<<<<< HEAD
            name: studentForm.name.trim(),
            level,
            department: studentForm.department.trim(),
=======
            name: studentForm.name,
            level,
            department: studentForm.department,
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
            hostel: studentForm.hostel,
          };

    const res = await loginStudent(payload);
    if (!res.success) {
      setError(res.error || "Student login failed");
<<<<<<< HEAD
      setFailedAttempts((prev) => prev + 1);
    }
=======
    }

>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    setSubmitting(false);
  };

  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    setError(null);
<<<<<<< HEAD

    // Check failed attempts throttling
    if (failedAttempts >= 3) {
      setError("Too many failed attempts. Please try again later.");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(doctorForm.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (doctorForm.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setSubmitting(true);

    const res = await loginDoctor(doctorForm);
    if (!res.success) {
      setError(res.error || "Doctor login failed");
      setFailedAttempts((prev) => prev + 1);
    } else {
      setFailedAttempts(0);
    }
    setSubmitting(false);
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    setFailedAttempts(0);
  };

  const getResponsiveStyles = () => ({
    page: {
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: isDoctor
        ? "radial-gradient(circle at top,#020617,#0c4a6e,#020617)"
        : "radial-gradient(circle at top,#e0f2fe,#fdf2ff,#fef9c3)",
      backgroundSize: "200% 200%",
      animation: "bgShift 16s infinite",
      padding: isMobile ? "1rem" : isTablet ? "1.5rem" : "2rem",
    },
    card: {
      width: "100%",
      maxWidth: isMobile ? "100%" : isTablet ? 400 : 440,
      background: isDoctor ? "#020617" : "#fff",
      color: isDoctor ? "#e5e7eb" : "#000",
      padding: isMobile ? "1.5rem" : isTablet ? "1.75rem" : "2rem",
      borderRadius: isMobile ? 16 : 20,
      position: "relative",
      overflow: "hidden",
      border: isDoctor ? "1px solid rgba(148,163,184,.2)" : "none",
      boxShadow: isDoctor
        ? "0 20px 50px rgba(0,0,0,.5), 0 0 60px rgba(14,165,233,.3)"
        : "0 20px 50px rgba(0,0,0,.15)",
    },
    brand: {
      textAlign: "center",
      marginBottom: isMobile ? 16 : 20,
    },
    logo: {
      fontSize: isMobile ? "2.2rem" : isTablet ? "2.5rem" : "2.8rem",
      marginBottom: 8,
    },
    appName: {
      margin: 0,
      fontWeight: 800,
      fontSize: isMobile ? "1.3rem" : isTablet ? "1.4rem" : "1.5rem",
    },
    tagline: {
      fontSize: isMobile ? 12 : 13,
      opacity: 0.8,
      marginTop: 4,
    },
    toggleRow: {
      position: "relative",
      display: "flex",
      marginBottom: isMobile ? 16 : 20,
      background: isDoctor ? "#0f172a" : "#f3f4f6",
      borderRadius: 999,
      padding: 4,
      border: isDoctor ? "1px solid rgba(148,163,184,.2)" : "none",
    },
    toggleSlider: {
      position: "absolute",
      width: "calc(50% - 4px)",
      height: "calc(100% - 8px)",
      background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
      borderRadius: 999,
      top: 4,
      boxShadow: "0 4px 12px rgba(99,102,241,.4)",
    },
    toggleBtn: {
      flex: 1,
      padding: isMobile ? ".5rem" : ".55rem",
      background: "transparent",
      border: "none",
      cursor: "pointer",
      zIndex: 1,
      fontWeight: 600,
      fontSize: isMobile ? 13 : 14,
      transition: "color .3s ease",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? 12 : 14,
    },
    fieldGroup: {
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? 12 : 14,
    },
    field: {
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? 5 : 6,
    },
    label: {
      fontSize: isMobile ? 11 : 12,
      fontWeight: 600,
      opacity: 0.8,
    },
    inputWrapper: {
      position: "relative",
    },
    inputIcon: {
      position: "absolute",
      left: isMobile ? 10 : 12,
      top: "50%",
      transform: "translateY(-50%)",
      fontSize: isMobile ? "1rem" : "1.1rem",
      pointerEvents: "none",
      opacity: 0.6,
    },
    input: {
      width: "100%",
      padding: isMobile ? ".65rem .75rem" : ".7rem .8rem",
      borderRadius: 999,
      border: "1px solid #c7d2fe",
      outline: "none",
      fontSize: isMobile ? 13 : 14,
      transition: "all .2s ease",
      boxSizing: "border-box",
      background: isDoctor ? "rgba(255,255,255,0.05)" : "#fff",
      color: isDoctor ? "#e5e7eb" : "#000",
    },
    select: {
      padding: isMobile ? ".65rem .75rem" : ".7rem .8rem",
      borderRadius: 999,
      border: "1px solid #c7d2fe",
      outline: "none",
      fontSize: isMobile ? 13 : 14,
      cursor: "pointer",
      transition: "all .2s ease",
      background: isDoctor ? "rgba(255,255,255,0.05)" : "#fff",
      color: isDoctor ? "#e5e7eb" : "#000",
    },
    radioRow: {
      display: "flex",
      gap: isMobile ? 16 : 20,
      fontSize: isMobile ? 13 : 14,
      marginTop: 4,
    },
    radioLabel: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      cursor: "pointer",
    },
    radio: {
      cursor: "pointer",
      width: isMobile ? 15 : 16,
      height: isMobile ? 15 : 16,
    },
    submit: {
      marginTop: isMobile ? 10 : 12,
      padding: isMobile ? ".7rem" : ".75rem",
      borderRadius: 999,
      border: "none",
      background: isDoctor
        ? "linear-gradient(135deg,#0ea5e9,#22d3ee)"
        : "linear-gradient(135deg,#6366f1,#8b5cf6)",
      color: "#fff",
      fontWeight: 700,
      fontSize: isMobile ? 14 : 15,
      cursor: "pointer",
      transition: "all .2s ease",
      boxShadow: isDoctor
        ? "0 4px 12px rgba(14,165,233,.4)"
        : "0 4px 12px rgba(99,102,241,.3)",
    },
    submitDisabled: {
      opacity: 0.6,
      cursor: "not-allowed",
    },
    error: {
      fontSize: isMobile ? 12 : 13,
      color: "#ef4444",
      padding: isMobile ? ".45rem .7rem" : ".5rem .8rem",
      background: "rgba(239,68,68,.1)",
      borderRadius: isMobile ? 10 : 12,
      border: "1px solid rgba(239,68,68,.2)",
      animation: "shake .3s",
      textAlign: "center",
    },
    security: {
      marginTop: 8,
      fontSize: isMobile ? 11 : 12,
      textAlign: "center",
      opacity: 0.7,
    },
    footer: {
      marginTop: isMobile ? 16 : 20,
      fontSize: isMobile ? 11 : 12,
      textAlign: "center",
      opacity: 0.6,
    },
  });

  const styles = getResponsiveStyles();

  return (
    <>
      {submitting && <AppLoader />}

      <motion.div
        style={styles.page}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <style>{keyframes}</style>

        <motion.div
          style={styles.card}
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* BRAND */}
          <motion.div
            style={styles.brand}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.div
              style={styles.logo}
              animate={isDoctor ? { scale: [1, 1.1, 1] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              {isDoctor ? "🩺" : "🎓"}
            </motion.div>
            <h1 style={styles.appName}>Uni Telemedicine</h1>
            <p style={styles.tagline}>
              {isDoctor
                ? "Secure access for campus doctors"
                : "Smart healthcare for campus life"}
            </p>
          </motion.div>

          {/* MODE TOGGLE */}
          <div style={styles.toggleRow}>
            <motion.div
              style={styles.toggleSlider}
              animate={{ left: isDoctor ? "50%" : "0%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              style={{
                ...styles.toggleBtn,
                color: !isDoctor ? "#fff" : "inherit",
              }}
              onClick={() => handleModeChange("student")}
=======
    setSubmitting(true);

    const res = await loginDoctor({
      email: doctorForm.email,
      password: doctorForm.password,
    });

    if (!res.success) {
      setError(res.error || "Doctor login failed");
    }

    setSubmitting(false);
  };

  return (
    <>
      {/* Full-screen loader while submitting */}
      {submitting && <AppLoader />}

      <div style={styles.page}>
        <div style={styles.card}>
          <h2 style={styles.title}>University Telemedicine Login</h2>

          {isAuthenticated && (
            <p style={styles.loggedInInfo}>
              Logged in as{" "}
              <strong>
                {user?.name || user?.email || "User"} ({role})
              </strong>
            </p>
          )}

          <div style={styles.toggleRow}>
            <button
              type="button"
              onClick={() => setMode("student")}
              style={{
                ...styles.toggleButton,
                ...(mode === "student" ? styles.toggleButtonActive : {}),
              }}
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
            >
              Student
            </button>
            <button
<<<<<<< HEAD
              style={{
                ...styles.toggleBtn,
                color: isDoctor ? "#fff" : "inherit",
              }}
              onClick={() => handleModeChange("doctor")}
=======
              type="button"
              onClick={() => setMode("doctor")}
              style={{
                ...styles.toggleButton,
                ...(mode === "doctor" ? styles.toggleButtonActive : {}),
              }}
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
            >
              Doctor
            </button>
          </div>

<<<<<<< HEAD
          {/* FORMS */}
          <AnimatePresence mode="wait">
            {mode === "student" ? (
              <motion.form
                key="student-form"
                style={styles.form}
                onSubmit={handleStudentSubmit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatedInput
                  label="Name"
                  icon="👤"
                  value={studentForm.name}
                  onChange={(e) =>
                    setStudentForm({ ...studentForm, name: e.target.value })
                  }
                  isMobile={isMobile}
                  styles={styles}
                />

                <motion.div
                  style={styles.radioRow}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      checked={level === "UG"}
                      onChange={() => setLevel("UG")}
                      style={styles.radio}
                    />{" "}
                    UG
                  </label>
                  <label style={styles.radioLabel}>
                    <input
                      type="radio"
                      checked={level === "PG"}
                      onChange={() => setLevel("PG")}
                      style={styles.radio}
                    />{" "}
                    PG
                  </label>
                </motion.div>

                <AnimatePresence mode="wait">
                  {level === "UG" ? (
                    <motion.div
                      key="ug-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      style={styles.fieldGroup}
                    >
                      <AnimatedInput
                        label="Branch"
                        icon="🎯"
                        value={studentForm.branch}
                        onChange={(e) =>
                          setStudentForm({
                            ...studentForm,
                            branch: e.target.value,
                          })
                        }
                        isMobile={isMobile}
                        styles={styles}
                      />
                      <motion.select
                        style={styles.select}
                        value={studentForm.year}
                        onChange={(e) =>
                          setStudentForm({
                            ...studentForm,
                            year: e.target.value,
                          })
                        }
                        whileFocus={{ scale: isMobile ? 1 : 1.02 }}
=======
          {mode === "student" ? (
            <>
              <div style={styles.levelRow}>
                <label>
                  <input
                    type="radio"
                    name="level"
                    value="UG"
                    checked={level === "UG"}
                    onChange={() => setLevel("UG")}
                  />{" "}
                  UG
                </label>
                <label style={{ marginLeft: "1rem" }}>
                  <input
                    type="radio"
                    name="level"
                    value="PG"
                    checked={level === "PG"}
                    onChange={() => setLevel("PG")}
                  />{" "}
                  PG
                </label>
              </div>

              <form onSubmit={handleStudentSubmit} style={styles.form}>
                <div style={styles.field}>
                  <label>Name</label>
                  <input
                    name="name"
                    value={studentForm.name}
                    onChange={handleStudentChange}
                    required
                  />
                </div>

                {level === "UG" && (
                  <>
                    <div style={styles.field}>
                      <label>Branch</label>
                      <input
                        name="branch"
                        value={studentForm.branch}
                        onChange={handleStudentChange}
                        required
                      />
                    </div>

                    <div style={styles.field}>
                      <label>Year</label>
                      <select
                        name="year"
                        value={studentForm.year}
                        onChange={handleStudentChange}
                        required
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                      >
                        <option value={1}>1st Year</option>
                        <option value={2}>2nd Year</option>
                        <option value={3}>3rd Year</option>
                        <option value={4}>4th Year</option>
<<<<<<< HEAD
                      </motion.select>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="pg-fields"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <AnimatedInput
                        label="Department"
                        icon="🏛️"
                        value={studentForm.department}
                        onChange={(e) =>
                          setStudentForm({
                            ...studentForm,
                            department: e.target.value,
                          })
                        }
                        isMobile={isMobile}
                        styles={styles}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.select
                  style={styles.select}
                  value={studentForm.hostel}
                  onChange={(e) =>
                    setStudentForm({ ...studentForm, hostel: e.target.value })
                  }
                  whileFocus={{ scale: isMobile ? 1 : 1.02 }}
                >
                  {HOSTELS.map((h) => (
                    <option key={h}>{h}</option>
                  ))}
                </motion.select>

                <AnimatePresence>
                  {error && (
                    <motion.div
                      style={styles.error}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  style={{
                    ...styles.submit,
                    ...(submitting ? styles.submitDisabled : {}),
                  }}
                  disabled={submitting}
                  whileHover={!submitting && !isMobile ? { scale: 1.02 } : {}}
                  whileTap={!submitting ? { scale: 0.98 } : {}}
                >
                  {submitting ? "Logging in..." : "Login as Student"}
                </motion.button>
              </motion.form>
            ) : (
              <motion.form
                key="doctor-form"
                style={styles.form}
                onSubmit={handleDoctorSubmit}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                <AnimatedInput
                  label="Email"
                  type="email"
                  icon="✉️"
                  value={doctorForm.email}
                  onChange={(e) =>
                    setDoctorForm({ ...doctorForm, email: e.target.value })
                  }
                  isMobile={isMobile}
                  styles={styles}
                />

                <AnimatedInput
                  label="Password"
                  type="password"
                  icon="🔒"
                  value={doctorForm.password}
                  onChange={(e) =>
                    setDoctorForm({ ...doctorForm, password: e.target.value })
                  }
                  isMobile={isMobile}
                  styles={styles}
                />

                <AnimatePresence>
                  {error && (
                    <motion.div
                      style={styles.error}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  style={{
                    ...styles.submit,
                    ...(submitting ? styles.submitDisabled : {}),
                  }}
                  disabled={submitting}
                  whileHover={!submitting && !isMobile ? { scale: 1.02 } : {}}
                  whileTap={!submitting ? { scale: 0.98 } : {}}
                >
                  {submitting ? "Securing..." : "Login as Doctor"}
                </motion.button>

                <motion.div
                  style={styles.security}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  transition={{ delay: 0.3 }}
                >
                  🔒 Encrypted • Verified Doctors Only
                </motion.div>
              </motion.form>
            )}
          </AnimatePresence>

          <motion.p
            style={styles.footer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 0.5 }}
          >
            ℹ️ Campus demo • No real medical data stored
          </motion.p>
        </motion.div>
      </motion.div>
=======
                      </select>
                    </div>
                  </>
                )}

                {level === "PG" && (
                  <div style={styles.field}>
                    <label>Department</label>
                    <input
                      name="department"
                      value={studentForm.department}
                      onChange={handleStudentChange}
                      required
                    />
                  </div>
                )}

                <div style={styles.field}>
                  <label>Hostel</label>
                  <select
                    name="hostel"
                    value={studentForm.hostel}
                    onChange={handleStudentChange}
                    required
                  >
                    {HOSTELS.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>

                {error && <div style={styles.error}>{error}</div>}

                <button
                  type="submit"
                  style={styles.submitButton}
                  disabled={submitting}
                >
                  {submitting ? "Logging in..." : "Login as Student"}
                </button>
              </form>
            </>
          ) : (
            <form onSubmit={handleDoctorSubmit} style={styles.form}>
              <div style={styles.field}>
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={doctorForm.email}
                  onChange={handleDoctorChange}
                  required
                />
              </div>

              <div style={styles.field}>
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={doctorForm.password}
                  onChange={handleDoctorChange}
                  required
                />
              </div>

              {error && <div style={styles.error}>{error}</div>}

              <button
                type="submit"
                style={styles.submitButton}
                disabled={submitting}
              >
                {submitting ? "Logging in..." : "Login as Doctor"}
              </button>
            </form>
          )}

          <p style={styles.footerNote}>
            This is a campus telemedicine app demo. No separate signup – students
            log in with basic details; doctors are pre-registered in the system.
          </p>
        </div>
      </div>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    </>
  );
};

<<<<<<< HEAD
/* Animated Input Component */
const AnimatedInput = ({ label, icon, isMobile, styles, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      style={styles.field}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label style={styles.label}>{label}</label>
      <div style={styles.inputWrapper}>
        {icon && <span style={styles.inputIcon}>{icon}</span>}
        <motion.input
          {...props}
          style={{
            ...styles.input,
            paddingLeft: icon ? (isMobile ? "2.2rem" : "2.5rem") : (isMobile ? ".75rem" : ".8rem"),
            borderColor: isFocused ? "#6366f1" : "#c7d2fe",
            boxShadow: isFocused ? "0 0 0 3px rgba(99,102,241,.2)" : "none",
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          required
          whileFocus={{ scale: isMobile ? 1 : 1.01 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

/* ANIMATIONS */
const keyframes = `
@keyframes fadeUp {
  from { opacity:0; transform: translateY(20px); }
  to { opacity:1; transform: translateY(0); }
}
@keyframes shake {
  0%,100%{transform:translateX(0)}
  25%{transform:translateX(-6px)}
  75%{transform:translateX(6px)}
}
@keyframes bgShift {
  0%{background-position:0% 50%}
  50%{background-position:100% 50%}
  100%{background-position:0% 50%}
}
`;

export default LoginPage;
=======
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2ff, #e0f2fe)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    padding: "1.5rem",
    boxSizing: "border-box",
  },
  title: {
    margin: 0,
    marginBottom: "0.75rem",
  },
  loggedInInfo: {
    marginTop: 0,
    marginBottom: "0.75rem",
    fontSize: "0.9rem",
    color: "#555",
  },
  toggleRow: {
    display: "flex",
    borderRadius: "999px",
    backgroundColor: "#f3f4f6",
    padding: "0.15rem",
    marginBottom: "1rem",
  },
  toggleButton: {
    flex: 1,
    border: "none",
    background: "transparent",
    padding: "0.4rem 0.6rem",
    borderRadius: "999px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
  toggleButtonActive: {
    backgroundColor: "#4f46e5",
    color: "#fff",
  },
  levelRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem",
    fontSize: "0.9rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    fontSize: "0.9rem",
  },
  error: {
    color: "#b91c1c",
    fontSize: "0.85rem",
  },
  submitButton: {
    marginTop: "0.5rem",
    padding: "0.6rem 1rem",
    border: "none",
    borderRadius: "999px",
    backgroundColor: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
  },
  footerNote: {
    marginTop: "1rem",
    fontSize: "0.8rem",
    color: "#666",
  },
};

export default LoginPage;
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

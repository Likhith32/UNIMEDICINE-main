// src/pages/LoginPage.jsx
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AppLoader from "../components/AppLoader";

const HOSTELS = [
  "Boys Hostel 1",
  "Boys Hostel 2",
  "Girls Hostel 1",
  "Girls Hostel 2",
];

const LoginPage = () => {
  const { loginStudent, loginDoctor, isAuthenticated, role } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState("student"); // student | doctor
  const [level, setLevel] = useState("UG");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

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

  /* Redirect if already logged in */
  useEffect(() => {
    if (isAuthenticated && role) {
      navigate(role === "doctor" ? "/doctor-dashboard" : "/", { replace: true });
    }
  }, [isAuthenticated, role, navigate]);

  const handleStudentSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload =
      level === "UG"
        ? {
            name: studentForm.name,
            level,
            branch: studentForm.branch,
            year: Number(studentForm.year),
            hostel: studentForm.hostel,
          }
        : {
            name: studentForm.name,
            level,
            department: studentForm.department,
            hostel: studentForm.hostel,
          };

    const res = await loginStudent(payload);
    if (!res.success) setError(res.error || "Student login failed");
    setSubmitting(false);
  };

  const handleDoctorSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const res = await loginDoctor(doctorForm);
    if (!res.success) setError(res.error || "Doctor login failed");
    setSubmitting(false);
  };

  return (
    <div style={styles.page}>
      {submitting && <AppLoader />}

      <div style={styles.card}>
        <h2 style={styles.title}>University Telemedicine Login</h2>

        {/* MODE TOGGLE */}
        <div style={styles.toggleRow}>
          <button
            onClick={() => setMode("student")}
            style={{
              ...styles.toggleButton,
              ...(mode === "student" ? styles.toggleActive : {}),
            }}
          >
            Student
          </button>
          <button
            onClick={() => setMode("doctor")}
            style={{
              ...styles.toggleButton,
              ...(mode === "doctor" ? styles.toggleActive : {}),
            }}
          >
            Doctor
          </button>
        </div>

        {mode === "student" ? (
          <form onSubmit={handleStudentSubmit} style={styles.form}>
            <input
              placeholder="Name"
              value={studentForm.name}
              onChange={(e) =>
                setStudentForm({ ...studentForm, name: e.target.value })
              }
              required
            />

            <div>
              <label>
                <input
                  type="radio"
                  checked={level === "UG"}
                  onChange={() => setLevel("UG")}
                />{" "}
                UG
              </label>
              <label style={{ marginLeft: "1rem" }}>
                <input
                  type="radio"
                  checked={level === "PG"}
                  onChange={() => setLevel("PG")}
                />{" "}
                PG
              </label>
            </div>

            {level === "UG" ? (
              <>
                <input
                  placeholder="Branch"
                  value={studentForm.branch}
                  onChange={(e) =>
                    setStudentForm({
                      ...studentForm,
                      branch: e.target.value,
                    })
                  }
                  required
                />
                <select
                  value={studentForm.year}
                  onChange={(e) =>
                    setStudentForm({
                      ...studentForm,
                      year: e.target.value,
                    })
                  }
                >
                  <option value={1}>1st Year</option>
                  <option value={2}>2nd Year</option>
                  <option value={3}>3rd Year</option>
                  <option value={4}>4th Year</option>
                </select>
              </>
            ) : (
              <input
                placeholder="Department"
                value={studentForm.department}
                onChange={(e) =>
                  setStudentForm({
                    ...studentForm,
                    department: e.target.value,
                  })
                }
                required
              />
            )}

            <select
              value={studentForm.hostel}
              onChange={(e) =>
                setStudentForm({
                  ...studentForm,
                  hostel: e.target.value,
                })
              }
            >
              {HOSTELS.map((h) => (
                <option key={h}>{h}</option>
              ))}
            </select>

            {error && <div style={styles.error}>{error}</div>}
            <button type="submit">Login as Student</button>
          </form>
        ) : (
          <form onSubmit={handleDoctorSubmit} style={styles.form}>
            <input
              type="email"
              placeholder="Email"
              value={doctorForm.email}
              onChange={(e) =>
                setDoctorForm({ ...doctorForm, email: e.target.value })
              }
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={doctorForm.password}
              onChange={(e) =>
                setDoctorForm({ ...doctorForm, password: e.target.value })
              }
              required
            />

            {error && <div style={styles.error}>{error}</div>}
            <button type="submit">Login as Doctor</button>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#eef2ff",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    background: "#fff",
    padding: "1.5rem",
    borderRadius: 12,
    boxShadow: "0 10px 25px rgba(0,0,0,.15)",
  },
  title: {
    textAlign: "center",
    marginBottom: "1rem",
  },
  toggleRow: {
    display: "flex",
    marginBottom: "1rem",
  },
  toggleButton: {
    flex: 1,
    padding: ".5rem",
    border: "none",
    cursor: "pointer",
  },
  toggleActive: {
    background: "#4f46e5",
    color: "#fff",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: ".6rem",
  },
  error: {
    color: "#b91c1c",
    fontSize: ".85rem",
  },
};

export default LoginPage;

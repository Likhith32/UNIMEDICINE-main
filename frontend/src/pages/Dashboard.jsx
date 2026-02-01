<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
// src/pages/Dashboard.jsx

import React, { useState } from "react";
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import heroDoctor from "../assets/hero-doctor.png";

const Dashboard = () => {
  const { user, role } = useAuth();
  const { studentProfile, isStudent } = useUser();
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);
<<<<<<< HEAD
  const [tapScale, setTapScale] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);

  useEffect(() => {
    const resize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);
=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

  const handleGo = (path) => {
    navigate(path);
  };

  const handleSOS = () => {
    window.location.href = "tel:9392995909";
  };

<<<<<<< HEAD
  const handleCardTap = (cardId, path) => {
    setTapScale(cardId);
    setTimeout(() => {
      setTapScale(null);
      handleGo(path);
    }, 150);
  };

=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  const keyframeStyles = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
    }
    @keyframes glow {
      0%, 100% { box-shadow: 0 0 20px rgba(139, 92, 246, 0.3), 0 8px 25px rgba(139, 92, 246, 0.2); }
      50% { box-shadow: 0 0 35px rgba(139, 92, 246, 0.5), 0 8px 35px rgba(139, 92, 246, 0.3); }
    }
    @keyframes slideDown {
      from { transform: translateY(-10px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
<<<<<<< HEAD
    @keyframes sosPulse {
      0%, 100% { 
        box-shadow: 0 10px 35px rgba(239, 68, 68, 0.5);
        transform: scale(1);
      }
      50% { 
        box-shadow: 0 15px 45px rgba(239, 68, 68, 0.7), 0 0 0 8px rgba(239, 68, 68, 0.2);
        transform: scale(1.05);
      }
    }
    @keyframes iconBounce {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-5px); }
    }
  `;

  const getResponsiveStyles = () => ({
    page: {
      minHeight: "100vh",
      background: "linear-gradient(135deg, #f8fafc 0%, #f0e7ff 50%, #fef8e7 100%)",
      padding: 0,
      fontFamily: "'Segoe UI', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
    },

    header: {
      maxWidth: 1400,
      margin: isMobile ? "1rem auto 1rem" : "2rem auto 2rem",
      padding: isMobile ? "0 1rem" : "0 2rem",
    },
    headerContent: {
      animation: "slideDown 0.6s ease-out",
    },
    title: {
      margin: 0,
      marginBottom: "0.35rem",
      fontSize: isMobile ? "1.8rem" : isTablet ? "2.2rem" : "2.5rem",
      background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      fontWeight: 800,
    },
    subtitle: {
      margin: 0,
      fontSize: isMobile ? "0.95rem" : "1.1rem",
      color: "#64748b",
      fontWeight: 500,
    },

    hero: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      maxWidth: 1400,
      margin: isMobile ? "1rem" : "2rem auto",
      gap: isMobile ? "2rem" : isTablet ? "2.5rem" : "4rem",
      padding: isMobile ? "2rem 1.5rem" : isTablet ? "2.5rem" : "3rem",
      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(240, 231, 255, 0.85) 100%)",
      borderRadius: isMobile ? 20 : 28,
      boxShadow: "0 20px 60px rgba(139, 92, 246, 0.15)",
      border: "1px solid rgba(139, 92, 246, 0.1)",
    },
    heroContent: {
      flex: 1,
      maxWidth: isMobile ? "100%" : 600,
      textAlign: isMobile ? "center" : "left",
    },
    heroTitle: {
      fontSize: isMobile ? "1.8rem" : isTablet ? "2.5rem" : "clamp(2.2rem, 4vw, 3.5rem)",
      fontWeight: 800,
      lineHeight: 1.08,
      margin: isMobile ? "0 0 1rem 0" : "0 0 1.5rem 0",
      background: "linear-gradient(135deg, #1e293b, #7c3aed)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    },
    heroSubtitle: {
      fontSize: isMobile ? "0.95rem" : "1.15rem",
      lineHeight: 1.8,
      color: "#64748b",
      marginBottom: isMobile ? "1.5rem" : "2.5rem",
      fontWeight: 500,
    },
    heroButtons: {
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      gap: "1rem",
      flexWrap: "wrap",
      justifyContent: isMobile ? "center" : "flex-start",
    },
    bookButton: {
      background: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
      color: "white",
      border: "none",
      padding: isMobile ? "0.9rem 1.5rem" : "1rem 2rem",
      borderRadius: 12,
      fontSize: isMobile ? "0.95rem" : "1rem",
      fontWeight: 600,
      cursor: "pointer",
      boxShadow: "0 8px 25px rgba(139, 92, 246, 0.4)",
      transition: "all 0.3s ease",
      width: isMobile ? "100%" : "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },
    outlineButton: {
      background: "transparent",
      color: "#7c3aed",
      border: "2px solid rgba(139, 92, 246, 0.4)",
      padding: isMobile ? "0.9rem 1.5rem" : "1rem 2rem",
      borderRadius: 12,
      fontSize: isMobile ? "0.95rem" : "1rem",
      fontWeight: 600,
      cursor: "pointer",
      transition: "all 0.3s ease",
      width: isMobile ? "100%" : "auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
    },
    doctorImageContainer: {
      flex: isMobile ? "none" : 1,
      display: "flex",
      justifyContent: "center",
      width: isMobile ? "100%" : "auto",
    },
    imageWrapper: {
      position: "relative",
      animation: isMobile ? "none" : "float 4s ease-in-out infinite",
    },
    doctorImage: {
      width: isMobile ? "100%" : isTablet ? 280 : 320,
      maxWidth: isMobile ? 300 : "none",
      height: isMobile ? "auto" : isTablet ? 350 : 400,
      borderRadius: isMobile ? 20 : 24,
      boxShadow: "0 30px 60px rgba(139, 92, 246, 0.25)",
      objectFit: "cover",
      border: "2px solid rgba(139, 92, 246, 0.2)",
    },

    featuresSection: {
      maxWidth: 1400,
      margin: isMobile ? "2rem auto 1.5rem" : "3rem auto 2rem",
      padding: isMobile ? "0 1rem" : "0 2rem",
    },
    sectionHeader: {
      marginBottom: isMobile ? "1.5rem" : "2rem",
      textAlign: "center",
    },
    sectionTitle: {
      margin: 0,
      marginBottom: "0.5rem",
      fontSize: isMobile ? "1.5rem" : "1.8rem",
      fontWeight: 700,
      color: "#1e293b",
    },
    sectionSubtitle: {
      margin: 0,
      fontSize: isMobile ? "0.9rem" : "1rem",
      color: "#64748b",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : isTablet ? "repeat(2, 1fr)" : "repeat(auto-fit, minmax(280px, 1fr))",
      gap: isMobile ? "1.2rem" : "2rem",
    },
    cardItem: {
      background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 248, 240, 0.8))",
      borderRadius: isMobile ? 16 : 20,
      border: "1px solid rgba(139, 92, 246, 0.15)",
      padding: isMobile ? "1.5rem" : "2rem",
      cursor: "pointer",
      transition: "all 0.4s cubic-bezier(0.23, 1, 0.320, 1)",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
      backdropFilter: "blur(10px)",
      position: "relative",
      overflow: "hidden",
    },
    cardGradient: {
      position: "absolute",
      top: "-50%",
      right: "-50%",
      width: "200%",
      height: "200%",
      background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
    },
    cardIconWrapper: {
      width: isMobile ? "50px" : "60px",
      height: isMobile ? "50px" : "60px",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: "1rem",
      position: "relative",
      zIndex: 1,
      transition: "transform 0.3s ease",
    },
    cardIcon: {
      fontSize: isMobile ? "1.5rem" : "1.8rem",
    },
    cardTitle: {
      margin: "0 0 0.5rem 0",
      fontSize: isMobile ? "1.15rem" : "1.3rem",
      color: "#1e293b",
      fontWeight: 700,
      position: "relative",
      zIndex: 1,
    },
    cardText: {
      margin: "0 0 1.5rem 0",
      fontSize: isMobile ? "0.9rem" : "0.95rem",
      color: "#64748b",
      lineHeight: 1.6,
      position: "relative",
      zIndex: 1,
    },

    footerNote: {
      textAlign: "center",
      fontSize: isMobile ? "0.85rem" : "0.95rem",
      color: "#64748b",
      maxWidth: 900,
      margin: isMobile ? "1.5rem 1rem" : "2rem auto",
      padding: isMobile ? "1rem 1.5rem" : "1.5rem 2rem",
      background: "rgba(255, 255, 255, 0.6)",
      borderRadius: 12,
      fontWeight: 500,
      border: "1px solid rgba(139, 92, 246, 0.1)",
    },

    sosButton: {
      position: "fixed",
      bottom: isMobile ? "1.5rem" : "2rem",
      right: isMobile ? "1.5rem" : "2rem",
      background: "linear-gradient(135deg, #dc2626, #ef4444)",
      color: "#fff",
      border: "none",
      borderRadius: "50%",
      width: isMobile ? 60 : 70,
      height: isMobile ? 60 : 70,
      fontSize: isMobile ? "0.85rem" : "0.9rem",
      fontWeight: 700,
      boxShadow: "0 10px 35px rgba(239, 68, 68, 0.5)",
      cursor: "pointer",
      zIndex: 9999,
      transition: "all 0.3s ease",
      animation: "sosPulse 2s ease-in-out infinite",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      lineHeight: 1.2,
    },
  });

  const styles = getResponsiveStyles();

  // Role-specific content
  const getHeroContent = () => {
    if (role === "doctor") {
      return {
        title: "Manage Student Consultations",
        subtitle: "Respond to student queries and provide timely medical guidance. Your expertise helps students stay healthy and informed.",
        primaryCTA: { text: "View Consultations", path: "/doctor-dashboard", icon: "📋" },
        secondaryCTA: null, // No secondary button for doctors
      };
    }
    
    // Student (default)
    return {
      title: "Your Health, One Click Away",
      subtitle: "Chat with AI, consult doctors, and find nearby medical help instantly. Expert care tailored just for you.",
      primaryCTA: { text: "Book Appointment", path: "/doctor-connect", icon: "📅" },
      secondaryCTA: { text: "Quick AI Check", path: "/ai", icon: "🤖" },
    };
  };

  const heroContent = getHeroContent();

  // Feature cards with icons
  const studentFeatures = [
    {
      id: "ai",
      icon: "🧠",
      bgColor: "linear-gradient(135deg, #dbeafe, #e0e7ff)",
      title: "AI Symptom Checker",
      text: "Instant AI guidance before visiting a doctor",
      path: "/ai",
    },
    {
      id: "nearby",
      icon: "📍",
      bgColor: "linear-gradient(135deg, #fce7f3, #fce7f3)",
      title: "Nearby Medical Care",
      text: "Find hospitals and pharmacies near you",
      path: "/nearby-places",
    },
    {
      id: "image",
      icon: "📷",
      bgColor: "linear-gradient(135deg, #e0f2fe, #dbeafe)",
      title: "Image-Based Check",
      text: "Upload skin images for AI analysis",
      path: "/image-diagnosis",
    },
    {
      id: "doctor",
      icon: "💬",
      bgColor: "linear-gradient(135deg, #dcfce7, #d1fae5)",
      title: "Chat with Doctors",
      text: "Connect with campus doctors instantly",
      path: "/doctor-connect",
    },
  ];

  const doctorFeatures = [
    {
      id: "consultations",
      icon: "👨‍⚕️",
      bgColor: "linear-gradient(135deg, #dbeafe, #e0e7ff)",
      title: "Active Consultations",
      text: "View and respond to student messages",
      path: "/doctor-dashboard",
    },
  ];

  const features = role === "doctor" ? doctorFeatures : studentFeatures;

  return (
    <div style={styles.page}>
=======
  `;

  return (
    <div style={styles.page}>
      {/* local animations */}
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
      <style>{keyframeStyles}</style>

      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h2 style={styles.title}>Telemedicine Dashboard</h2>
          {isStudent && studentProfile ? (
            <p style={styles.subtitle}>
              Welcome, <strong>{studentProfile.name}</strong> ({studentProfile.level})
            </p>
          ) : role === "doctor" && user ? (
            <p style={styles.subtitle}>
<<<<<<< HEAD
              Welcome, <strong>Dr. {user.name || user.email}</strong>
=======
              Welcome, <strong>{user.name || user.email}</strong>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
            </p>
          ) : (
            <p style={styles.subtitle}>Welcome to the telemedicine portal.</p>
          )}
        </div>
      </header>

<<<<<<< HEAD
      {/* Role-specific Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>{heroContent.title}</h1>
          <p style={styles.heroSubtitle}>{heroContent.subtitle}</p>
          <div style={styles.heroButtons}>
            <button
              style={styles.bookButton}
              onClick={() => handleGo(heroContent.primaryCTA.path)}
              onMouseEnter={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(139, 92, 246, 0.5)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isMobile) {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(139, 92, 246, 0.4)";
                }
              }}
            >
              <span>{heroContent.primaryCTA.icon}</span>
              {heroContent.primaryCTA.text}
            </button>

            {heroContent.secondaryCTA && (
              <button
                style={styles.outlineButton}
                onClick={() => handleGo(heroContent.secondaryCTA.path)}
                onMouseEnter={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.backgroundColor = "rgba(124, 58, 237, 0.08)";
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isMobile) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.transform = "translateY(0)";
                  }
                }}
              >
                <span>{heroContent.secondaryCTA.icon}</span>
                {heroContent.secondaryCTA.text}
              </button>
            )}
=======
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Your Health, Our Priority.</h1>
          <p style={styles.heroSubtitle}>
            Expert care tailored just for you. Trusted by thousands, we provide compassionate
            and advanced medical solutions to keep you well.
          </p>
          <div style={styles.heroButtons}>
            <button
              style={styles.bookButton}
              onClick={() => handleGo("/doctor-connect")}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow =
                  "0 15px 40px rgba(139, 92, 246, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow =
                  "0 8px 25px rgba(139, 92, 246, 0.4)";
              }}
            >
              Book an Appointment
            </button>

            <button
              style={styles.outlineButton}
              onClick={() => handleGo("/ai")}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(124, 58, 237, 0.08)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              Quick AI Check
            </button>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
          </div>
        </div>

        <div style={styles.doctorImageContainer}>
          <div style={styles.imageWrapper}>
            <img
              src={heroDoctor || "/placeholder.svg"}
<<<<<<< HEAD
              alt={role === "doctor" ? "Doctor managing consultations" : "Doctor providing online consultation"}
=======
              alt="Doctor providing online consultation"
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
              style={styles.doctorImage}
            />
          </div>
        </div>
      </section>

<<<<<<< HEAD
      {/* Features Section */}
      <section style={styles.featuresSection}>
        <div style={styles.sectionHeader}>
          <h2 style={styles.sectionTitle}>
            {role === "doctor" ? "Your Dashboard" : "How Can We Help You?"}
          </h2>
          <p style={styles.sectionSubtitle}>
            {role === "doctor" 
              ? "Access your student consultations and messages" 
              : "Choose from our range of healthcare services"}
          </p>
        </div>

        <div style={styles.grid}>
          {features.map((card) => (
            <div
              key={card.id}
              style={{
                ...styles.cardItem,
                transform:
                  tapScale === card.id
                    ? "scale(0.95)"
                    : hoveredCard === card.id && !isMobile
                    ? "translateY(-8px) scale(1.02)"
                    : "translateY(0) scale(1)",
                boxShadow:
                  hoveredCard === card.id && !isMobile
                    ? "0 20px 50px rgba(139, 92, 246, 0.25)"
                    : "0 10px 30px rgba(0, 0, 0, 0.08)",
              }}
              onMouseEnter={() => !isMobile && setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => isMobile ? handleCardTap(card.id, card.path) : handleGo(card.path)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && handleGo(card.path)}
              aria-label={card.title}
            >
              <div style={styles.cardGradient} aria-hidden />
              
              <div
                style={{
                  ...styles.cardIconWrapper,
                  background: card.bgColor,
                  transform: hoveredCard === card.id && !isMobile ? "scale(1.1)" : "scale(1)",
                  animation: hoveredCard === card.id && !isMobile ? "iconBounce 0.6s ease-in-out" : "none",
                }}
              >
                <span style={styles.cardIcon}>{card.icon}</span>
              </div>

              <h3 style={styles.cardTitle}>{card.title}</h3>
              <p style={styles.cardText}>{card.text}</p>
            </div>
          ))}
=======
      <section style={styles.featuresSection}>
        <div style={styles.grid}>
          {isStudent && (
            <>
              {[
                {
                  id: "ai",
                  title: "AI Symptom Checker",
                  text: "Chat with the AI assistant about your symptoms.",
                  path: "/ai",
                },
                {
                  id: "nearby",
                  title: "Nearby Medical Shops & Hospitals",
                  text: "View medical shops and hospitals near your location.",
                  path: "/nearby-places",
                },
                {
                  id: "image",
                  title: "Image-based Check",
                  text: "Upload a skin image and let AI provide insights.",
                  path: "/image-diagnosis",
                },
                {
                  id: "doctor",
                  title: "Chat with Doctors",
                  text: "Start or continue a chat with campus doctors.",
                  path: "/doctor-connect",
                },
              ].map((card) => (
                <div
                  key={card.id}
                  style={{
                    ...styles.cardItem,
                    transform:
                      hoveredCard === card.id
                        ? "translateY(-8px) scale(1.02)"
                        : "translateY(0) scale(1)",
                    boxShadow:
                      hoveredCard === card.id
                        ? "0 20px 50px rgba(139, 92, 246, 0.25)"
                        : "0 10px 30px rgba(0, 0, 0, 0.08)",
                  }}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleGo(card.path)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleGo(card.path)}
                  aria-label={card.title}
                >
                  <div style={styles.cardGradient} aria-hidden />
                  <h3 style={styles.cardTitle}>{card.title}</h3>
                  <p style={styles.cardText}>{card.text}</p>
                  <button
                    style={{
                      ...styles.cardButton,
                      backgroundColor:
                        hoveredCard === card.id ? "#7c3aed" : "rgb(139, 92, 246)",
                    }}
                    aria-hidden
                  >
                    Learn More →
                  </button>
                </div>
              ))}
            </>
          )}

          {role === "doctor" && (
            <>
              {[
                {
                  id: "consultations",
                  title: "Active Consultations",
                  text: "View and reply to students who contacted you.",
                  path: "/doctor-consultations",
                },
                {
                  id: "profile",
                  title: "Profile & Availability",
                  text: "Update your specialization and timings.",
                  path: "/doctor-profile",
                },
              ].map((card) => (
                <div
                  key={card.id}
                  style={{
                    ...styles.cardItem,
                    transform:
                      hoveredCard === card.id
                        ? "translateY(-8px) scale(1.02)"
                        : "translateY(0) scale(1)",
                    boxShadow:
                      hoveredCard === card.id
                        ? "0 20px 50px rgba(139, 92, 246, 0.25)"
                        : "0 10px 30px rgba(0, 0, 0, 0.08)",
                  }}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  onClick={() => handleGo(card.path)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && handleGo(card.path)}
                  aria-label={card.title}
                >
                  <div style={styles.cardGradient} aria-hidden />
                  <h3 style={styles.cardTitle}>{card.title}</h3>
                  <p style={styles.cardText}>{card.text}</p>
                  <button
                    style={{
                      ...styles.cardButton,
                      backgroundColor:
                        hoveredCard === card.id ? "#7c3aed" : "rgb(139, 92, 246)",
                    }}
                    aria-hidden
                  >
                    View →
                  </button>
                </div>
              ))}
            </>
          )}
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
        </div>
      </section>

      <p style={styles.footerNote}>
        ⚠️ For emergencies, visit the campus health center or nearby hospital immediately.
      </p>

      <button
        style={styles.sosButton}
        onClick={handleSOS}
        title="Emergency call to campus doctor"
        aria-label="Emergency call"
<<<<<<< HEAD
        onMouseEnter={(e) => {
          if (!isMobile) {
            e.currentTarget.style.transform = "scale(1.1)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isMobile) {
            e.currentTarget.style.transform = "scale(1)";
          }
        }}
      >
        <span style={{ fontSize: isMobile ? "1.2rem" : "1.5rem" }}>🚨</span>
        <span>SOS</span>
=======
      >
        SOS
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
      </button>
    </div>
  );
};

<<<<<<< HEAD
export default Dashboard;
=======
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f8fafc 0%, #f0e7ff 50%, #fef8e7 100%)",
    padding: 0,
    fontFamily:
      "'Segoe UI', 'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
  },

  header: {
    maxWidth: 1400,
    margin: "2rem auto 2rem",
    padding: "0 2rem",
  },
  headerContent: {
    animation: "slideDown 0.6s ease-out",
  },
  title: {
    margin: 0,
    marginBottom: "0.35rem",
    fontSize: "2.5rem",
    background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    fontWeight: 800,
  },
  subtitle: {
    margin: 0,
    fontSize: "1.1rem",
    color: "#64748b",
    fontWeight: 500,
  },

  hero: {
    display: "flex",
    alignItems: "center",
    maxWidth: 1400,
    margin: "2rem auto",
    gap: "4rem",
    padding: "3rem",
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.92) 0%, rgba(240, 231, 255, 0.85) 100%)",
    borderRadius: 28,
    boxShadow: "0 20px 60px rgba(139, 92, 246, 0.15)",
    border: "1px solid rgba(139, 92, 246, 0.1)",
  },
  heroContent: {
    flex: 1,
    maxWidth: 600,
  },
  heroTitle: {
    fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
    fontWeight: 800,
    lineHeight: 1.08,
    margin: "0 0 1.5rem 0",
    background: "linear-gradient(135deg, #1e293b, #7c3aed)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  heroSubtitle: {
    fontSize: "1.15rem",
    lineHeight: 1.8,
    color: "#64748b",
    marginBottom: "2.5rem",
    fontWeight: 500,
  },
  heroButtons: {
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
  },
  bookButton: {
    background: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
    color: "white",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: 12,
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 8px 25px rgba(139, 92, 246, 0.4)",
    transition: "all 0.3s ease",
  },
  outlineButton: {
    background: "transparent",
    color: "#7c3aed",
    border: "2px solid rgba(139, 92, 246, 0.4)",
    padding: "1rem 2rem",
    borderRadius: 12,
    fontSize: "1rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  doctorImageContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  imageWrapper: {
    position: "relative",
    animation: "float 4s ease-in-out infinite",
  },
  doctorImage: {
    width: 320,
    height: 400,
    borderRadius: 24,
    boxShadow: "0 30px 60px rgba(139, 92, 246, 0.25)",
    objectFit: "cover",
    border: "2px solid rgba(139, 92, 246, 0.2)",
  },

  featuresSection: {
    maxWidth: 1400,
    margin: "3rem auto 2rem",
    padding: "0 2rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "2rem",
  },
  cardItem: {
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 248, 240, 0.8))",
    borderRadius: 20,
    border: "1px solid rgba(139, 92, 246, 0.15)",
    padding: "2rem",
    cursor: "pointer",
    transition: "all 0.4s cubic-bezier(0.23, 1, 0.320, 1)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.08)",
    backdropFilter: "blur(10px)",
    position: "relative",
    overflow: "hidden",
  },
  cardGradient: {
    position: "absolute",
    top: "-50%",
    right: "-50%",
    width: "200%",
    height: "200%",
    background:
      "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)",
  },
  cardTitle: {
    margin: "0 0 0.75rem 0",
    fontSize: "1.3rem",
    color: "#1e293b",
    fontWeight: 700,
    position: "relative",
    zIndex: 1,
  },
  cardText: {
    margin: "0 0 1.5rem 0",
    fontSize: "0.95rem",
    color: "#64748b",
    lineHeight: 1.6,
    position: "relative",
    zIndex: 1,
  },
  cardButton: {
    padding: "0.8rem 1.6rem",
    borderRadius: 10,
    border: "none",
    color: "#fff",
    fontSize: "0.95rem",
    cursor: "pointer",
    fontWeight: 600,
    boxShadow: "0 4px 15px rgba(139, 92, 246, 0.3)",
    transition: "all 0.3s ease",
    position: "relative",
    zIndex: 1,
  },

  footerNote: {
    textAlign: "center",
    fontSize: "0.95rem",
    color: "#64748b",
    maxWidth: 900,
    margin: "2rem auto",
    padding: "1.5rem 2rem",
    background: "rgba(255, 255, 255, 0.6)",
    borderRadius: 12,
    fontWeight: 500,
    border: "1px solid rgba(139, 92, 246, 0.1)",
  },

  sosButton: {
    position: "fixed",
    bottom: "2rem",
    left: "2rem",
    background: "linear-gradient(135deg, #dc2626, #ef4444)",
    color: "#fff",
    border: "none",
    borderRadius: "50%",
    width: 70,
    height: 70,
    fontSize: 18,
    fontWeight: 700,
    boxShadow: "0 10px 35px rgba(239, 68, 68, 0.5)",
    cursor: "pointer",
    zIndex: 9999,
    transition: "all 0.3s ease",
    animation: "glow 2s ease-in-out infinite",
  },
};

export default Dashboard;
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

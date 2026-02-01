// src/pages/DoctorConnect.jsx

<<<<<<< HEAD
import React, { useEffect, useState, useRef } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";
import {
  getDoctors,
  startOrGetConsultation,
  getConsultationMessages,
  sendConsultationMessage,
} from "../api/apiClient";
<<<<<<< HEAD
import { socket } from "../utils/socket";

const DoctorConnect = () => {
  const { isAuthenticated, role, user } = useAuth();
=======

const DoctorConnect = () => {
  const { isAuthenticated, role } = useAuth();
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  const { studentProfile } = useUser();

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [chatInput, setChatInput] = useState("");
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);

<<<<<<< HEAD
  // Responsive states
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= 768 && window.innerWidth < 1024
  );

=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  // consultationId per doctorId
  const [consultations, setConsultations] = useState({});
  // messages per consultationId
  const [messagesByConsultation, setMessagesByConsultation] = useState({});

<<<<<<< HEAD
  const chatBoxRef = useRef(null);

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

  // Socket.IO connection and listeners
  useEffect(() => {
    if (!isAuthenticated || role !== "student" || !user?.id) return;

    // Connect socket if not already connected
    if (!socket.connected) {
      socket.connect();
    }

    // Join room with user ID
    socket.emit("join", { user_id: user.id });

    // Listen for new messages
    const handleNewMessage = (data) => {
      console.log("🔔 New message received:", data);
      
      // Find which consultation this message belongs to
      const consultationId = data.consultation_id;
      
      if (consultationId) {
        setMessagesByConsultation((prev) => ({
          ...prev,
          [consultationId]: [
            ...(prev[consultationId] || []),
            {
              id: data.id || `socket-${Date.now()}`,
              from: data.sender_type || "doctor",
              text: data.message || data.content,
              at: data.created_at || new Date().toISOString(),
            },
          ],
        }));

        // Show notification if not currently viewing this doctor
        if (!selectedDoctor || consultations[selectedDoctor.id] !== consultationId) {
          // You can add a toast notification here
          console.log("💬 New message from doctor!");
        }
      }
    };

    socket.on("new_message", handleNewMessage);

    // Cleanup
    return () => {
      socket.off("new_message", handleNewMessage);
    };
  }, [isAuthenticated, role, user, selectedDoctor, consultations]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messagesByConsultation, selectedDoctor]);

=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  useEffect(() => {
    if (!isAuthenticated || role !== "student") return;

    const fetchDocs = async () => {
      setLoadingDoctors(true);
      setError(null);
      try {
        const data = await getDoctors();
        setDoctors(data || []);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError("Network Error");
      } finally {
        setLoadingDoctors(false);
      }
    };

    fetchDocs();
  }, [isAuthenticated, role]);

  const loadMessages = async (doctorId, consultationId) => {
    setLoadingMessages(true);
    setError(null);
    try {
      const msgs = await getConsultationMessages(consultationId);
      setMessagesByConsultation((prev) => ({
        ...prev,
        [consultationId]: msgs.map((m) => ({
          id: m.id,
          from: m.sender_type, // 'student' or 'doctor'
          text: m.content,
          at: m.created_at,
        })),
      }));
    } catch (err) {
      console.error("Error loading messages:", err);
      setError("Could not load previous messages.");
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSelectDoctor = async (doc) => {
    setSelectedDoctor(doc);
    setError(null);
    setChatInput("");

    const doctorId = doc.id;
    let consultationId = consultations[doctorId];

    try {
      if (!consultationId) {
        const cons = await startOrGetConsultation(doctorId);
        consultationId = cons.id;
        setConsultations((prev) => ({
          ...prev,
          [doctorId]: consultationId,
        }));
      }

      await loadMessages(doctorId, consultationId);
    } catch (err) {
      console.error("Error selecting doctor:", err);
      setError("Network Error");
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedDoctor) return;
    if (!isAuthenticated || role !== "student") {
      setError("You must be logged in as a student to message doctors.");
      return;
    }

    const text = chatInput.trim();
    setChatInput("");
    setSending(true);
    setError(null);

    const doctorId = selectedDoctor.id;
    const consultationId = consultations[doctorId];

    if (!consultationId) {
      setError("No consultation started with this doctor yet.");
      setSending(false);
      return;
    }

    // optimistic local message
<<<<<<< HEAD
    const tempMessage = {
      from: "student",
      text,
      at: new Date().toISOString(),
      id: `tmp-${Date.now()}`,
    };

    setMessagesByConsultation((prev) => ({
      ...prev,
      [consultationId]: [...(prev[consultationId] || []), tempMessage],
=======
    setMessagesByConsultation((prev) => ({
      ...prev,
      [consultationId]: [
        ...(prev[consultationId] || []),
        {
          from: "student",
          text,
          at: new Date().toISOString(),
          id: `tmp-${Date.now()}`,
        },
      ],
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    }));

    try {
      const saved = await sendConsultationMessage(consultationId, text);
<<<<<<< HEAD
      
      // Emit socket event for real-time delivery
      socket.emit("send_message", {
        sender_id: user.id,
        receiver_id: doctorId,
        consultation_id: consultationId,
        message: text,
      });

      // Replace temp message with saved one
      setMessagesByConsultation((prev) => {
        const messages = prev[consultationId] || [];
        const filteredMessages = messages.filter(m => m.id !== tempMessage.id);
        return {
          ...prev,
          [consultationId]: [
            ...filteredMessages,
            {
              id: saved.id,
              from: saved.sender_type,
              text: saved.content,
              at: saved.created_at,
            },
          ],
        };
      });
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Could not send message.");
      
      // Remove temp message on error
      setMessagesByConsultation((prev) => ({
        ...prev,
        [consultationId]: (prev[consultationId] || []).filter(
          (m) => m.id !== tempMessage.id
        ),
      }));
=======
      setMessagesByConsultation((prev) => ({
        ...prev,
        [consultationId]: [
          ...(prev[consultationId] || []),
          {
            id: saved.id,
            from: saved.sender_type,
            text: saved.content,
            at: saved.created_at,
          },
        ],
      }));
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Could not send message.");
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    } finally {
      setSending(false);
    }
  };

  const currentMessages =
    selectedDoctor && consultations[selectedDoctor.id]
      ? messagesByConsultation[consultations[selectedDoctor.id]] || []
      : [];

  if (!isAuthenticated || role !== "student") {
    return (
<<<<<<< HEAD
      <div style={getResponsiveStyles(isMobile, isTablet).page}>
        <div style={getResponsiveStyles(isMobile, isTablet).card}>
=======
      <div style={styles.page}>
        <div style={styles.card}>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
          <h2>Doctor Connect</h2>
          <p>You must be logged in as a student to use this feature.</p>
        </div>
      </div>
    );
  }

<<<<<<< HEAD
  const styles = getResponsiveStyles(isMobile, isTablet);
=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  const topDoctors = doctors.slice(0, 3); // same data, just first 3 for cards

  return (
    <div style={styles.page}>
      <div style={styles.card}>
<<<<<<< HEAD
        {/* Header */}
=======
        {/* Header (nav bar for this page, like your dashboard header style) */}
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
        <header style={styles.header}>
          <div>
            <h2 style={styles.title}>Chat with Campus Doctors</h2>
            {studentProfile && (
              <p style={styles.subtitle}>
                Student: <strong>{studentProfile.name}</strong> (
                {studentProfile.level} –{" "}
                {studentProfile.branch ||
                  studentProfile.department ||
                  "N/A"}
                , Hostel: {studentProfile.hostel})
              </p>
            )}
          </div>
        </header>

        {/* Meet Our Dedicated Experts section */}
        <section style={styles.expertsSection}>
          <div style={styles.expertsHeaderRow}>
            <h3 style={styles.expertsTitle}>Meet Our Dedicated Experts</h3>
            <p style={styles.expertsSubtitle}>
              Highly skilled and compassionate professionals ready to care for you.
            </p>
          </div>

          <div style={styles.expertsGrid}>
            {topDoctors.map((doc) => (
              <div
                key={doc.id}
<<<<<<< HEAD
                style={{
                  ...styles.expertCard,
                  ...(selectedDoctor && selectedDoctor.id === doc.id
                    ? styles.expertCardActive
                    : {}),
                }}
=======
                style={styles.expertCard}
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                onClick={() => handleSelectDoctor(doc)}
              >
                <div style={styles.expertAvatarWrapper}>
                  <div style={styles.expertAvatar}>
                    <span style={styles.expertInitials}>
                      {(doc.name || "Dr")
                        .split(" ")
                        .map((w) => w[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  </div>
                </div>
                <h4 style={styles.expertName}>{doc.name || "Doctor"}</h4>
                <p style={styles.expertRole}>
                  {doc.specialization || "General"}
                </p>
<<<<<<< HEAD
=======
                <div style={styles.expertActions}>
                  <button
                    type="button"
                    style={styles.iconButton}
                    title="Call"
                  >
                    📞
                  </button>
                  <button
                    type="button"
                    style={styles.iconButton}
                    title="Message"
                  >
                    💬
                  </button>
                  <button
                    type="button"
                    style={styles.iconButton}
                    title="LinkedIn"
                  >
                    in
                  </button>
                  <button
                    type="button"
                    style={styles.iconButton}
                    title="Email"
                  >
                    ✉️
                  </button>
                </div>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
              </div>
            ))}
          </div>

<<<<<<< HEAD
          {!isMobile && (
            <div style={styles.viewAllWrapper}>
              <button type="button" style={styles.viewAllButton}>
                View all Doctors →
              </button>
            </div>
          )}
        </section>

        {/* Main layout: doctor list + chat */}
=======
          <div style={styles.viewAllWrapper}>
            <button type="button" style={styles.viewAllButton}>
              View all Doctors →
            </button>
          </div>
        </section>

        {/* Existing layout: doctor list + chat, only visual style changed */}
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
        <div style={styles.layout}>
          {/* Doctor list */}
          <div style={styles.doctorList}>
            <h3 style={styles.sectionTitle}>Available Doctors</h3>
<<<<<<< HEAD
            {loadingDoctors && <p style={styles.loadingText}>Loading doctors...</p>}
            {error && <p style={styles.error}>{error}</p>}
            {!loadingDoctors && doctors.length === 0 && !error && (
              <p style={styles.emptyText}>
=======
            {loadingDoctors && <p>Loading doctors...</p>}
            {error && <p style={styles.error}>{error}</p>}
            {!loadingDoctors && doctors.length === 0 && !error && (
              <p style={{ fontSize: "0.9rem", color: "#666" }}>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                No doctors found yet. They might not be registered in the
                system.
              </p>
            )}
            <ul style={styles.doctorUl}>
              {doctors.map((doc) => (
                <li
                  key={doc.id}
                  onClick={() => handleSelectDoctor(doc)}
                  style={{
                    ...styles.doctorItem,
                    ...(selectedDoctor && selectedDoctor.id === doc.id
                      ? styles.doctorItemActive
                      : {}),
                  }}
                >
<<<<<<< HEAD
                  <div style={styles.doctorName}>
                    {doc.name || "Doctor"}
                  </div>
                  <div style={styles.doctorSpec}>
=======
                  <div style={{ fontWeight: "bold" }}>
                    {doc.name || "Doctor"}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#555" }}>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                    {doc.specialization || "General"}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Chat area */}
          <div style={styles.chatArea}>
            {selectedDoctor ? (
              <>
<<<<<<< HEAD
                <div style={styles.chatHeader}>
                  <h3 style={styles.sectionTitle}>
                    Chat with {selectedDoctor.name || "Doctor"}
                  </h3>
                  <div style={styles.onlineIndicator}>
                    <span style={styles.onlineDot}></span>
                    <span style={styles.onlineText}>Online</span>
                  </div>
                </div>
                
                <div style={styles.chatBox} ref={chatBoxRef}>
                  {loadingMessages && (
                    <p style={styles.loadingText}>
=======
                <h3 style={styles.sectionTitle}>
                  Chat with {selectedDoctor.name || "Doctor"}
                </h3>
                <div style={styles.chatBox}>
                  {loadingMessages && (
                    <p style={{ color: "#777", fontSize: "0.9rem" }}>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                      Loading conversation...
                    </p>
                  )}
                  {!loadingMessages && currentMessages.length === 0 && (
<<<<<<< HEAD
                    <p style={styles.emptyText}>
=======
                    <p style={{ color: "#777", fontSize: "0.9rem" }}>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                      Start the conversation by explaining your problem briefly.
                    </p>
                  )}
                  {currentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
                        ...styles.chatMessage,
                        ...(msg.from === "student"
                          ? styles.chatMessageStudent
                          : styles.chatMessageDoctor),
                      }}
                    >
                      <div style={styles.chatLabel}>
                        {msg.from === "student" ? "You" : "Doctor"}
                      </div>
<<<<<<< HEAD
                      <div
                        style={{
                          ...styles.chatText,
                          ...(msg.from === "student"
                            ? styles.chatTextStudent
                            : styles.chatTextDoctor),
                        }}
                      >
                        {msg.text}
                      </div>
                      <div style={styles.chatTime}>
                        {new Date(msg.at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
=======
                      <div style={styles.chatText}>{msg.text}</div>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSendMessage} style={styles.chatForm}>
                  <input
                    style={styles.chatInput}
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your message to the doctor..."
                  />
                  <button
                    type="submit"
<<<<<<< HEAD
                    style={{
                      ...styles.chatSendButton,
                      ...(sending || !chatInput.trim()
                        ? styles.chatSendButtonDisabled
                        : {}),
                    }}
                    disabled={sending || !chatInput.trim()}
                  >
                    {sending ? "Sending..." : isMobile ? "Send" : "Send Message"}
=======
                    style={styles.chatSendButton}
                    disabled={sending || !chatInput.trim()}
                  >
                    {sending ? "Sending..." : "Send"}
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                  </button>
                </form>
              </>
            ) : (
<<<<<<< HEAD
              <div style={styles.noSelection}>
                <h3 style={styles.sectionTitle}>No doctor selected</h3>
                <p style={styles.emptyText}>
                  Choose a doctor from the {isMobile ? "list above" : "left"} to start a consultation.
=======
              <div style={{ padding: "1rem", color: "#555" }}>
                <h3 style={styles.sectionTitle}>No doctor selected</h3>
                <p style={{ fontSize: "0.9rem" }}>
                  Choose a doctor from the left to start a consultation.
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                </p>
              </div>
            )}
          </div>
        </div>

        <p style={styles.footerNote}>
          ⚠️ Doctor chat is for guidance only. For emergencies, visit the campus
          health center or nearest hospital immediately.
        </p>
      </div>
    </div>
  );
};

<<<<<<< HEAD
const getResponsiveStyles = (isMobile, isTablet) => ({
=======
const styles = {
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #f3e8ff 0%, #fef9c3 50%, #ffffff 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
<<<<<<< HEAD
    padding: isMobile ? "1rem 0.75rem" : isTablet ? "1.25rem" : "1.5rem",
=======
    padding: "1.5rem",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    fontFamily: "'Poppins', 'Inter', system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },
  card: {
    width: "100%",
<<<<<<< HEAD
    maxWidth: isMobile ? "100%" : isTablet ? "95%" : "1100px",
    backgroundColor: "#ffffff",
    borderRadius: isMobile ? "18px" : "24px",
    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)",
    padding: isMobile
      ? "1.25rem 1rem 1.5rem"
      : isTablet
      ? "1.5rem 1.5rem 1.75rem"
      : "1.75rem 2rem 2rem",
=======
    maxWidth: "1100px",
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 20px 40px rgba(15, 23, 42, 0.12)",
    padding: "1.75rem 2rem 2rem",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    boxSizing: "border-box",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
<<<<<<< HEAD
    marginBottom: isMobile ? "1.25rem" : "1.5rem",
    flexWrap: "wrap",
    gap: "1rem",
=======
    marginBottom: "1.5rem",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  },
  title: {
    margin: 0,
    marginBottom: "0.35rem",
<<<<<<< HEAD
    fontSize: isMobile ? "1.5rem" : isTablet ? "1.65rem" : "1.8rem",
=======
    fontSize: "1.8rem",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    fontWeight: 700,
    background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  subtitle: {
    margin: 0,
<<<<<<< HEAD
    fontSize: isMobile ? "0.85rem" : "0.95rem",
=======
    fontSize: "0.95rem",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    color: "#6b7280",
  },

  /* Experts section */
  expertsSection: {
    marginTop: "0.75rem",
<<<<<<< HEAD
    marginBottom: isMobile ? "1.5rem" : "2rem",
    padding: isMobile ? "1rem" : isTablet ? "1.15rem 1.3rem 1.35rem" : "1.25rem 1.5rem 1.5rem",
    borderRadius: isMobile ? "16px" : "20px",
=======
    marginBottom: "2rem",
    padding: "1.25rem 1.5rem 1.5rem",
    borderRadius: "20px",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    background:
      "linear-gradient(135deg, rgba(167,139,250,0.09), rgba(253,224,171,0.32))",
  },
  expertsHeaderRow: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
<<<<<<< HEAD
    alignItems: isMobile ? "flex-start" : "center",
    gap: "0.75rem",
    marginBottom: isMobile ? "0.85rem" : "1rem",
    flexDirection: isMobile ? "column" : "row",
  },
  expertsTitle: {
    margin: 0,
    fontSize: isMobile ? "1.2rem" : isTablet ? "1.28rem" : "1.35rem",
=======
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1rem",
  },
  expertsTitle: {
    margin: 0,
    fontSize: "1.35rem",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    fontWeight: 700,
    color: "#1f2933",
  },
  expertsSubtitle: {
    margin: 0,
<<<<<<< HEAD
    fontSize: isMobile ? "0.85rem" : "0.9rem",
    color: "#4b5563",
    maxWidth: isMobile ? "100%" : "320px",
    textAlign: isMobile ? "left" : "right",
  },
  expertsGrid: {
    display: "grid",
    gridTemplateColumns: isMobile
      ? "1fr"
      : isTablet
      ? "repeat(auto-fit, minmax(200px, 1fr))"
      : "repeat(auto-fit, minmax(220px, 1fr))",
    gap: isMobile ? "0.85rem" : "1rem",
  },
  expertCard: {
    backgroundColor: "#ffffff",
    borderRadius: isMobile ? "16px" : "18px",
    padding: isMobile ? "1rem 0.75rem 1.2rem" : "1.25rem 1rem 1.4rem",
=======
    fontSize: "0.9rem",
    color: "#4b5563",
    maxWidth: "320px",
    textAlign: "right",
  },
  expertsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "1rem",
  },
  expertCard: {
    backgroundColor: "#ffffff",
    borderRadius: "18px",
    padding: "1.25rem 1rem 1.4rem",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    boxShadow: "0 12px 30px rgba(15, 23, 42, 0.08)",
    border: "1px solid rgba(148, 163, 184, 0.15)",
    textAlign: "center",
    cursor: "pointer",
    transition: "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
  },
<<<<<<< HEAD
  expertCardActive: {
    borderColor: "#7c3aed",
    boxShadow: "0 12px 30px rgba(124, 58, 237, 0.25)",
    transform: "translateY(-2px)",
  },
=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  expertAvatarWrapper: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "0.75rem",
  },
  expertAvatar: {
<<<<<<< HEAD
    width: isMobile ? "56px" : "64px",
    height: isMobile ? "56px" : "64px",
=======
    width: "64px",
    height: "64px",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    borderRadius: "50%",
    background:
      "radial-gradient(circle at 30% 20%, #f9fafb, #a78bfa 40%, #7c3aed 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontWeight: 700,
<<<<<<< HEAD
    fontSize: isMobile ? "1rem" : "1.1rem",
=======
    fontSize: "1.1rem",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    boxShadow: "0 8px 18px rgba(88, 28, 135, 0.35)",
  },
  expertInitials: {
    letterSpacing: "0.04em",
  },
  expertName: {
    margin: "0 0 0.25rem",
<<<<<<< HEAD
    fontSize: isMobile ? "0.95rem" : "1rem",
=======
    fontSize: "1rem",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    fontWeight: 600,
    color: "#111827",
  },
  expertRole: {
    margin: "0 0 0.6rem",
<<<<<<< HEAD
    fontSize: isMobile ? "0.8rem" : "0.85rem",
    color: "#6b7280",
  },
=======
    fontSize: "0.85rem",
    color: "#6b7280",
  },
  expertActions: {
    display: "flex",
    justifyContent: "center",
    gap: "0.4rem",
    marginTop: "0.4rem",
  },
  iconButton: {
    width: "30px",
    height: "30px",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#f3f4ff",
    color: "#4b5563",
    fontSize: "0.8rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(148, 163, 184, 0.4)",
  },
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  viewAllWrapper: {
    marginTop: "1.2rem",
    display: "flex",
    justifyContent: "center",
  },
  viewAllButton: {
<<<<<<< HEAD
    padding: isMobile ? "0.6rem 1.3rem" : "0.7rem 1.6rem",
=======
    padding: "0.7rem 1.6rem",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    borderRadius: "999px",
    border: "none",
    background: "linear-gradient(135deg, #8b5cf6, #a78bfa)",
    color: "#ffffff",
<<<<<<< HEAD
    fontSize: isMobile ? "0.85rem" : "0.9rem",
=======
    fontSize: "0.9rem",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    fontWeight: 600,
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(129, 140, 248, 0.55)",
  },

<<<<<<< HEAD
  /* Layout */
  layout: {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : isTablet ? "240px 1fr" : "280px 1fr",
    gap: isMobile ? "1rem" : "1.25rem",
  },
  doctorList: {
    borderRadius: isMobile ? "16px" : "18px",
    padding: isMobile ? "0.85rem" : "1rem",
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    maxHeight: isMobile ? "200px" : "auto",
    overflowY: isMobile ? "auto" : "visible",
=======
  /* Existing layout, recolored */
  layout: {
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    gap: "1.25rem",
  },
  doctorList: {
    borderRadius: "18px",
    padding: "1rem",
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  },
  doctorUl: {
    listStyle: "none",
    padding: 0,
    margin: 0,
<<<<<<< HEAD
    maxHeight: isMobile ? "140px" : isTablet ? "300px" : "360px",
    overflowY: "auto",
  },
  doctorItem: {
    padding: isMobile ? "0.55rem 0.65rem" : "0.6rem 0.75rem",
=======
    maxHeight: "360px",
    overflowY: "auto",
  },
  doctorItem: {
    padding: "0.6rem 0.75rem",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    borderRadius: "10px",
    cursor: "pointer",
    marginBottom: "0.35rem",
    backgroundColor: "#f3f4ff",
    transition: "background-color 0.15s ease, transform 0.12s ease",
  },
  doctorItemActive: {
    backgroundColor: "#e0e7ff",
    border: "1px solid #4f46e5",
  },
<<<<<<< HEAD
  doctorName: {
    fontWeight: "bold",
    fontSize: isMobile ? "0.9rem" : "0.95rem",
  },
  doctorSpec: {
    fontSize: isMobile ? "0.75rem" : "0.8rem",
    color: "#555",
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: "0.6rem",
    fontSize: isMobile ? "0.95rem" : "1rem",
=======
  sectionTitle: {
    marginTop: 0,
    marginBottom: "0.6rem",
    fontSize: "1rem",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    fontWeight: 600,
    color: "#111827",
  },
  chatArea: {
    display: "flex",
    flexDirection: "column",
  },
<<<<<<< HEAD
  chatHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.5rem",
  },
  onlineIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
  },
  onlineDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "#10b981",
    animation: "pulse 2s infinite",
  },
  onlineText: {
    fontSize: "0.75rem",
    color: "#10b981",
    fontWeight: 500,
  },
  chatBox: {
    borderRadius: isMobile ? "14px" : "16px",
    border: "1px solid #e5e7eb",
    padding: isMobile ? "0.65rem" : "0.75rem",
    height: isMobile ? "240px" : isTablet ? "260px" : "280px",
=======
  chatBox: {
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
    padding: "0.75rem",
    height: "280px",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    overflowY: "auto",
    backgroundColor: "#f9fafb",
    marginBottom: "0.6rem",
  },
  chatMessage: {
<<<<<<< HEAD
    marginBottom: isMobile ? "0.6rem" : "0.7rem",
    maxWidth: isMobile ? "90%" : "80%",
=======
    marginBottom: "0.5rem",
    maxWidth: "80%",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  },
  chatMessageStudent: {
    marginLeft: "auto",
    textAlign: "right",
  },
  chatMessageDoctor: {
    marginRight: "auto",
    textAlign: "left",
  },
  chatLabel: {
<<<<<<< HEAD
    fontSize: isMobile ? "0.65rem" : "0.7rem",
    fontWeight: 600,
    color: "#6b7280",
    marginBottom: "0.15rem",
=======
    fontSize: "0.7rem",
    fontWeight: 600,
    color: "#6b7280",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  },
  chatText: {
    marginTop: "0.15rem",
    display: "inline-block",
<<<<<<< HEAD
    padding: isMobile ? "0.4rem 0.65rem" : "0.45rem 0.75rem",
    borderRadius: "12px",
    fontSize: isMobile ? "0.85rem" : "0.9rem",
    whiteSpace: "pre-line",
    lineHeight: 1.5,
  },
  chatTextStudent: {
    backgroundColor: "#4f46e5",
    color: "#ffffff",
  },
  chatTextDoctor: {
    backgroundColor: "#eef2ff",
    color: "#111827",
  },
  chatTime: {
    fontSize: "0.65rem",
    color: "#9ca3af",
    marginTop: "0.2rem",
  },
  chatForm: {
    display: "flex",
    gap: isMobile ? "0.4rem" : "0.5rem",
    flexWrap: "wrap",
  },
  chatInput: {
    flex: "1 1 200px",
    minWidth: "200px",
    padding: isMobile ? "0.5rem 0.7rem" : "0.6rem 0.8rem",
    borderRadius: "999px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: isMobile ? "0.85rem" : "0.9rem",
  },
  chatSendButton: {
    padding: isMobile ? "0.5rem 0.8rem" : "0.6rem 0.9rem",
=======
    padding: "0.45rem 0.75rem",
    borderRadius: "12px",
    backgroundColor: "#eef2ff",
    fontSize: "0.9rem",
    whiteSpace: "pre-line",
    color: "#111827",
  },
  chatForm: {
    display: "flex",
    gap: "0.5rem",
  },
  chatInput: {
    flex: 1,
    padding: "0.6rem 0.8rem",
    borderRadius: "999px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "0.9rem",
  },
  chatSendButton: {
    padding: "0.6rem 0.9rem",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
<<<<<<< HEAD
    fontSize: isMobile ? "0.8rem" : "0.85rem",
    fontWeight: 600,
    whiteSpace: "nowrap",
    transition: "all 0.2s ease",
  },
  chatSendButtonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  noSelection: {
    padding: isMobile ? "0.85rem" : "1rem",
    color: "#555",
  },
  loadingText: {
    color: "#777",
    fontSize: isMobile ? "0.85rem" : "0.9rem",
  },
  emptyText: {
    fontSize: isMobile ? "0.85rem" : "0.9rem",
    color: "#666",
  },
  error: {
    color: "#b91c1c",
    fontSize: isMobile ? "0.8rem" : "0.85rem",
    marginBottom: "0.5rem",
  },
  footerNote: {
    marginTop: isMobile ? "1rem" : "1.1rem",
    fontSize: isMobile ? "0.75rem" : "0.8rem",
    color: "#6b7280",
    textAlign: "center",
  },
});

export default DoctorConnect;
=======
    fontSize: "0.85rem",
    fontWeight: 600,
  },
  error: {
    color: "#b91c1c",
    fontSize: "0.85rem",
    marginBottom: "0.5rem",
  },
  footerNote: {
    marginTop: "1.1rem",
    fontSize: "0.8rem",
    color: "#6b7280",
    textAlign: "center",
  },
};

export default DoctorConnect;
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

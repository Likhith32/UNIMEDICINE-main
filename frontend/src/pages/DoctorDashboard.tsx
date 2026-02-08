// src/pages/DoctorDashboard.jsx

import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getMyConsultations,
  getConsultationMessages,
  sendConsultationMessage,
} from "../api/apiClient";

const DoctorDashboard = () => {
  const { isAuthenticated, role, user } = useAuth();

  const [consultations, setConsultations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingCons, setLoadingCons] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [isAvailable, setIsAvailable] = useState(true);

  const chatBoxRef = useRef(null);
  const pollingRef = useRef(null);

  // 1. Properly inject/cleanup keyframe styles
  useEffect(() => {
    const styleTag = document.createElement("style");
    styleTag.innerHTML = keyframeStyles;
    document.head.appendChild(styleTag);
    return () => document.head.removeChild(styleTag);
  }, []);

  // 2. Auto-scroll to bottom
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // 3. Load initial consultations
  useEffect(() => {
    if (!isAuthenticated || role !== "doctor") return;

    const load = async () => {
      setLoadingCons(true);
      setError(null);
      try {
        const data = await getMyConsultations("open");
        setConsultations(data || []);
      } catch (err) {
        setError("Could not load consultations.");
      } finally {
        setLoadingCons(false);
      }
    };

    load();
  }, [isAuthenticated, role]);

  // 4. Polling for new messages (Every 10 seconds)
  useEffect(() => {
    if (!selected) return;

    const pollMessages = async () => {
      try {
        const msgs = await getConsultationMessages(selected.id);
        const formatted = msgs.map((m) => ({
          id: m.id,
          from: m.sender_type,
          text: m.content,
          at: m.created_at,
        }));
        
        // Only update state if message count has changed to prevent unnecessary re-renders
        setMessages((prev) => (prev.length !== formatted.length ? formatted : prev));
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    pollingRef.current = setInterval(pollMessages, 10000);
    return () => clearInterval(pollingRef.current);
  }, [selected]);

  // Handle consultation selection
  const handleSelect = async (cons) => {
    setSelected(cons);
    setMessages([]);
    setReply("");
    setLoadingMessages(true);
    setError(null);

    try {
      const msgs = await getConsultationMessages(cons.id);
      setMessages(
        msgs.map((m) => ({
          id: m.id,
          from: m.sender_type,
          text: m.content,
          at: m.created_at,
        }))
      );
    } catch (err) {
      setError("Could not load messages.");
    } finally {
      setLoadingMessages(false);
    }
  };

  // Handle sending reply
  const handleSend = async (e) => {
    e.preventDefault();
    if (!reply.trim() || !selected) return;

    const text = reply.trim();
    setReply(""); // Optimistically clear input
    setSending(true);
    setError(null);

    const tempId = `tmp-${Date.now()}`;
    const tempMsg = {
      id: tempId,
      from: "doctor",
      text,
      at: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, tempMsg]);

    try {
      const saved = await sendConsultationMessage(selected.id, text);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempId
            ? { id: saved.id, from: saved.sender_type, text: saved.content, at: saved.created_at }
            : msg
        )
      );
    } catch (err) {
      setError("Failed to send message.");
      setReply(text); // Return text to input so user doesn't lose it
      setMessages((prev) => prev.filter((msg) => msg.id !== tempId));
    } finally {
      setSending(false);
    }
  };

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return "—";
    const diffMins = Math.floor((new Date() - new Date(timestamp)) / 60000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  if (!isAuthenticated || role !== "doctor") {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h2>Doctor Dashboard</h2>
          <p>You must be logged in as a doctor to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page} className="doctor-dashboard-page">
      <div style={styles.card} className="doctor-dashboard-card">
        
        {/* Header Section */}
        <div style={styles.doctorHeader}>
          <div style={styles.doctorAvatarSection}>
            <div style={styles.doctorAvatar}>
              <span>{user?.name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "DR"}</span>
            </div>
            <div style={styles.doctorInfo}>
              <h2 style={styles.doctorName}>Dr. {user?.name || "Doctor"}</h2>
              <p style={styles.doctorSpec}>{user?.specialization || "General Medicine"}</p>
            </div>
          </div>

          <div style={styles.statusSection}>
            <button
              type="button"
              style={{...styles.statusButton, ...(isAvailable ? styles.statusButtonAvailable : styles.statusButtonOffline)}}
              onClick={() => setIsAvailable(!isAvailable)}
            >
              <span style={styles.statusDot} />
              {isAvailable ? "Available" : "Offline"}
            </button>
            <div style={styles.statItem}>
              <span style={styles.statValue}>{consultations.length}</span>
              <span style={styles.statLabel}>Open Cases</span>
            </div>
          </div>
        </div>

        <div style={styles.layout} className="doctor-dashboard-layout">
          {/* Left: Consultation List */}
          <div style={styles.consList}>
            <h3 style={styles.sectionTitle}>📋 Open Consultations</h3>
            {loadingCons && <p style={styles.loadingText}>Loading...</p>}
            {error && <p style={styles.error}>{error}</p>}
            
            <ul style={styles.consUl}>
              {consultations.map((c) => (
                <li
                  key={c.id}
                  onClick={() => handleSelect(c)}
                  style={{...styles.consItem, ...(selected?.id === c.id ? styles.consItemActive : {})}}
                >
                  <div style={styles.consItemHeader}>
                    <strong>{c.student_name || `Student #${c.student_id}`}</strong>
                    {c.unread_count > 0 && <span style={styles.unreadBadge}>{c.unread_count}</span>}
                  </div>
                  <div style={styles.consItemFooter}>
                    <span>⏰ {getTimeAgo(c.last_message_at)}</span>
                    <span>🟢 {c.status}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Chat Area */}
          <div style={styles.chatArea}>
            {selected ? (
              <>
                <div style={styles.chatHeader}>
                  <div>
                    <h3 style={styles.chatTitle}>Chat with {selected.student_name}</h3>
                    <p style={styles.chatSubtitle}>Case #{selected.id}</p>
                  </div>
                  <button style={styles.closeButton} onClick={() => setSelected(null)}>✕</button>
                </div>

                <div style={styles.chatBox} ref={chatBoxRef}>
                  {loadingMessages ? (
                    <div style={styles.loadingMessageContainer}><div style={styles.loadingSpinner} /></div>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg.id} style={{...styles.messageRow, justifyContent: msg.from === "doctor" ? "flex-end" : "flex-start"}}>
                        <div style={{...styles.chatMessage, ...(msg.from === "doctor" ? styles.chatMessageDoctor : styles.chatMessageStudent)}}>
                          <div style={styles.chatLabel}>{msg.from === "doctor" ? "You" : "Student"}</div>
                          <div style={styles.chatText}>{msg.text}</div>
                          <div style={styles.chatTime}>{new Date(msg.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <form onSubmit={handleSend} style={styles.chatForm}>
                  <input
                    style={styles.chatInput}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type a clinical response..."
                    disabled={sending}
                  />
                  <button type="submit" style={{...styles.chatSendButton, ...(sending || !reply.trim() ? styles.chatSendButtonDisabled : {})}} disabled={sending || !reply.trim()}>
                    {sending ? "Sending..." : "Send →"}
                  </button>
                </form>
              </>
            ) : (
              <div style={styles.noChatSelected}>
                <div style={styles.noChatIcon}>💬</div>
                <h3 style={styles.noChatTitle}>Select a Consultation</h3>
                <p style={styles.noChatText}>Choose a patient from the list to begin messaging.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Styles remain largely the same, but with the keyframe fix applied via useEffect above ---
const keyframeStyles = `
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
  @keyframes slideInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`;

const styles = {
  page: { minHeight: "100vh", background: "linear-gradient(135deg, #fef3c7 0%, #e0f2fe 50%, #fee2e2 100%)", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem 1rem", fontFamily: "sans-serif" },
  card: { width: "100%", maxWidth: "1100px", backgroundColor: "#ffffff", borderRadius: "24px", boxShadow: "0 20px 50px rgba(0,0,0,0.1)", padding: "1.5rem", boxSizing: "border-box" },
  doctorHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1.25rem", borderRadius: "18px", background: "rgba(99,102,241,0.05)", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" },
  doctorAvatarSection: { display: "flex", alignItems: "center", gap: "1rem" },
  doctorAvatar: { width: "64px", height: "64px", borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold" },
  doctorInfo: { display: "flex", flexDirection: "column" },
  doctorName: { margin: 0, fontSize: "1.4rem", color: "#1e293b" },
  doctorSpec: { margin: 0, fontSize: "0.9rem", color: "#64748b" },
  statusSection: { display: "flex", alignItems: "center", gap: "1rem" },
  statusButton: { display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 1rem", borderRadius: "20px", border: "none", cursor: "pointer", fontWeight: "600" },
  statusButtonAvailable: { backgroundColor: "#dcfce7", color: "#166534" },
  statusButtonOffline: { backgroundColor: "#fee2e2", color: "#991b1b" },
  statusDot: { width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "currentColor", animation: "pulse 2s infinite" },
  statItem: { textAlign: "center", padding: "0.5rem 1rem", background: "#f8fafc", borderRadius: "12px", border: "1px solid #e2e8f0" },
  statValue: { display: "block", fontSize: "1.2rem", fontWeight: "bold", color: "#6366f1" },
  statLabel: { fontSize: "0.7rem", color: "#64748b" },
  layout: { display: "grid", gridTemplateColumns: "300px 1fr", gap: "1.5rem" },
  consList: { background: "#f8fafc", padding: "1rem", borderRadius: "16px", border: "1px solid #e2e8f0" },
  consUl: { listStyle: "none", padding: 0, maxHeight: "450px", overflowY: "auto" },
  consItem: { padding: "1rem", borderRadius: "12px", background: "#fff", border: "1px solid #e2e8f0", marginBottom: "0.75rem", cursor: "pointer", transition: "0.2s" },
  consItemActive: { borderColor: "#6366f1", background: "#f5f7ff" },
  unreadBadge: { background: "#ef4444", color: "#fff", fontSize: "0.7rem", padding: "2px 8px", borderRadius: "10px" },
  consItemHeader: { display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" },
  consItemFooter: { display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "#94a3b8" },
  chatArea: { display: "flex", flexDirection: "column", background: "#fff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", minHeight: "500px" },
  chatHeader: { padding: "1rem", borderBottom: "1px solid #e2e8f0", background: "#f8fafc", display: "flex", justifyContent: "space-between", alignItems: "center" },
  chatBox: { flex: 1, padding: "1rem", overflowY: "auto", background: "#fff" },
  messageRow: { display: "flex", marginBottom: "1rem", animation: "slideInUp 0.3s ease" },
  chatMessage: { maxWidth: "75%", padding: "0.8rem", borderRadius: "12px", fontSize: "0.9rem" },
  chatMessageDoctor: { background: "#6366f1", color: "#fff", borderBottomRightRadius: "2px" },
  chatMessageStudent: { background: "#f1f5f9", color: "#1e293b", borderBottomLeftRadius: "2px" },
  chatLabel: { fontSize: "0.7rem", fontWeight: "bold", marginBottom: "0.2rem", opacity: 0.8 },
  chatTime: { fontSize: "0.65rem", marginTop: "0.4rem", opacity: 0.7 },
  chatForm: { padding: "1rem", borderTop: "1px solid #e2e8f0", display: "flex", gap: "0.5rem" },
  chatInput: { flex: 1, padding: "0.75rem", borderRadius: "8px", border: "1px solid #e2e8f0", outline: "none" },
  chatSendButton: { padding: "0.75rem 1.5rem", borderRadius: "8px", border: "none", background: "#6366f1", color: "#fff", cursor: "pointer", fontWeight: "600" },
  chatSendButtonDisabled: { opacity: 0.5, cursor: "not-allowed" },
  noChatSelected: { flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "#94a3b8" },
  noChatIcon: { fontSize: "3rem", marginBottom: "1rem" },
  loadingSpinner: { width: "30px", height: "30px", border: "3px solid #f3f3f3", borderTop: "3px solid #6366f1", borderRadius: "50%", animation: "spin 1s linear infinite" },
  error: { padding: "0.5rem", background: "#fee2e2", color: "#991b1b", borderRadius: "8px", fontSize: "0.8rem", marginBottom: "1rem" }
};

export default DoctorDashboard;
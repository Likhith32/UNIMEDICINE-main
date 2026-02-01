// src/pages/DoctorDashboard.jsx

<<<<<<< HEAD
import React, { useEffect, useState, useRef } from "react";
=======
import React, { useEffect, useState } from "react";
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
import { useAuth } from "../context/AuthContext";
import {
  getMyConsultations,
  getConsultationMessages,
  sendConsultationMessage,
} from "../api/apiClient";

const DoctorDashboard = () => {
  const { isAuthenticated, role, user } = useAuth();

  const [consultations, setConsultations] = useState([]);
  const [selected, setSelected] = useState(null); // consultation object
  const [messages, setMessages] = useState([]);
  const [loadingCons, setLoadingCons] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
<<<<<<< HEAD
  const [isAvailable, setIsAvailable] = useState(true);

  const chatBoxRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);
=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

  useEffect(() => {
    if (!isAuthenticated || role !== "doctor") return;

    const load = async () => {
      setLoadingCons(true);
      setError(null);
      try {
        const data = await getMyConsultations("open");
        setConsultations(data || []);
      } catch (err) {
        console.error("Error loading consultations:", err);
        setError("Could not load consultations.");
      } finally {
        setLoadingCons(false);
      }
    };

    load();
  }, [isAuthenticated, role]);

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
          from: m.sender_type, // student/doctor
          text: m.content,
          at: m.created_at,
        }))
      );
    } catch (err) {
      console.error("Error loading messages:", err);
      setError("Could not load messages.");
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!reply.trim() || !selected) return;

    const text = reply.trim();
    setReply("");
    setSending(true);
    setError(null);

    // optimistic
    setMessages((prev) => [
      ...prev,
      { id: `tmp-${Date.now()}`, from: "doctor", text, at: new Date().toISOString() },
    ]);

    try {
      const saved = await sendConsultationMessage(selected.id, text);
      setMessages((prev) => [
        ...prev,
        {
          id: saved.id,
          from: saved.sender_type,
          text: saved.content,
          at: saved.created_at,
        },
      ]);
    } catch (err) {
      console.error("Error sending reply:", err);
      setError("Could not send reply.");
    } finally {
      setSending(false);
    }
  };

<<<<<<< HEAD
  const getTimeAgo = (timestamp) => {
    if (!timestamp) return "—";
    const now = new Date();
    const then = new Date(timestamp);
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} min ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
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
    <div style={styles.page}>
<<<<<<< HEAD
      <style>{keyframeStyles}</style>
      
      <div style={styles.card}>
        {/* Professional Doctor Header Card */}
        <div style={styles.doctorHeader}>
          <div style={styles.doctorAvatarSection}>
            <div style={styles.doctorAvatar}>
              <span style={styles.doctorInitials}>
                {user?.name?.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase() || "DR"}
              </span>
            </div>
            <div style={styles.doctorInfo}>
              <h2 style={styles.doctorName}>Dr. {user?.name || "Doctor"}</h2>
              <p style={styles.doctorSpec}>{user?.specialization || "General Medicine"}</p>
            </div>
          </div>
          
          <div style={styles.statusSection}>
            <button
              type="button"
              style={{
                ...styles.statusButton,
                ...(isAvailable ? styles.statusButtonAvailable : styles.statusButtonOffline),
              }}
              onClick={() => setIsAvailable(!isAvailable)}
            >
              <span style={styles.statusDot} />
              {isAvailable ? "Available" : "Offline"}
            </button>
            <div style={styles.statsRow}>
              <div style={styles.statItem}>
                <span style={styles.statValue}>{consultations.length}</span>
                <span style={styles.statLabel}>Open Cases</span>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.layout}>
          {/* Left: Consultation List */}
          <div style={styles.consList}>
            <h3 style={styles.sectionTitle}>
              <span style={styles.sectionIcon}>📋</span>
              Open Consultations
            </h3>
            {loadingCons && <p style={styles.loadingText}>Loading...</p>}
            {error && <p style={styles.error}>{error}</p>}
            {!loadingCons && consultations.length === 0 && !error && (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>📭</div>
                <p style={styles.emptyText}>No open consultations yet.</p>
                <p style={styles.emptySubtext}>New cases will appear here.</p>
              </div>
            )}
            <ul style={styles.consUl}>
              {consultations.map((c) => {
                const lastMessage = c.last_message_at;
                const hasUnread = c.unread_count > 0;
                
                return (
                  <li
                    key={c.id}
                    onClick={() => handleSelect(c)}
                    style={{
                      ...styles.consItem,
                      ...(selected && selected.id === c.id
                        ? styles.consItemActive
                        : {}),
                    }}
                  >
                    <div style={styles.consItemHeader}>
                      <div style={styles.consItemTitle}>
                        <span style={styles.consItemIcon}>🧑‍🎓</span>
                        <strong>{c.student_name || `Student #${c.student_id}`}</strong>
                      </div>
                      {hasUnread && (
                        <span style={styles.unreadBadge}>{c.unread_count}</span>
                      )}
                    </div>
                    
                    {c.student_level && (
                      <div style={styles.consItemDetail}>
                        {c.student_level} {c.student_branch && `– ${c.student_branch}`}
                      </div>
                    )}
                    
                    <div style={styles.consItemFooter}>
                      <span style={styles.consItemTime}>
                        ⏰ {getTimeAgo(lastMessage)}
                      </span>
                      <span style={styles.consItemStatus}>
                        {c.status === "open" ? "🟢 Open" : "⚪ " + c.status}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: Chat Area */}
          <div style={styles.chatArea}>
            {selected ? (
              <>
                <div style={styles.chatHeader}>
                  <div>
                    <h3 style={styles.chatTitle}>
                      Chat with {selected.student_name || `Student #${selected.student_id}`}
                    </h3>
                    <p style={styles.chatSubtitle}>
                      Consultation #{selected.id} • {selected.status}
                    </p>
                  </div>
                  <button
                    type="button"
                    style={styles.closeButton}
                    onClick={() => setSelected(null)}
                  >
                    ✕
                  </button>
                </div>

                <div style={styles.chatBox} ref={chatBoxRef}>
                  {loadingMessages && (
                    <div style={styles.loadingMessageContainer}>
                      <div style={styles.loadingSpinner} />
                      <p style={styles.loadingMessage}>Loading conversation...</p>
                    </div>
                  )}
                  {!loadingMessages && messages.length === 0 && (
                    <div style={styles.emptyChatState}>
                      <div style={styles.emptyChatIcon}>💬</div>
                      <p style={styles.emptyChatText}>No messages yet.</p>
                      <p style={styles.emptyChatSubtext}>
                        Start the conversation or wait for the student to send a message.
                      </p>
                    </div>
=======
      <div style={styles.card}>
        <h2 style={styles.title}>Doctor Dashboard</h2>
        <p style={styles.subtitle}>
          Logged in as <strong>{user?.name}</strong>{" "}
          {user?.specialization && `(${user.specialization})`}
        </p>

        <div style={styles.layout}>
          <div style={styles.consList}>
            <h3 style={styles.sectionTitle}>Open Consultations</h3>
            {loadingCons && <p>Loading...</p>}
            {error && <p style={styles.error}>{error}</p>}
            {!loadingCons && consultations.length === 0 && !error && (
              <p style={{ fontSize: "0.9rem", color: "#666" }}>
                No open consultations yet.
              </p>
            )}
            <ul style={styles.consUl}>
              {consultations.map((c) => (
                <li
                  key={c.id}
                  onClick={() => handleSelect(c)}
                  style={{
                    ...styles.consItem,
                    ...(selected && selected.id === c.id
                      ? styles.consItemActive
                      : {}),
                  }}
                >
                  <div style={{ fontWeight: "bold" }}>
                    Consultation #{c.id}
                  </div>
                  <div style={{ fontSize: "0.8rem", color: "#555" }}>
                    Student ID: {c.student_id}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "#777" }}>
                    Status: {c.status}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div style={styles.chatArea}>
            {selected ? (
              <>
                <h3 style={styles.sectionTitle}>
                  Chat – Consultation #{selected.id}
                </h3>
                <div style={styles.chatBox}>
                  {loadingMessages && (
                    <p style={{ color: "#777", fontSize: "0.9rem" }}>
                      Loading messages...
                    </p>
                  )}
                  {!loadingMessages && messages.length === 0 && (
                    <p style={{ color: "#777", fontSize: "0.9rem" }}>
                      No messages yet. Wait for the student to send a message or
                      start the conversation.
                    </p>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                  )}
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      style={{
<<<<<<< HEAD
                        ...styles.messageRow,
                        justifyContent: msg.from === "doctor" ? "flex-end" : "flex-start",
                      }}
                    >
                      {msg.from === "student" && (
                        <div style={styles.messageAvatar}>🧑‍🎓</div>
                      )}
                      
                      <div
                        style={{
                          ...styles.chatMessage,
                          ...(msg.from === "doctor"
                            ? styles.chatMessageDoctor
                            : styles.chatMessageStudent),
                        }}
                      >
                        <div style={styles.chatLabel}>
                          {msg.from === "doctor" ? "You" : "Student"}
                        </div>
                        <div style={styles.chatText}>{msg.text}</div>
                        <div style={styles.chatTime}>
                          {new Date(msg.at).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>

                      {msg.from === "doctor" && (
                        <div style={styles.messageAvatar}>👨‍⚕️</div>
                      )}
                    </div>
                  ))}

                  {sending && (
                    <div style={styles.typingIndicator}>
                      <span style={styles.typingDot}>●</span>
                      <span style={{...styles.typingDot, animationDelay: "0.2s"}}>●</span>
                      <span style={{...styles.typingDot, animationDelay: "0.4s"}}>●</span>
                      <span style={styles.typingText}>Sending reply…</span>
                    </div>
                  )}
=======
                        ...styles.chatMessage,
                        ...(msg.from === "doctor"
                          ? styles.chatMessageDoctor
                          : styles.chatMessageStudent),
                      }}
                    >
                      <div style={styles.chatLabel}>
                        {msg.from === "doctor" ? "You" : "Student"}
                      </div>
                      <div style={styles.chatText}>{msg.text}</div>
                    </div>
                  ))}
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                </div>

                <form onSubmit={handleSend} style={styles.chatForm}>
                  <input
                    style={styles.chatInput}
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your reply to the student..."
<<<<<<< HEAD
                    disabled={sending}
                  />
                  <button
                    type="submit"
                    style={{
                      ...styles.chatSendButton,
                      ...(sending || !reply.trim() ? styles.chatSendButtonDisabled : {}),
                    }}
                    disabled={sending || !reply.trim()}
                  >
                    {sending ? (
                      <>
                        <span style={styles.buttonSpinner} />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send <span style={styles.sendIcon}>→</span>
                      </>
                    )}
=======
                  />
                  <button
                    type="submit"
                    style={styles.chatSendButton}
                    disabled={sending || !reply.trim()}
                  >
                    {sending ? "Sending..." : "Send"}
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                  </button>
                </form>
              </>
            ) : (
<<<<<<< HEAD
              <div style={styles.noChatSelected}>
                <div style={styles.noChatIcon}>💼</div>
                <h3 style={styles.noChatTitle}>No consultation selected</h3>
                <p style={styles.noChatText}>
                  Choose a consultation from the left to view and reply to messages.
=======
              <div style={{ padding: "1rem", color: "#555" }}>
                <h3 style={styles.sectionTitle}>No consultation selected</h3>
                <p style={{ fontSize: "0.9rem" }}>
                  Choose a consultation on the left to view and reply.
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
const keyframeStyles = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes typing {
    0%, 100% { opacity: 0.3; transform: translateY(0); }
    50% { opacity: 1; transform: translateY(-4px); }
  }

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fef3c7 0%, #e0f2fe 50%, #fee2e2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem 1rem",
    fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
  },
  card: {
    width: "100%",
    maxWidth: "1100px",
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 20px 50px rgba(15,23,42,0.15)",
    padding: "1.5rem 1.75rem 1.75rem",
    boxSizing: "border-box",
    border: "1px solid rgba(148,163,184,0.2)",
  },

  // Doctor Header Card
  doctorHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.25rem 1.5rem",
    borderRadius: "18px",
    background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08))",
    border: "1px solid rgba(99,102,241,0.15)",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
    gap: "1rem",
  },
  doctorAvatarSection: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  doctorAvatar: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontSize: "1.3rem",
    fontWeight: 700,
    boxShadow: "0 8px 20px rgba(99,102,241,0.4)",
    flexShrink: 0,
  },
  doctorInitials: {
    letterSpacing: "0.05em",
  },
  doctorInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "0.15rem",
  },
  doctorName: {
    margin: 0,
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#0f172a",
  },
  doctorSpec: {
    margin: 0,
    fontSize: "0.9rem",
    color: "#6b7280",
  },
  statusSection: {
    display: "flex",
    alignItems: "center",
    gap: "1.5rem",
    flexWrap: "wrap",
  },
  statusButton: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.5rem 1rem",
    borderRadius: "999px",
    border: "none",
    fontSize: "0.85rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  },
  statusButtonAvailable: {
    backgroundColor: "#ecfdf5",
    color: "#166534",
    border: "1px solid #bbf7d0",
  },
  statusButtonOffline: {
    backgroundColor: "#fef2f2",
    color: "#991b1b",
    border: "1px solid #fecaca",
  },
  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    backgroundColor: "currentColor",
    animation: "pulse 2s ease-in-out infinite",
  },
  statsRow: {
    display: "flex",
    gap: "1.5rem",
  },
  statItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "0.5rem 1rem",
    borderRadius: "12px",
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
  },
  statValue: {
    fontSize: "1.5rem",
    fontWeight: 700,
    color: "#6366f1",
  },
  statLabel: {
    fontSize: "0.75rem",
    color: "#6b7280",
    marginTop: "0.15rem",
  },

  // Layout
  layout: {
    display: "grid",
    gridTemplateColumns: "320px 1fr",
    gap: "1.25rem",
  },

  // Consultations List
  consList: {
    borderRadius: "16px",
    padding: "1rem",
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
  },
  sectionTitle: {
    marginTop: 0,
    marginBottom: "0.75rem",
    fontSize: "1rem",
    fontWeight: 700,
    color: "#0f172a",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  sectionIcon: {
    fontSize: "1.1rem",
  },
  loadingText: {
    fontSize: "0.85rem",
    color: "#6b7280",
  },
  emptyState: {
    textAlign: "center",
    padding: "2rem 1rem",
  },
  emptyIcon: {
    fontSize: "3rem",
    marginBottom: "0.5rem",
  },
  emptyText: {
    margin: 0,
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#374151",
  },
  emptySubtext: {
    margin: "0.25rem 0 0",
    fontSize: "0.85rem",
    color: "#6b7280",
  },
  consUl: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    maxHeight: "400px",
    overflowY: "auto",
  },
  consItem: {
    padding: "0.75rem 0.85rem",
    borderRadius: "12px",
    cursor: "pointer",
    marginBottom: "0.5rem",
    backgroundColor: "#ffffff",
    border: "1px solid #e5e7eb",
    transition: "all 0.2s ease",
  },
  consItemActive: {
    backgroundColor: "#eef2ff",
    border: "1px solid #6366f1",
    boxShadow: "0 4px 12px rgba(99,102,241,0.2)",
  },
  consItemHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.35rem",
  },
  consItemTitle: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#111827",
  },
  consItemIcon: {
    fontSize: "1rem",
  },
  unreadBadge: {
    backgroundColor: "#ef4444",
    color: "#ffffff",
    fontSize: "0.7rem",
    fontWeight: 700,
    padding: "0.15rem 0.5rem",
    borderRadius: "999px",
    minWidth: "20px",
    textAlign: "center",
  },
  consItemDetail: {
    fontSize: "0.8rem",
    color: "#6b7280",
    marginBottom: "0.35rem",
  },
  consItemFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: "0.75rem",
    color: "#9ca3af",
    flexWrap: "wrap",
    gap: "0.3rem",
  },
  consItemTime: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  },
  consItemStatus: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
  },

  // Chat Area
  chatArea: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "16px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  chatHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem 1.25rem",
    borderBottom: "1px solid #e5e7eb",
    backgroundColor: "#f9fafb",
  },
  chatTitle: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: 700,
    color: "#0f172a",
  },
  chatSubtitle: {
    margin: "0.15rem 0 0",
    fontSize: "0.8rem",
    color: "#6b7280",
  },
  closeButton: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "none",
    backgroundColor: "#f3f4f6",
    color: "#6b7280",
    fontSize: "1.1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s ease",
  },
  chatBox: {
    flex: 1,
    padding: "1rem",
    height: "320px",
    overflowY: "auto",
    backgroundColor: "#fafafa",
  },
  loadingMessageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    gap: "0.75rem",
  },
  loadingSpinner: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    border: "3px solid #e5e7eb",
    borderTopColor: "#6366f1",
    animation: "spin 0.8s linear infinite",
  },
  loadingMessage: {
    margin: 0,
    fontSize: "0.85rem",
    color: "#6b7280",
  },
  emptyChatState: {
    textAlign: "center",
    padding: "3rem 1rem",
  },
  emptyChatIcon: {
    fontSize: "3.5rem",
    marginBottom: "0.75rem",
  },
  emptyChatText: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: 600,
    color: "#374151",
  },
  emptyChatSubtext: {
    margin: "0.35rem 0 0",
    fontSize: "0.85rem",
    color: "#6b7280",
    maxWidth: "300px",
    marginLeft: "auto",
    marginRight: "auto",
  },
  messageRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: "0.5rem",
    marginBottom: "0.75rem",
    animation: "slideInUp 0.3s ease-out",
  },
  messageAvatar: {
    fontSize: "1.5rem",
    flexShrink: 0,
  },
  chatMessage: {
    maxWidth: "70%",
    padding: "0.6rem 0.85rem",
    borderRadius: "16px",
    fontSize: "0.9rem",
    whiteSpace: "pre-line",
  },
  chatMessageDoctor: {
    backgroundColor: "#6366f1",
    color: "#ffffff",
    borderBottomRightRadius: "4px",
  },
  chatMessageStudent: {
    backgroundColor: "#f3f4f6",
    color: "#111827",
    borderBottomLeftRadius: "4px",
  },
  chatLabel: {
    fontSize: "0.7rem",
    fontWeight: 600,
    opacity: 0.8,
    marginBottom: "0.2rem",
  },
  chatText: {
    lineHeight: 1.5,
  },
  chatTime: {
    fontSize: "0.7rem",
    opacity: 0.7,
    marginTop: "0.25rem",
  },
  typingIndicator: {
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    padding: "0.5rem 0.75rem",
    backgroundColor: "#f3f4f6",
    borderRadius: "16px",
    width: "fit-content",
    marginTop: "0.5rem",
  },
  typingDot: {
    fontSize: "0.6rem",
    color: "#6b7280",
    animation: "typing 1s ease-in-out infinite",
  },
  typingText: {
    fontSize: "0.8rem",
    color: "#6b7280",
    marginLeft: "0.3rem",
  },
  chatForm: {
    display: "flex",
    gap: "0.75rem",
    padding: "1rem 1.25rem",
    borderTop: "1px solid #e5e7eb",
    backgroundColor: "#ffffff",
    flexWrap: "wrap",
  },
  chatInput: {
    flex: "1 1 250px",
    minWidth: "250px",
    padding: "0.7rem 1rem",
    borderRadius: "999px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "0.9rem",
    transition: "border-color 0.2s ease",
  },
  chatSendButton: {
    padding: "0.7rem 1.5rem",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#6366f1",
    color: "#ffffff",
    cursor: "pointer",
    fontSize: "0.85rem",
    fontWeight: 600,
    transition: "all 0.2s ease",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    whiteSpace: "nowrap",
  },
  chatSendButtonDisabled: {
    opacity: 0.5,
    cursor: "not-allowed",
    backgroundColor: "#9ca3af",
  },
  buttonSpinner: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "#ffffff",
    animation: "spin 0.6s linear infinite",
  },
  sendIcon: {
    fontSize: "1rem",
  },
  noChatSelected: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: "3rem 2rem",
    textAlign: "center",
  },
  noChatIcon: {
    fontSize: "4rem",
    marginBottom: "1rem",
  },
  noChatTitle: {
    margin: "0 0 0.5rem",
    fontSize: "1.2rem",
    fontWeight: 700,
    color: "#0f172a",
  },
  noChatText: {
    margin: 0,
    fontSize: "0.9rem",
    color: "#6b7280",
    maxWidth: "350px",
  },
  error: {
    color: "#b91c1c",
    fontSize: "0.85rem",
    marginBottom: "0.5rem",
    padding: "0.5rem",
    backgroundColor: "#fef2f2",
    borderRadius: "8px",
    border: "1px solid #fecaca",
  },
};

// Add responsive media queries
const responsiveStyles = `
  /* Tablet styles (768px - 1024px) */
  @media (max-width: 1024px) {
    .doctor-dashboard-layout {
      grid-template-columns: 280px 1fr !important;
    }
    
    .doctor-dashboard-doctor-name {
      font-size: 1.3rem !important;
    }
  }

  /* Mobile styles (below 768px) */
  @media (max-width: 768px) {
    .doctor-dashboard-page {
      padding: 1rem 0.75rem !important;
    }
    
    .doctor-dashboard-card {
      padding: 1.25rem 1rem !important;
      border-radius: 18px !important;
    }
    
    .doctor-dashboard-doctor-header {
      flex-direction: column !important;
      align-items: flex-start !important;
      padding: 1rem !important;
    }
    
    .doctor-dashboard-status-section {
      width: 100% !important;
      justify-content: space-between !important;
    }
    
    /* Stack layout vertically on mobile */
    .doctor-dashboard-layout {
      grid-template-columns: 1fr !important;
      gap: 1rem !important;
    }
    
    .doctor-dashboard-cons-list {
      max-height: 250px !important;
    }
    
    .doctor-dashboard-cons-ul {
      max-height: 180px !important;
    }
    
    .doctor-dashboard-chat-box {
      height: 280px !important;
    }
    
    .doctor-dashboard-doctor-name {
      font-size: 1.2rem !important;
    }
    
    .doctor-dashboard-chat-message {
      max-width: 85% !important;
    }
  }

  /* Small mobile (below 480px) */
  @media (max-width: 480px) {
    .doctor-dashboard-page {
      padding: 0.75rem 0.5rem !important;
    }
    
    .doctor-dashboard-card {
      padding: 1rem 0.75rem !important;
    }
    
    .doctor-dashboard-doctor-avatar {
      width: 56px !important;
      height: 56px !important;
      font-size: 1.1rem !important;
    }
    
    .doctor-dashboard-doctor-name {
      font-size: 1.1rem !important;
    }
    
    .doctor-dashboard-doctor-spec {
      font-size: 0.85rem !important;
    }
    
    .doctor-dashboard-status-button {
      padding: 0.4rem 0.8rem !important;
      font-size: 0.8rem !important;
    }
    
    .doctor-dashboard-stat-value {
      font-size: 1.3rem !important;
    }
    
    .doctor-dashboard-cons-item {
      padding: 0.6rem 0.7rem !important;
    }
    
    .doctor-dashboard-chat-box {
      height: 240px !important;
    }
    
    .doctor-dashboard-chat-input {
      font-size: 0.85rem !important;
      padding: 0.6rem 0.85rem !important;
    }
    
    .doctor-dashboard-chat-send-button {
      padding: 0.6rem 1.2rem !important;
      font-size: 0.8rem !important;
    }
    
    .doctor-dashboard-message-avatar {
      font-size: 1.2rem !important;
    }
  }
`;

// Inject responsive styles
if (typeof document !== "undefined" && !document.getElementById("doctor-dashboard-responsive-styles")) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "doctor-dashboard-responsive-styles";
  styleSheet.textContent = responsiveStyles;
  document.head.appendChild(styleSheet);
}

export default DoctorDashboard;
=======
const styles = {
  // you can reuse similar styles from DoctorConnect
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #fee2e2, #e0f2fe)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  },
  card: {
    width: "100%",
    maxWidth: "1000px",
    backgroundColor: "#fff",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    padding: "1.5rem",
    boxSizing: "border-box",
  },
  title: { margin: 0, marginBottom: "0.35rem" },
  subtitle: { margin: 0, marginBottom: "1rem", fontSize: "0.9rem", color: "#555" },
  layout: {
    display: "grid",
    gridTemplateColumns: "280px 1fr",
    gap: "1rem",
  },
  consList: { borderRight: "1px solid #e5e7eb", paddingRight: "1rem" },
  consUl: { listStyle: "none", padding: 0, margin: 0, maxHeight: "360px", overflowY: "auto" },
  consItem: {
    padding: "0.6rem 0.7rem",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "0.35rem",
    backgroundColor: "#f9fafb",
  },
  consItemActive: { backgroundColor: "#e0ebff", border: "1px solid #4f46e5" },
  sectionTitle: { marginTop: 0, marginBottom: "0.5rem", fontSize: "1rem" },
  chatArea: { display: "flex", flexDirection: "column" },
  chatBox: {
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    padding: "0.75rem",
    height: "280px",
    overflowY: "auto",
    backgroundColor: "#f9fafb",
    marginBottom: "0.5rem",
  },
  chatMessage: { marginBottom: "0.5rem", maxWidth: "80%" },
  chatMessageDoctor: { marginLeft: "auto", textAlign: "right" },
  chatMessageStudent: { marginRight: "auto", textAlign: "left" },
  chatLabel: { fontSize: "0.75rem", fontWeight: "bold", color: "#555" },
  chatText: {
    marginTop: "0.1rem",
    display: "inline-block",
    padding: "0.45rem 0.7rem",
    borderRadius: "10px",
    backgroundColor: "#eef2ff",
    fontSize: "0.9rem",
    whiteSpace: "pre-line",
  },
  chatForm: { display: "flex", gap: "0.5rem" },
  chatInput: {
    flex: 1,
    padding: "0.6rem 0.8rem",
    borderRadius: "999px",
    border: "1px solid #ccc",
    outline: "none",
    fontSize: "0.9rem",
  },
  chatSendButton: {
    padding: "0.6rem 0.9rem",
    borderRadius: "999px",
    border: "none",
    backgroundColor: "#4f46e5",
    color: "#fff",
    cursor: "pointer",
    fontSize: "0.85rem",
  },
  error: { color: "#b91c1c", fontSize: "0.85rem", marginBottom: "0.5rem" },
};

export default DoctorDashboard;
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

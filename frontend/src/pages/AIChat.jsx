// src/pages/AIChat.jsx

import React, { useState } from "react";
import { useAIChat } from "../hooks/useAIChat";
import { useUser } from "../context/UserContext";

const AIChat = () => {
  const { chatMessages, loading, error, sendMessage, clearChat } = useAIChat();
  const { studentProfile } = useUser();
  const [input, setInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    await sendMessage(input.trim());
    setInput("");
  };

  const displayName = studentProfile?.name || "there";

  const keyframeStyles = `
    @keyframes bgGradientShift {
      0% { background-position: 0% 0%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 0%; }
    }

    @keyframes floatSlow {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }

    @keyframes pulseSoft {
      0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(56, 189, 248, 0.4); }
      50% { transform: scale(1.03); box-shadow: 0 0 0 8px rgba(56, 189, 248, 0); }
    }

    @keyframes bubbleIn {
      0% { transform: translateY(4px) scale(0.97); opacity: 0; }
      100% { transform: translateY(0px) scale(1); opacity: 1; }
    }

    @keyframes shimmerBar {
      0% { background-position: -150% 0; }
      100% { background-position: 150% 0; }
    }

    @keyframes typingDots {
      0% { opacity: 0.2; transform: translateY(0); }
      50% { opacity: 1; transform: translateY(-2px); }
      100% { opacity: 0.2; transform: translateY(0); }
    }

    @keyframes floatPill {
      0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
      50% { transform: translateY(-10px) translateX(6px); opacity: 1; }
    }

    @keyframes titleShimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    @keyframes glowRing {
      0% { box-shadow: 0 0 0 0 rgba(59,130,246,0.3); }
      70% { box-shadow: 0 0 0 14px rgba(59,130,246,0); }
      100% { box-shadow: 0 0 0 0 rgba(59,130,246,0); }
    }

    /* ECG loader keyframes */
    @keyframes heartRateIn {
      0% { width: 100%; }
      50% { width: 0; }
      100% { width: 0; }
    }

    @keyframes heartRateOut {
      0% { left: -120%; }
      30% { left: -120%; }
      100% { left: 0; }
    }
  `;

  return (
    <div style={styles.page}>
      <style>{keyframeStyles}</style>

      {/* Floating decorative pills / blobs */}
      <div style={{ ...styles.floatingPill, ...styles.floatingPill1 }}>💊</div>
      <div style={{ ...styles.floatingPill, ...styles.floatingPill2 }}>🩺</div>
      <div style={{ ...styles.floatingPill, ...styles.floatingPill3 }}>🧬</div>
      <div style={{ ...styles.floatingPill, ...styles.floatingPill4 }}>🏥</div>
      <div style={{ ...styles.floatingPill, ...styles.floatingPill5 }}>❤️‍🩹</div>

      <div style={styles.shell}>
        {/* Ribbon */}
        <div style={styles.ribbon}>
          <div style={styles.ribbonLeft}>
            <span style={styles.ribbonPill}>
              <span style={styles.pillDot} /> Campus Health AI
            </span>
            <span style={styles.ribbonSub}>
              Smart symptom structuring for students • Not a replacement for a doctor
            </span>
          </div>
          <div style={styles.ribbonRight}>
            <span style={styles.ribbonBadge}>🩺 Triage & symptom overview</span>
            <span style={styles.ribbonBadgeSecondary}>
              🔒 No diagnosis · No prescriptions
            </span>
          </div>
        </div>

        {/* HERO */}
        <div style={styles.hero}>
          <div style={styles.heroTextBlock}>
            <p style={styles.heroGreeting}>Hi {displayName},</p>
            <h1 style={styles.heroTitle}>
              Let&apos;s turn your symptoms into a clear story for your doctor.
            </h1>
            <p style={styles.heroSubtitle}>
              Describe what&apos;s going on. This assistant helps you organise your thoughts,
              highlight red-flag signs, and understand when to visit the campus clinic.
            </p>

            <div style={styles.heroChipsRow}>
              <div style={styles.heroChip}>💬 Free-form symptom chat</div>
              <div style={styles.heroChip}>🚩 Flags worrying patterns</div>
              <div style={styles.heroChip}>💊 Suggests common OTC molecules</div>
            </div>
          </div>

          {/* Hero mascot / robot */}
          <div style={styles.heroScene}>
            <div style={styles.mascotCard}>
              <div style={styles.mascotGlow} />
              <div style={styles.mascotBody}>
                <div style={styles.mascotHead}>
                  <div style={styles.mascotEyesRow}>
                    <span style={styles.mascotEye} />
                    <span style={styles.mascotEye} />
                  </div>
                  <div style={styles.mascotMouth} />
                </div>
                <div style={styles.mascotChest}>
                  <span style={styles.mascotBadge}>AI</span>
                  <span style={styles.mascotStetho}>🩺</span>
                </div>
              </div>
              <div style={styles.mascotCaption}>
                <div style={styles.mascotCaptionTitle}>AI Health Assistant</div>
                <div style={styles.mascotCaptionSub}>
                  Friendly, 24×7 triage support for students.
                </div>
              </div>
            </div>

            <div style={styles.heroConversation}>
              <div style={styles.heroBubbleUser}>
                <span style={styles.heroBubbleLabel}>You</span>
                <span style={styles.heroBubbleText}>
                  Headache and low fever since last night.
                </span>
              </div>
              <div style={styles.heroBubbleAI}>
                <span style={styles.heroBubbleLabel}>Assistant</span>
                <span style={styles.heroBubbleText}>
                  Let me organise this: duration, pain level, associated symptoms, and any triggers.
                </span>
              </div>
            </div>

            <div style={styles.heroMiniTag}>
              <span style={styles.heroMiniDot} />
              Analysing symptoms…
            </div>
          </div>
        </div>

        {/* MAIN CHAT CARD */}
        <div style={styles.chatPanel}>
          <div style={styles.chatHeaderRow}>
            <div style={styles.chatHeaderLeft}>
              <div style={styles.chatAvatarShell}>
                <span style={styles.chatAvatarIcon}>🤖</span>
                <span style={styles.chatAvatarRing} />
              </div>
              <div>
                <div style={styles.chatHeaderTitle}>Campus AI Health Assistant</div>
                <div style={styles.chatHeaderSubtitle}>
                  Share your symptoms in your own words. I&apos;ll structure them for your doctor.
                </div>
              </div>
            </div>

            <div style={styles.chatHeaderRight}>
              <span style={styles.statusChipOnline}>
                <span style={styles.statusDot} /> Online
              </span>
              <button
                type="button"
                style={styles.clearButton}
                onClick={clearChat}
                disabled={chatMessages.length === 0 && !error}
              >
                Clear chat
              </button>
            </div>
          </div>

          <div style={styles.infoStrip}>
            <div style={styles.infoStripBar} />
            <div style={styles.infoStripText}>
              🚑 Chest pain, severe breathing difficulty, heavy bleeding, or loss of consciousness? 
              Skip this chat and go straight to emergency care.
            </div>
          </div>

          <div style={styles.chatBox}>
            {/* ECG loader only inside chat box */}
            {loading && (
              <div style={styles.chatLoaderOverlay}>
                <div style={styles.hrContainer}>
                  <div style={styles.heartRate}>
                    <svg
                      xmlSpace="preserve"
                      viewBox="0 0 150 73"
                      height="73px"
                      width="150px"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.0"
                    >
                      <polyline
                        points="0,45.486 38.514,45.486 44.595,33.324 50.676,45.486 
                        57.771,45.486 62.838,55.622 71.959,9 80.067,63.729 
                        84.122,45.486 97.297,45.486 103.379,40.419 
                        110.473,45.486 150,45.486"
                        strokeMiterlimit="10"
                        strokeWidth="3"
                        stroke="#009B9E"
                        fill="none"
                      />
                    </svg>
                    <div style={styles.hrFadeIn} />
                    <div style={styles.hrFadeOut} />
                  </div>
                </div>
              </div>
            )}

            {chatMessages.length === 0 && !loading && !error && (
              <div style={styles.emptyState}>
                <p style={styles.emptyTitle}>Start with a short description.</p>
                <ul style={styles.examplesList}>
                  <li>"I have a headache and body pain since yesterday, no fever yet."</li>
                  <li>"I'm getting stomach pain after eating mess food for the last 2 days."</li>
                  <li>"I feel tightness in my chest when climbing stairs."</li>
                  <li>"I have red rashes on my arm and they are itchy."</li>
                </ul>
                <p style={styles.emptyHint}>
                  Mention when it started, where it hurts, how strong it is (1–10),
                  and any extra details (fever, nausea, injury, stress, recent travel, etc.).
                </p>
              </div>
            )}

            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  ...styles.messageRow,
                  justifyContent:
                    msg.from === "user" ? "flex-end" : "flex-start",
                  animation: "bubbleIn 0.22s ease-out",
                }}
              >
                {msg.from === "ai" && <span style={styles.avatarAI}>🤖</span>}

                <div
                  style={{
                    ...styles.messageBubble,
                    ...(msg.from === "user"
                      ? styles.messageUser
                      : styles.messageAI),
                  }}
                >
                  <div style={styles.messageLabelRow}>
                    <span style={styles.messageLabel}>
                      {msg.from === "user" ? "You" : "AI Assistant"}
                    </span>
                    {msg.from === "ai" && (
                      <span style={styles.messageMeta}>
                        Guidance only · Not a medical diagnosis
                      </span>
                    )}
                  </div>

                  <div style={styles.messageText}>{msg.text}</div>

                  {/* OTC block */}
                  {msg.from === "ai" &&
                    msg.otc &&
                    msg.otc.matches &&
                    msg.otc.matches.length > 0 && (
                      <div style={styles.otcBlock}>
                        <div style={styles.otcTitleRow}>
                          <span style={styles.otcPillIcon}>💊</span>
                          <span style={styles.otcTitle}>
                            Possible common conditions & OTC molecules
                          </span>
                        </div>

                        {msg.otc.matches.map((m) => (
                          <div key={m.slug} style={styles.otcCard}>
                            <div style={styles.otcConditionChip}>{m.name}</div>

                            {m.llm_explanation && (
                              <div style={styles.otcExplanation}>
                                {m.llm_explanation}
                              </div>
                            )}

                            {m.recommended_otc_medicines &&
                              m.recommended_otc_medicines.length > 0 && (
                                <>
                                  <div style={styles.otcSectionHeading}>
                                    Common OTC molecules (to confirm with a doctor)
                                  </div>
                                  <ul style={styles.otcList}>
                                    {m.recommended_otc_medicines.map((med, i) => (
                                      <li key={i}>
                                        <strong>{med.molecule}</strong> – {med.typical_note}{" "}
                                        {med.age_limits && (
                                          <span style={styles.otcAgeNote}>
                                            (Age: {med.age_limits})
                                          </span>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </>
                              )}

                            {m.precautions && m.precautions.length > 0 && (
                              <>
                                <div style={styles.otcSectionHeading}>
                                  Self-care / precautions
                                </div>
                                <ul style={styles.otcList}>
                                  {m.precautions.map((p, i) => (
                                    <li key={i}>{p}</li>
                                  ))}
                                </ul>
                              </>
                            )}

                            {m.when_to_see_doctor &&
                              m.when_to_see_doctor.length > 0 && (
                                <>
                                  <div style={styles.otcSectionHeading}>
                                    When you should see a doctor
                                  </div>
                                  <ul style={styles.otcList}>
                                    {m.when_to_see_doctor.map((w, i) => (
                                      <li key={i}>{w}</li>
                                    ))}
                                  </ul>
                                </>
                              )}
                          </div>
                        ))}

                        {msg.otc.disclaimer && (
                          <div style={styles.otcDisclaimer}>{msg.otc.disclaimer}</div>
                        )}
                      </div>
                    )}
                </div>

                {msg.from === "user" && <span style={styles.avatarUser}>🧑‍🎓</span>}
              </div>
            ))}

            {/* keep typing dots if you like, they sit under the ECG overlay when loading */}
            {loading && (
              <div style={styles.typingRow}>
                <span style={styles.avatarAI}>🤖</span>
                <div style={styles.typingBubble}>
                  <span style={styles.typingDot}>&bull;</span>
                  <span style={{ ...styles.typingDot, animationDelay: "0.12s" }}>
                    &bull;
                  </span>
                  <span style={{ ...styles.typingDot, animationDelay: "0.24s" }}>
                    &bull;
                  </span>
                  <span style={styles.typingText}>Thinking about your symptoms…</span>
                </div>
              </div>
            )}

            {error && <div style={styles.error}>{error}</div>}
          </div>

          {/* INPUT */}
          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.inputWrapper}>
              <input
                style={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Describe your symptoms, e.g. "I have had a sore throat and mild fever for 2 days…"'
              />
            </div>
            <button
              type="submit"
              style={styles.sendButton}
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </form>

          <div style={styles.footerRow}>
            <p style={styles.disclaimer}>
              ⚠️ This AI is for general guidance only. It does <strong>not</strong> provide a
              confirmed medical diagnosis, prescription, or emergency advice. For urgent or
              serious issues, contact a doctor or emergency services immediately.
            </p>
            <div style={styles.tagRow}>
              <span style={styles.footerTag}>No prescriptions</span>
              <span style={styles.footerTag}>Doctor consultation recommended</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    padding: "1.5rem 1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "stretch",
    position: "relative",
    overflow: "hidden",
    backgroundImage:
      "radial-gradient(circle at top, #e0f2fe 0, #fdf2ff 40%, #fef9c3 100%)",
    backgroundSize: "140% 140%",
    animation: "bgGradientShift 22s ease-in-out infinite",
  },
  shell: {
    width: "100%",
    maxWidth: "1150px",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    position: "relative",
    zIndex: 2,
  },

  // Floating pills
  floatingPill: {
    position: "absolute",
    fontSize: "1.5rem",
    opacity: 0.7,
    animation: "floatPill 7s ease-in-out infinite",
    zIndex: 1,
    pointerEvents: "none",
  },
  floatingPill1: {
    top: "8%",
    left: "6%",
    animationDuration: "8s",
  },
  floatingPill2: {
    bottom: "10%",
    right: "10%",
    animationDuration: "9s",
  },
  floatingPill3: {
    top: "40%",
    right: "4%",
    animationDuration: "7.5s",
  },
  floatingPill4: {
    top: "18%",
    right: "18%",
    animationDuration: "10s",
    animationDelay: "0.8s",
    opacity: 0.55,
  },
  floatingPill5: {
    bottom: "18%",
    left: "12%",
    animationDuration: "11s",
    animationDelay: "1.4s",
    opacity: 0.65,
  },

  // Ribbon
  ribbon: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "1rem",
    padding: "0.4rem 0.9rem",
    borderRadius: "999px",
    backgroundColor: "rgba(15,23,42,0.06)",
    border: "1px solid rgba(148,163,184,0.35)",
    backdropFilter: "blur(8px)",
    flexWrap: "wrap",
  },
  ribbonLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "0.15rem",
    flex: "1 1 auto",
    minWidth: "200px",
  },
  ribbonPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    padding: "0.2rem 0.6rem",
    borderRadius: "999px",
    backgroundColor: "rgba(59,130,246,0.1)",
    fontSize: "0.75rem",
    fontWeight: 600,
    color: "#1d4ed8",
    width: "fit-content",
  },
  pillDot: {
    width: "6px",
    height: "6px",
    borderRadius: "999px",
    background: "radial-gradient(circle, #22c55e, #16a34a)",
  },
  ribbonSub: {
    fontSize: "0.75rem",
    color: "#4b5563",
  },
  ribbonRight: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.35rem",
    justifyContent: "flex-end",
  },
  ribbonBadge: {
    fontSize: "0.75rem",
    padding: "0.2rem 0.6rem",
    borderRadius: "999px",
    backgroundColor: "#ecfeff",
    color: "#0e7490",
    border: "1px solid #a5f3fc",
    whiteSpace: "nowrap",
  },
  ribbonBadgeSecondary: {
    fontSize: "0.75rem",
    padding: "0.2rem 0.6rem",
    borderRadius: "999px",
    backgroundColor: "#fefce8",
    color: "#854d0e",
    border: "1px solid #facc15",
    whiteSpace: "nowrap",
  },

  // Hero
  hero: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1.3rem 1.2rem 1.1rem",
    borderRadius: "24px",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.96), rgba(239,246,255,0.96))",
    boxShadow: "0 18px 45px rgba(15,23,42,0.18)",
    border: "1px solid rgba(148,163,184,0.4)",
    flexWrap: "wrap",
  },
  heroTextBlock: {
    flex: "1 1 300px",
    minWidth: "280px",
  },
  heroGreeting: {
    margin: 0,
    fontSize: "0.9rem",
    color: "#6b7280",
  },
  heroTitle: {
    margin: "0.2rem 0 0.45rem",
    fontSize: "1.9rem",
    fontWeight: 800,
    backgroundImage: "linear-gradient(90deg,#0f172a,#1d4ed8,#8b5cf6)",
    backgroundSize: "200% 100%",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    animation: "titleShimmer 8s linear infinite",
  },
  heroSubtitle: {
    margin: "0 0 0.9rem",
    fontSize: "0.92rem",
    color: "#4b5563",
    maxWidth: "520px",
  },
  heroChipsRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem",
  },
  heroChip: {
    fontSize: "0.75rem",
    padding: "0.25rem 0.55rem",
    borderRadius: "999px",
    backgroundColor: "#eff6ff",
    color: "#1d4ed8",
    border: "1px solid #bfdbfe",
    whiteSpace: "nowrap",
  },

  heroScene: {
    flex: "0 1 auto",
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
    alignItems: "center",
    minWidth: "190px",
  },

  mascotCard: {
    position: "relative",
    width: "190px",
    borderRadius: "22px",
    padding: "0.7rem 0.7rem 0.55rem",
    background:
      "radial-gradient(circle at 20% 0%, rgba(248,250,252,1), rgba(59,130,246,0.18))",
    boxShadow: "0 16px 34px rgba(37,99,235,0.4)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.35rem",
    animation: "floatSlow 4.5s ease-in-out infinite",
  },
  mascotGlow: {
    position: "absolute",
    inset: "-1px",
    borderRadius: "22px",
    border: "1px solid rgba(129,140,248,0.9)",
    boxShadow: "0 0 30px rgba(129,140,248,0.6)",
    opacity: 0.9,
    pointerEvents: "none",
  },
  mascotBody: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.3rem",
  },
  mascotHead: {
    width: "64px",
    height: "40px",
    borderRadius: "16px",
    background: "linear-gradient(135deg,#e5e7eb,#ffffff,#dbeafe)",
    border: "2px solid #93c5fd",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 0.35rem",
  },
  mascotEyesRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mascotEye: {
    width: "10px",
    height: "10px",
    borderRadius: "999px",
    background:
      "radial-gradient(circle,#22d3ee 0,#0f766e 60%,#0f172a 100%)",
  },
  mascotMouth: {
    marginTop: "0.15rem",
    alignSelf: "center",
    width: "26px",
    height: "4px",
    borderRadius: "999px",
    backgroundColor: "#9ca3af",
  },
  mascotChest: {
    marginTop: "0.25rem",
    display: "flex",
    alignItems: "center",
    gap: "0.35rem",
    padding: "0.25rem 0.45rem",
    borderRadius: "999px",
    backgroundColor: "rgba(15,23,42,0.9)",
    color: "#e5e7eb",
    fontSize: "0.72rem",
  },
  mascotBadge: {
    fontWeight: 700,
    letterSpacing: "0.03em",
  },
  mascotStetho: {
    fontSize: "0.85rem",
  },
  mascotCaption: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
  },
  mascotCaptionTitle: {
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#0f172a",
  },
  mascotCaptionSub: {
    fontSize: "0.72rem",
    color: "#4b5563",
  },

  heroConversation: {
    display: "flex",
    flexDirection: "column",
    gap: "0.35rem",
    alignItems: "flex-end",
    width: "100%",
  },
  heroBubbleUser: {
    alignSelf: "flex-start",
    maxWidth: "220px",
    padding: "0.4rem 0.7rem",
    borderRadius: "14px",
    backgroundColor: "#ede9fe",
    fontSize: "0.78rem",
  },
  heroBubbleAI: {
    alignSelf: "flex-end",
    maxWidth: "260px",
    padding: "0.4rem 0.7rem",
    borderRadius: "14px",
    backgroundColor: "#e0f2fe",
    fontSize: "0.78rem",
  },
  heroBubbleLabel: {
    fontSize: "0.68rem",
    fontWeight: 600,
    color: "#6b7280",
    display: "block",
    marginBottom: "0.1rem",
  },
  heroBubbleText: {
    color: "#111827",
  },

  heroMiniTag: {
    marginTop: "0.1rem",
    fontSize: "0.75rem",
    padding: "0.2rem 0.6rem",
    borderRadius: "999px",
    backgroundColor: "#0f172a",
    color: "#e5e7eb",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    alignSelf: "center",
  },
  heroMiniDot: {
    width: "6px",
    height: "6px",
    borderRadius: "999px",
    backgroundColor: "#22c55e",
  },

  // Chat panel
  chatPanel: {
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    padding: "1rem 1rem 1.2rem",
    boxShadow: "0 18px 45px rgba(15,23,42,0.2)",
    border: "1px solid rgba(148,163,184,0.45)",
  },
  chatHeaderRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.75rem",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  chatHeaderLeft: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    flex: "1 1 auto",
    minWidth: "200px",
  },
  chatAvatarShell: {
    position: "relative",
    width: "42px",
    height: "42px",
    flexShrink: 0,
  },
  chatAvatarIcon: {
    width: "100%",
    height: "100%",
    borderRadius: "999px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6, #22c55e)",
    color: "#f9fafb",
    fontSize: "1.4rem",
    boxShadow: "0 10px 24px rgba(79,70,229,0.5)",
  },
  chatAvatarRing: {
    position: "absolute",
    inset: "-4px",
    borderRadius: "999px",
    border: "2px solid rgba(129,140,248,0.6)",
    animation: "glowRing 3.6s ease-out infinite",
  },
  chatHeaderTitle: {
    fontSize: "0.95rem",
    fontWeight: 700,
    color: "#0f172a",
  },
  chatHeaderSubtitle: {
    fontSize: "0.8rem",
    color: "#6b7280",
  },
  chatHeaderRight: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    flexWrap: "wrap",
  },
  statusChipOnline: {
    display: "inline-flex",
    alignItems: "center",
    gap: "0.3rem",
    padding: "0.2rem 0.55rem",
    borderRadius: "999px",
    backgroundColor: "#ecfdf3",
    color: "#166534",
    fontSize: "0.75rem",
    border: "1px solid #bbf7d0",
    whiteSpace: "nowrap",
  },
  statusDot: {
    width: "7px",
    height: "7px",
    borderRadius: "999px",
    background: "radial-gradient(circle, #4ade80, #22c55e)",
  },
  clearButton: {
    border: "none",
    borderRadius: "999px",
    padding: "0.35rem 0.8rem",
    fontSize: "0.75rem",
    backgroundColor: "#f3f4f6",
    color: "#4b5563",
    cursor: "pointer",
    whiteSpace: "nowrap",
  },

  infoStrip: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    marginBottom: "0.6rem",
  },
  infoStripBar: {
    width: "4px",
    minWidth: "4px",
    height: "32px",
    borderRadius: "999px",
    backgroundImage: "linear-gradient(135deg, #f97316, #ef4444, #b91c1c)",
    backgroundSize: "200% 100%",
    animation: "shimmerBar 3.5s linear infinite",
  },
  infoStripText: {
    fontSize: "0.78rem",
    color: "#7f1d1d",
    flex: 1,
  },

  chatBox: {
    position: "relative",
    borderRadius: "18px",
    border: "1px solid #e5e7eb",
    padding: "0.75rem",
    height: "260px",
    overflowY: "auto",
    backgroundColor: "#f9fafb",
  },

  // Loader inside chat box
  chatLoaderOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  },
  hrContainer: {
    background: "transparent",
    padding: 0,
  },
  heartRate: {
    width: "150px",
    height: "73px",
    position: "relative",
    margin: "0 auto",
    background: "transparent",
  },
  hrFadeIn: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#f9fafb",
    top: 0,
    right: 0,
    animation: "heartRateIn 2.5s linear infinite",
  },
  hrFadeOut: {
    position: "absolute",
    width: "120%",
    height: "100%",
    backgroundColor: "#f9fafb",
    top: 0,
    right: "-120%",
    animation: "heartRateOut 2.5s linear infinite",
  },

  emptyState: {
    fontSize: "0.85rem",
    color: "#4b5563",
    textAlign: "left",
  },
  emptyTitle: {
    margin: "0 0 0.3rem",
    fontWeight: 600,
  },
  examplesList: {
    margin: "0 0 0.4rem 1rem",
    padding: 0,
    listStyle: "disc",
  },
  emptyHint: {
    margin: 0,
    fontSize: "0.8rem",
    color: "#6b7280",
  },

  messageRow: {
    display: "flex",
    alignItems: "flex-end",
    gap: "0.4rem",
    marginBottom: "0.55rem",
  },
  messageBubble: {
    maxWidth: "70%",
    padding: "0.5rem 0.75rem",
    borderRadius: "14px",
    fontSize: "0.9rem",
    whiteSpace: "pre-line",
  },
  messageAI: {
    backgroundColor: "#e0f2fe",
    borderTopLeftRadius: "4px",
  },
  messageUser: {
    backgroundColor: "#ede9fe",
    borderTopRightRadius: "4px",
  },
  messageLabelRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "0.5rem",
    marginBottom: "0.15rem",
    flexWrap: "wrap",
  },
  messageLabel: {
    fontSize: "0.7rem",
    fontWeight: 600,
    color: "#4b5563",
  },
  messageMeta: {
    fontSize: "0.65rem",
    color: "#6b7280",
  },
  messageText: {
    color: "#111827",
  },
  avatarAI: {
    fontSize: "1.1rem",
    flexShrink: 0,
  },
  avatarUser: {
    fontSize: "1.1rem",
    flexShrink: 0,
  },

  // OTC block
  otcBlock: {
    marginTop: "0.5rem",
    paddingTop: "0.45rem",
    borderTop: "1px solid #bfdbfe",
  },
  otcTitleRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    marginBottom: "0.25rem",
  },
  otcPillIcon: {
    fontSize: "0.9rem",
  },
  otcTitle: {
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#1d4ed8",
  },
  otcCard: {
    marginBottom: "0.4rem",
    padding: "0.5rem 0.6rem",
    borderRadius: "10px",
    backgroundColor: "#eff6ff",
  },
  otcConditionChip: {
    display: "inline-block",
    padding: "0.15rem 0.5rem",
    borderRadius: "999px",
    backgroundColor: "#dbeafe",
    fontSize: "0.78rem",
    fontWeight: 600,
    color: "#1f2937",
    marginBottom: "0.25rem",
  },
  otcExplanation: {
    fontSize: "0.8rem",
    color: "#374151",
    whiteSpace: "pre-line",
    marginBottom: "0.3rem",
  },
  otcSectionHeading: {
    fontSize: "0.78rem",
    fontWeight: 600,
    color: "#1d4ed8",
    marginTop: "0.2rem",
  },
  otcList: {
    margin: "0.15rem 0 0.2rem 1rem",
    padding: 0,
    fontSize: "0.78rem",
    color: "#374151",
  },
  otcAgeNote: {
    fontSize: "0.75rem",
    color: "#6b7280",
  },
  otcDisclaimer: {
    marginTop: "0.2rem",
    fontSize: "0.75rem",
    color: "#6b7280",
  },

  typingRow: {
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    marginTop: "0.4rem",
  },
  typingBubble: {
    padding: "0.35rem 0.6rem",
    borderRadius: "999px",
    backgroundColor: "#e5e7eb",
    fontSize: "0.8rem",
    display: "flex",
    alignItems: "center",
    gap: "0.3rem",
    flexWrap: "wrap",
  },
  typingDot: {
    display: "inline-block",
    fontSize: "0.8rem",
    animation: "typingDots 1s ease-in-out infinite",
  },
  typingText: {
    color: "#4b5563",
    fontSize: "0.78rem",
    marginLeft: "0.15rem",
  },

  form: {
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    marginTop: "0.75rem",
    flexWrap: "wrap",
  },
  inputWrapper: {
    flex: "1 1 200px",
    minWidth: "200px",
    backgroundColor: "#f9fafb",
    borderRadius: "999px",
    border: "1px solid #e5e7eb",
    padding: "0.15rem 0.3rem",
  },
  input: {
    width: "100%",
    border: "none",
    outline: "none",
    background: "transparent",
    padding: "0.55rem 0.8rem",
    fontSize: "0.9rem",
  },
  sendButton: {
    border: "none",
    borderRadius: "999px",
    padding: "0.6rem 1.3rem",
    fontSize: "0.9rem",
    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 10px 24px rgba(79,70,229,0.4)",
    whiteSpace: "nowrap",
  },
  error: {
    marginTop: "0.4rem",
    color: "#b91c1c",
    fontSize: "0.8rem",
  },

  footerRow: {
    marginTop: "0.6rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: "0.6rem",
    flexWrap: "wrap",
  },
  disclaimer: {
    margin: 0,
    fontSize: "0.78rem",
    color: "#6b7280",
    flex: "1 1 300px",
  },
  tagRow: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    flex: "0 1 auto",
    alignItems: "flex-end",
  },
  footerTag: {
    fontSize: "0.72rem",
    padding: "0.2rem 0.6rem",
    borderRadius: "999px",
    backgroundColor: "#f9fafb",
    border: "1px solid #e5e7eb",
    color: "#4b5563",
    whiteSpace: "nowrap",
  },
};

export default AIChat;
// src/pages/ImageDiagnosis.jsx

<<<<<<< HEAD
import React, { useState, useEffect } from "react";
=======
import React, { useState } from "react";
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
import { useAuth } from "../context/AuthContext";
import { useUser } from "../context/UserContext";
import { analyzeImage } from "../api/apiClient";

const ImageDiagnosis = () => {
  const { isAuthenticated, role } = useAuth();
  const { studentProfile } = useUser();

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
<<<<<<< HEAD
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  // ✅ UPDATED: Safe, non-misleading loading messages
  const loadingMessages = [
    "Reviewing image clarity…",
    "Observing visible skin features…",
    "Analyzing general visual patterns…",
    "Generating guidance & safety notes…",
  ];

  // Rotate loading messages
  useEffect(() => {
    if (!loading) return;
    
    const interval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [loading, loadingMessages.length]);

  // Determine current step
  const getCurrentStep = () => {
    if (result) return 3;
    if (loading) return 2;
    return 1;
  };

  const currentStep = getCurrentStep();
=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

  // ---------- Access control ----------
  if (!isAuthenticated || role !== "student") {
    return (
      <div style={styles.page}>
        <div style={styles.shell}>
          <div style={styles.accessCard}>
            <div style={styles.accessIcon}>🛡️</div>
            <h2 style={styles.accessTitle}>Image-Based Health Check</h2>
            <p style={styles.accessText}>
              You must be logged in as a <strong>student</strong> to use this
<<<<<<< HEAD
              experimental image observation feature.
=======
              experimental image diagnosis feature.
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
            </p>
            <button
              type="button"
              style={{ ...styles.button, ...styles.buttonGhost }}
              onClick={() => window.location.assign("/")}
            >
              ← Return to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setResult(null);
    setError(null);

    const url = URL.createObjectURL(selected);
    setPreviewUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select an image first.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);
<<<<<<< HEAD
    setLoadingMessageIndex(0);
=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

    try {
      const data = await analyzeImage(file);
      setResult(data);
    } catch (err) {
<<<<<<< HEAD
      console.error("Image analysis error:", err);
=======
      console.error("Image diagnosis error:", err);
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
      setError(err.message || "Could not analyze image.");
    } finally {
      setLoading(false);
    }
  };

  const displayName = studentProfile?.name || "Student";

  return (
<<<<<<< HEAD
    <div style={styles.page} className="image-diagnosis-page">
      <style>{keyframeStyles}</style>
      
      <div style={styles.shell} className="image-diagnosis-shell">
        {/* HERO */}
        <section style={styles.hero} className="image-diagnosis-hero">
          <div style={styles.heroTag} className="image-diagnosis-hero-tag">
            <span style={styles.heroTagIcon}>🩺</span>
            <span style={styles.heroTagText}>Medical AI Assistant</span>
          </div>
          {/* ✅ UPDATED: Changed from "Diagnosis" to "Observation" */}
          <h1 style={styles.heroTitle} className="image-diagnosis-hero-title">
            Image-Based Skin Observation (Experimental)
          </h1>
          {/* ✅ UPDATED: Clearer, safer description */}
          <p style={styles.heroSubtitle} className="image-diagnosis-hero-subtitle">
            Hi {displayName}, upload a clear photo of the affected skin area.
            The AI will provide general visual observations and safety guidance.
            It does <strong>not</strong> diagnose medical conditions.
          </p>
        </section>

        {/* STEP INDICATOR */}
        <section style={styles.stepIndicator}>
          <div style={styles.stepContainer}>
            <div style={styles.stepItem}>
              <div style={{
                ...styles.stepCircle,
                ...(currentStep >= 1 ? styles.stepCircleActive : {})
              }} className="image-diagnosis-step-circle">
                {currentStep > 1 ? "✓" : "1"}
              </div>
              <div style={styles.stepLabel} className="image-diagnosis-step-label">Upload Image</div>
            </div>

            <div style={styles.stepConnector} className="image-diagnosis-step-connector">
              <div style={{
                ...styles.stepConnectorBar,
                ...(currentStep >= 2 ? styles.stepConnectorBarActive : {})
              }} />
            </div>

            <div style={styles.stepItem}>
              <div style={{
                ...styles.stepCircle,
                ...(currentStep >= 2 ? styles.stepCircleActive : {}),
                ...(currentStep === 2 ? styles.stepCirclePulsing : {})
              }} className="image-diagnosis-step-circle">
                {currentStep > 2 ? "✓" : "2"}
              </div>
              <div style={styles.stepLabel} className="image-diagnosis-step-label">AI Analysis</div>
            </div>

            <div style={styles.stepConnector} className="image-diagnosis-step-connector">
              <div style={{
                ...styles.stepConnectorBar,
                ...(currentStep >= 3 ? styles.stepConnectorBarActive : {})
              }} />
            </div>

            <div style={styles.stepItem}>
              <div style={{
                ...styles.stepCircle,
                ...(currentStep >= 3 ? styles.stepCircleActive : {})
              }} className="image-diagnosis-step-circle">
                3
              </div>
              <div style={styles.stepLabel} className="image-diagnosis-step-label">Review Results</div>
            </div>
          </div>
        </section>

        {/* CENTER CARD: capture image + results */}
        <section style={styles.centerWrapper}>
          <div style={styles.mainCard} className="image-diagnosis-main-card">
=======
    <div style={styles.page}>
      <div style={styles.shell}>
        {/* HERO */}
        <section style={styles.hero}>
          <div style={styles.heroTag}>
            <span style={styles.heroTagIcon}>🩺</span>
            <span style={styles.heroTagText}>Medical AI Assistant</span>
          </div>
          <h1 style={styles.heroTitle}>Image-Based Diagnosis (Experimental)</h1>
          <p style={styles.heroSubtitle}>
            Hi {displayName}, upload a clear photo of the affected skin area.
            The AI will provide <strong>preliminary</strong> observations to
            help your doctor visit be more focused. It does{" "}
            <strong>not</strong> replace a real diagnosis.
          </p>
        </section>

        {/* CENTER CARD: capture image + results */}
        <section style={styles.centerWrapper}>
          <div style={styles.mainCard}>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
            {/* UPLOAD SECTION */}
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>
                  Capture or upload a medical image
                  <span style={styles.labelHint}>
                    (e.g., rash, acne, redness, bite mark on visible skin)
                  </span>
                </label>

                <div style={styles.dropzone}>
<<<<<<< HEAD
                  <div style={styles.dropzoneIcon} className="image-diagnosis-dropzone-icon">📷</div>
                  <div style={styles.dropzoneTitle} className="image-diagnosis-dropzone-title">
=======
                  <div style={styles.dropzoneIcon}>📷</div>
                  <div style={styles.dropzoneTitle}>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                    Click to choose or capture
                  </div>
                  <div style={styles.dropzoneText}>
                    Supported: JPG, PNG – up to 10&nbsp;MB
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                    style={styles.fileInput}
                    id="image-upload"
                  />

<<<<<<< HEAD
                  <label htmlFor="image-upload" style={styles.button} className="image-diagnosis-button">
=======
                  <label htmlFor="image-upload" style={styles.button}>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                    Choose / Capture Image
                  </label>

                  {file && (
                    <div style={styles.fileName}>
                      Selected file: <span>{file.name}</span>
                    </div>
                  )}
                </div>
              </div>

              {previewUrl && (
                <div style={styles.previewCard}>
                  <div style={styles.previewHeader}>
                    <span style={styles.chipSuccess}>Image ready</span>
                    <button
                      type="button"
                      style={styles.linkButton}
                      onClick={() => {
                        setFile(null);
                        setPreviewUrl("");
<<<<<<< HEAD
                        setResult(null);
=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                      }}
                    >
                      Remove
                    </button>
                  </div>
<<<<<<< HEAD
                  <div style={styles.previewFrame} className="image-diagnosis-preview-frame">
=======
                  <div style={styles.previewFrame}>
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                    <img
                      src={previewUrl}
                      alt="Preview"
                      style={styles.previewImage}
                    />
                  </div>
                </div>
              )}

              {error && <div style={styles.alertError}>{error}</div>}

              <button
                type="submit"
                style={{
                  ...styles.button,
                  ...styles.buttonPrimary,
                  ...(loading || !file ? styles.buttonDisabled : {}),
                }}
<<<<<<< HEAD
                className="image-diagnosis-button"
                disabled={loading || !file}
              >
                {loading && (
                  <>
                    <span style={styles.spinner} />
                    <span style={styles.loadingText}>
                      {loadingMessages[loadingMessageIndex]}
                    </span>
                  </>
                )}
                {!loading && "Run AI analysis"}
              </button>
            </form>

            {/* ✅ UPDATED RESULTS SECTION */}
            {result && (
              <div style={styles.resultSection}>
                <div style={styles.resultHeader}>
                  {/* ✅ Changed icon from ✅ to 🔍 for observation */}
                  <div style={styles.resultIcon}>🔍</div>
                  <div>
                    {/* ✅ Changed from "AI Analysis Summary" to "AI Visual Observation" */}
                    <div style={styles.resultTitle}>AI Visual Observation</div>
                    <div style={styles.resultSubtitle}>
                      For guidance only – not a medical diagnosis
=======
                disabled={loading || !file}
              >
                {loading && <span style={styles.spinner} />}
                {loading ? "Analyzing image…" : "Run AI analysis"}
              </button>
            </form>

            {/* RESULTS */}
            {result && (
              <div style={styles.resultSection}>
                <div style={styles.resultHeader}>
                  <div style={styles.resultIcon}>✅</div>
                  <div>
                    <div style={styles.resultTitle}>AI Analysis Summary</div>
                    <div style={styles.resultSubtitle}>
                      For guidance only – not a confirmed diagnosis
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                    </div>
                  </div>
                </div>

<<<<<<< HEAD
                {/* ✅ SIMPLIFIED: Removed the grid with predicted condition and confidence */}
                {/* ✅ UPDATED: Using correct backend field name */}
                <div style={styles.resultDetail}>
                  <h3 style={styles.resultDetailHeading}>
                    What the AI observed
                  </h3>
                  <p style={styles.resultDetailText}>
                    {result.image_observation || "No observation available."}
                  </p>
                </div>

=======
                <div style={styles.resultGrid}>
                  <div style={styles.resultBox}>
                    <h3 style={styles.resultHeading}>Predicted condition</h3>
                    <p style={styles.resultMain}>
                      {result.predicted_condition || "Not available"}
                    </p>
                  </div>

                  {typeof result.confidence === "number" && (
                    <div style={styles.resultBox}>
                      <h3 style={styles.resultHeading}>Confidence score</h3>
                      <div style={styles.progressTrack}>
                        <div
                          style={{
                            ...styles.progressBar,
                            width: `${result.confidence * 100}%`,
                          }}
                        />
                      </div>
                      <p style={styles.progressLabel}>
                        {(result.confidence * 100).toFixed(1)}%
                      </p>
                    </div>
                  )}
                </div>

                {result.llm_explanation && (
                  <div style={styles.resultDetail}>
                    <h3 style={styles.resultDetailHeading}>
                      Reasoning & suggested next steps
                    </h3>
                    <p style={styles.resultDetailText}>
                      {result.llm_explanation}
                    </p>
                  </div>
                )}

>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                {result.note && (
                  <p style={styles.resultNote}>{result.note}</p>
                )}
              </div>
            )}

            {/* DISCLAIMER */}
            <div style={styles.disclaimerBlock}>
              <h3 style={styles.disclaimerTitle}>
                ⚠️ Important medical disclaimer
              </h3>
              <ul style={styles.disclaimerList}>
                <li>
                  This feature is <strong>experimental</strong> and for{" "}
                  <strong>educational use</strong> only.
                </li>
                <li>
<<<<<<< HEAD
                  AI observations can be{" "}
=======
                  AI predictions can be{" "}
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                  <strong>inaccurate or incomplete</strong>, especially for
                  poor-quality images.
                </li>
                <li>
                  Do <strong>not</strong> start, change, or stop any medication
<<<<<<< HEAD
                  based solely on this result.
=======
                  only based on this result.
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
                </li>
                <li>
                  Always consult a qualified doctor or campus health center for
                  a proper diagnosis and treatment.
                </li>
              </ul>
            </div>
<<<<<<< HEAD

            {/* TRUST SIGNAL */}
            <div style={styles.trustSignal} className="image-diagnosis-trust-signal">
              <span style={styles.trustIcon}>🔒</span>
              <span style={styles.trustText} className="image-diagnosis-trust-text">
                Images are processed securely and not stored permanently
              </span>
            </div>
=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
          </div>
        </section>
      </div>
    </div>
  );
};

<<<<<<< HEAD
const keyframeStyles = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes pulse-ring {
    0% {
      box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7);
    }
    70% {
      box-shadow: 0 0 0 8px rgba(99, 102, 241, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(99, 102, 241, 0);
    }
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
`;

=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
const styles = {
  page: {
    minHeight: "100vh",
    padding: "1.5rem 1rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at top, #e0f2fe 0, #fdf2ff 40%, #fef9c3 100%)",
    boxSizing: "border-box",
  },
  shell: {
    width: "100%",
    maxWidth: "900px",
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: "#0f172a",
  },

  // HERO
  hero: {
    textAlign: "center",
    padding: "0.5rem 0.5rem 0",
  },
  heroTag: {
    display: "inline-flex",
    alignItems: "center",
    padding: "0.25rem 0.8rem",
    borderRadius: "999px",
    background:
      "linear-gradient(90deg, rgba(79,70,229,0.95), rgba(124,58,237,0.95))",
    color: "#fff",
    fontSize: "0.8rem",
    fontWeight: 600,
    boxShadow: "0 10px 25px rgba(55,65,81,0.35)",
    marginBottom: "0.3rem",
  },
  heroTagIcon: {
    marginRight: "0.4rem",
  },
<<<<<<< HEAD
  heroTagText: {
    whiteSpace: "nowrap",
  },
=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  heroTitle: {
    margin: "0.3rem 0",
    fontSize: "2rem",
    fontWeight: 800,
    color: "#0f172a",
  },
  heroSubtitle: {
    margin: "0.2rem auto 0.8rem",
    fontSize: "0.95rem",
    color: "#4b5563",
    maxWidth: "620px",
  },

<<<<<<< HEAD
  // STEP INDICATOR
  stepIndicator: {
    display: "flex",
    justifyContent: "center",
    padding: "0.5rem",
  },
  stepContainer: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    maxWidth: "600px",
    width: "100%",
  },
  stepItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.3rem",
    flex: "0 0 auto",
  },
  stepCircle: {
    width: "36px",
    height: "36px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e5e7eb",
    color: "#9ca3af",
    fontSize: "0.85rem",
    fontWeight: 700,
    transition: "all 0.3s ease",
  },
  stepCircleActive: {
    backgroundColor: "#6366f1",
    color: "#ffffff",
    boxShadow: "0 4px 12px rgba(99, 102, 241, 0.4)",
  },
  stepCirclePulsing: {
    animation: "pulse-ring 2s ease-out infinite",
  },
  stepLabel: {
    fontSize: "0.75rem",
    color: "#6b7280",
    fontWeight: 600,
    textAlign: "center",
    whiteSpace: "nowrap",
  },
  stepConnector: {
    flex: "1 1 auto",
    height: "2px",
    backgroundColor: "#e5e7eb",
    position: "relative",
    minWidth: "20px",
  },
  stepConnectorBar: {
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    width: "0%",
    backgroundColor: "#6366f1",
    transition: "width 0.5s ease",
  },
  stepConnectorBarActive: {
    width: "100%",
  },

=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  // CENTER WRAPPER
  centerWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  mainCard: {
    width: "100%",
    maxWidth: "720px",
    backgroundColor: "rgba(255,255,255,0.97)",
    borderRadius: "22px",
    padding: "1.2rem 1.3rem",
    boxShadow: "0 18px 45px rgba(15,23,42,0.16)",
    border: "1px solid rgba(209,213,219,0.8)",
  },

  // FORM / UPLOAD
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.7rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  },
  label: {
    fontSize: "0.9rem",
    fontWeight: 600,
    color: "#111827",
  },
  labelHint: {
    display: "block",
    fontSize: "0.78rem",
    color: "#6b7280",
    marginTop: "0.05rem",
  },
  dropzone: {
    borderRadius: "18px",
    border: "1px dashed #cbd5f5",
    backgroundColor: "#f9fafb",
    padding: "0.9rem 0.9rem",
    textAlign: "center",
  },
  dropzoneIcon: {
    fontSize: "1.8rem",
    marginBottom: "0.1rem",
  },
  dropzoneTitle: {
    fontSize: "0.9rem",
    fontWeight: 600,
    marginBottom: "0.1rem",
  },
  dropzoneText: {
    fontSize: "0.8rem",
    color: "#6b7280",
    marginBottom: "0.4rem",
  },
  fileInput: {
    display: "none",
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "999px",
    padding: "0.55rem 1.2rem",
    fontSize: "0.85rem",
    fontWeight: 600,
    border: "none",
    background:
      "linear-gradient(135deg, rgba(99,102,241,1), rgba(139,92,246,1))",
    color: "#fff",
    cursor: "pointer",
    boxShadow: "0 10px 22px rgba(129,140,248,0.55)",
<<<<<<< HEAD
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  },
  buttonPrimary: {
    width: "100%",
    marginTop: "0.4rem",
  },
  buttonDisabled: {
    opacity: 0.55,
    cursor: "not-allowed",
    boxShadow: "none",
  },
  buttonGhost: {
    backgroundColor: "#f3f4f6",
    backgroundImage: "none",
    color: "#374151",
    boxShadow: "none",
  },
  fileName: {
    marginTop: "0.25rem",
    fontSize: "0.78rem",
    color: "#4b5563",
  },

<<<<<<< HEAD
  // LOADING
  spinner: {
    width: "16px",
    height: "16px",
    borderRadius: "999px",
    border: "2px solid rgba(191,219,254,0.7)",
    borderTopColor: "#eff6ff",
    marginRight: "0.45rem",
    animation: "spin 0.8s linear infinite",
    flexShrink: 0,
  },
  loadingText: {
    animation: "slideInUp 0.3s ease-out",
  },

=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  // PREVIEW
  previewCard: {
    marginTop: "0.4rem",
    borderRadius: "16px",
    border: "1px solid #bbf7d0",
    backgroundColor: "#ecfdf5",
    padding: "0.5rem 0.55rem 0.6rem",
  },
  previewHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.25rem",
<<<<<<< HEAD
    flexWrap: "wrap",
    gap: "0.5rem",
=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  },
  chipSuccess: {
    fontSize: "0.7rem",
    padding: "0.15rem 0.55rem",
    borderRadius: "999px",
    backgroundColor: "#22c55e",
    color: "#ecfdf5",
    fontWeight: 600,
<<<<<<< HEAD
    whiteSpace: "nowrap",
=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  },
  linkButton: {
    background: "none",
    border: "none",
    padding: 0,
    fontSize: "0.78rem",
    color: "#15803d",
    cursor: "pointer",
    textDecoration: "underline",
  },
  previewFrame: {
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "#e5e7eb",
    maxHeight: "260px",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    display: "block",
  },

  // ERROR
  alertError: {
    marginTop: "0.2rem",
    borderRadius: "10px",
    padding: "0.4rem 0.55rem",
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    fontSize: "0.8rem",
    color: "#b91c1c",
  },

<<<<<<< HEAD
  // RESULTS
  resultSection: {
    marginTop: "0.8rem",
    animation: "slideInUp 0.4s ease-out",
=======
  // SPINNER
  spinner: {
    width: "16px",
    height: "16px",
    borderRadius: "999px",
    border: "2px solid rgba(191,219,254,0.7)",
    borderTopColor: "#eff6ff",
    marginRight: "0.45rem",
    animation: "spin 0.8s linear infinite",
  },

  // RESULTS
  resultSection: {
    marginTop: "0.8rem",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  },
  resultHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.7rem",
    marginBottom: "0.4rem",
<<<<<<< HEAD
    flexWrap: "wrap",
=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  },
  resultIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "999px",
    background:
<<<<<<< HEAD
      "linear-gradient(135deg, rgba(99,102,241,1), rgba(139,92,246,1))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ffffff",
    fontSize: "1.3rem",
    flexShrink: 0,
=======
      "linear-gradient(135deg, rgba(16,185,129,1), rgba(59,130,246,1))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#ecfdf5",
    fontSize: "1.3rem",
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  },
  resultTitle: {
    fontSize: "0.95rem",
    fontWeight: 700,
  },
  resultSubtitle: {
    fontSize: "0.78rem",
    color: "#6b7280",
  },
  resultGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "0.5rem",
    marginTop: "0.3rem",
    marginBottom: "0.5rem",
  },
  resultBox: {
    borderRadius: "12px",
    backgroundColor: "#f9fafb",
    padding: "0.55rem 0.6rem",
    border: "1px solid #e5e7eb",
  },
  resultHeading: {
    fontSize: "0.8rem",
    color: "#6b7280",
    margin: "0 0 0.2rem",
  },
  resultMain: {
    margin: 0,
    fontSize: "1rem",
    fontWeight: 700,
    color: "#111827",
  },
<<<<<<< HEAD
=======
  progressTrack: {
    width: "100%",
    height: "8px",
    borderRadius: "999px",
    backgroundColor: "#e5e7eb",
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    borderRadius: "999px",
    background:
      "linear-gradient(90deg, rgba(16,185,129,1), rgba(59,130,246,1))",
    transition: "width 0.7s ease-out",
  },
  progressLabel: {
    marginTop: "0.2rem",
    fontSize: "0.8rem",
    fontWeight: 600,
    color: "#111827",
    textAlign: "right",
  },
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  resultDetail: {
    marginTop: "0.4rem",
    borderRadius: "12px",
    backgroundColor: "#f1f5f9",
    padding: "0.55rem 0.65rem",
    fontSize: "0.85rem",
  },
  resultDetailHeading: {
    margin: "0 0 0.2rem",
    fontSize: "0.85rem",
    fontWeight: 600,
    color: "#0f172a",
  },
  resultDetailText: {
    margin: 0,
    color: "#374151",
    whiteSpace: "pre-line",
  },
  resultNote: {
    marginTop: "0.35rem",
    fontSize: "0.78rem",
    color: "#6b7280",
  },

  // DISCLAIMER
  disclaimerBlock: {
    marginTop: "0.9rem",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "0.6rem",
  },
  disclaimerTitle: {
    margin: "0 0 0.2rem",
    fontSize: "0.9rem",
    fontWeight: 700,
  },
  disclaimerList: {
<<<<<<< HEAD
    margin: "0 0 0.5rem 0",
=======
    margin: 0,
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
    paddingLeft: "1.1rem",
    fontSize: "0.8rem",
    color: "#4b5563",
  },

<<<<<<< HEAD
  // TRUST SIGNAL
  trustSignal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    padding: "0.6rem 1rem",
    borderRadius: "12px",
    backgroundColor: "#f0fdf4",
    border: "1px solid #bbf7d0",
    marginTop: "0.4rem",
    flexWrap: "wrap",
  },
  trustIcon: {
    fontSize: "1.1rem",
  },
  trustText: {
    fontSize: "0.8rem",
    color: "#15803d",
    fontWeight: 600,
    textAlign: "center",
  },

=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  // ACCESS CARD
  accessCard: {
    maxWidth: "420px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "22px",
    padding: "1.2rem 1.4rem",
    textAlign: "center",
    boxShadow: "0 18px 45px rgba(15,23,42,0.18)",
    border: "1px solid rgba(209,213,219,0.9)",
  },
  accessIcon: {
    width: "64px",
    height: "64px",
    borderRadius: "22px",
    background:
      "linear-gradient(135deg, rgba(148,163,184,1), rgba(31,41,55,1))",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2rem",
    color: "#f9fafb",
    margin: "0 auto 0.7rem",
  },
  accessTitle: {
    margin: "0 0 0.3rem",
    fontSize: "1.4rem",
    fontWeight: 700,
  },
  accessText: {
    margin: "0 0 0.8rem",
    fontSize: "0.9rem",
    color: "#4b5563",
  },
};

<<<<<<< HEAD
// Add responsive media queries
const responsiveStyles = `
  /* Tablet styles (768px - 1024px) */
  @media (max-width: 1024px) {
    .image-diagnosis-shell {
      gap: 1rem !important;
    }
    
    .image-diagnosis-hero-title {
      font-size: 1.75rem !important;
    }
  }

  /* Mobile styles (below 768px) */
  @media (max-width: 768px) {
    .image-diagnosis-page {
      padding: 1rem 0.75rem !important;
    }
    
    .image-diagnosis-shell {
      gap: 0.9rem !important;
    }
    
    .image-diagnosis-hero {
      padding: 0.5rem 0.25rem 0 !important;
    }
    
    .image-diagnosis-hero-title {
      font-size: 1.5rem !important;
    }
    
    .image-diagnosis-hero-subtitle {
      font-size: 0.88rem !important;
    }
    
    /* Step indicator adjustments */
    .image-diagnosis-step-label {
      font-size: 0.7rem !important;
    }
    
    .image-diagnosis-step-circle {
      width: 32px !important;
      height: 32px !important;
      font-size: 0.8rem !important;
    }
    
    .image-diagnosis-step-connector {
      min-width: 15px !important;
    }
    
    /* Main card */
    .image-diagnosis-main-card {
      padding: 1rem !important;
      border-radius: 18px !important;
    }
    
    /* Preview frame */
    .image-diagnosis-preview-frame {
      max-height: 200px !important;
    }
    
    /* Results grid - stack on mobile */
    .image-diagnosis-result-grid {
      grid-template-columns: 1fr !important;
    }
  }

  /* Small mobile (below 480px) */
  @media (max-width: 480px) {
    .image-diagnosis-page {
      padding: 0.75rem 0.5rem !important;
    }
    
    .image-diagnosis-hero-title {
      font-size: 1.3rem !important;
    }
    
    .image-diagnosis-hero-subtitle {
      font-size: 0.85rem !important;
    }
    
    .image-diagnosis-hero-tag {
      font-size: 0.75rem !important;
      padding: 0.2rem 0.7rem !important;
    }
    
    /* Hide step labels on very small screens */
    .image-diagnosis-step-label {
      display: none !important;
    }
    
    .image-diagnosis-step-circle {
      width: 28px !important;
      height: 28px !important;
      font-size: 0.75rem !important;
    }
    
    .image-diagnosis-main-card {
      padding: 0.85rem !important;
    }
    
    .image-diagnosis-button {
      padding: 0.5rem 1rem !important;
      font-size: 0.8rem !important;
    }
    
    .image-diagnosis-dropzone-icon {
      font-size: 1.5rem !important;
    }
    
    .image-diagnosis-dropzone-title {
      font-size: 0.85rem !important;
    }
    
    .image-diagnosis-trust-signal {
      padding: 0.5rem 0.75rem !important;
    }
    
    .image-diagnosis-trust-text {
      font-size: 0.75rem !important;
    }
  }
`;

// Inject responsive styles
if (typeof document !== "undefined" && !document.getElementById("image-diagnosis-responsive-styles")) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "image-diagnosis-responsive-styles";
  styleSheet.textContent = responsiveStyles;
  document.head.appendChild(styleSheet);
}

export default ImageDiagnosis;
=======
/* Don't forget in your global CSS (e.g. index.css):

@keyframes spin {
  to { transform: rotate(360deg); }
}

*/

export default ImageDiagnosis;
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

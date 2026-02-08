import React, { useState, useEffect } from "react";
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
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

  const loadingMessages = [
    "Reviewing image clarity…",
    "Observing visible skin features…",
    "Analyzing general visual patterns…",
    "Generating guidance & safety notes…",
  ];

  useEffect(() => {
    if (!loading) return;
    const interval = setInterval(() => {
      setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [loading]);

  const currentStep = result ? 3 : loading ? 2 : 1;

  if (!isAuthenticated || role !== "student") {
    return (
      <div style={styles.page}>
        <div style={styles.shell}>
          <div style={styles.accessCard}>
            <div style={styles.accessIcon}>🛡️</div>
            <h2 style={styles.accessTitle}>Access Restricted</h2>
            <p style={styles.accessText}>
              You must be logged in as a <strong>student</strong> to use this experimental feature.
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
    setPreviewUrl(URL.createObjectURL(selected));
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
    try {
      const data = await analyzeImage(file);
      setResult(data);
    } catch (err) {
      setError(err.message || "Could not analyze image.");
    } finally {
      setLoading(false);
    }
  };

  const displayName = studentProfile?.name || "Student";

  return (
    <div style={styles.page} className="image-diagnosis-page">
      <style>{keyframeStyles}</style>
      <div style={styles.shell} className="image-diagnosis-shell">
        
        {/* HERO */}
        <section style={styles.hero} className="image-diagnosis-hero">
          <div style={styles.heroTag}>
            <span style={styles.heroTagIcon}>🩺</span>
            <span style={styles.heroTagText}>Medical AI Assistant</span>
          </div>
          <h1 style={styles.heroTitle}>Skin Observation (Experimental)</h1>
          <p style={styles.heroSubtitle}>
            Hi {displayName}, upload a clear photo of the skin area. 
            The AI provides observations, not a medical diagnosis.
          </p>
        </section>

        {/* STEP INDICATOR */}
        <section style={styles.stepIndicator}>
          <div style={styles.stepContainer}>
            <div style={styles.stepItem}>
              <div style={{...styles.stepCircle, ...(currentStep >= 1 ? styles.stepCircleActive : {})}}>
                {currentStep > 1 ? "✓" : "1"}
              </div>
              <div style={styles.stepLabel}>Upload</div>
            </div>
            <div style={styles.stepConnector}>
              <div style={{...styles.stepConnectorBar, ...(currentStep >= 2 ? styles.stepConnectorBarActive : {})}} />
            </div>
            <div style={styles.stepItem}>
              <div style={{...styles.stepCircle, ...(currentStep >= 2 ? styles.stepCircleActive : {}), ...(currentStep === 2 ? styles.stepCirclePulsing : {})}}>
                {currentStep > 2 ? "✓" : "2"}
              </div>
              <div style={styles.stepLabel}>Analysis</div>
            </div>
            <div style={styles.stepConnector}>
              <div style={{...styles.stepConnectorBar, ...(currentStep >= 3 ? styles.stepConnectorBarActive : {})}} />
            </div>
            <div style={styles.stepItem}>
              <div style={{...styles.stepCircle, ...(currentStep >= 3 ? styles.stepCircleActive : {})}}>3</div>
              <div style={styles.stepLabel}>Results</div>
            </div>
          </div>
        </section>

        {/* MAIN CARD */}
        <section style={styles.centerWrapper}>
          <div style={styles.mainCard} className="image-diagnosis-main-card">
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.field}>
                <label style={styles.label}>Upload skin image</label>
                <div style={styles.dropzone}>
                  <div style={styles.dropzoneIcon}>📷</div>
                  <div style={styles.dropzoneTitle}>Click to choose or capture</div>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileChange}
                    style={styles.fileInput}
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" style={styles.button}>
                    Choose Image
                  </label>
                  {file && <div style={styles.fileName}>Selected: {file.name}</div>}
                </div>
              </div>

              {previewUrl && (
                <div style={styles.previewCard}>
                  <div style={styles.previewHeader}>
                    <span style={styles.chipSuccess}>Image ready</span>
                    <button type="button" style={styles.linkButton} onClick={() => {setFile(null); setPreviewUrl(""); setResult(null);}}>Remove</button>
                  </div>
                  <div style={styles.previewFrame}>
                    <img src={previewUrl} alt="Preview" style={styles.previewImage} />
                  </div>
                </div>
              )}

              {error && <div style={styles.alertError}>{error}</div>}

              <button
                type="submit"
                style={{...styles.button, ...styles.buttonPrimary, ...(loading || !file ? styles.buttonDisabled : {})}}
                disabled={loading || !file}
              >
                {loading ? (
                  <><span style={styles.spinner} /> {loadingMessages[loadingMessageIndex]}</>
                ) : "Run AI Analysis"}
              </button>
            </form>

            {/* RESULTS */}
            {result && (
              <div style={styles.resultSection}>
                <div style={styles.resultHeader}>
                  <div style={styles.resultIcon}>🔍</div>
                  <div>
                    <div style={styles.resultTitle}>AI Visual Observation</div>
                    <div style={styles.resultSubtitle}>Guidance only</div>
                  </div>
                </div>
                <div style={styles.resultDetail}>
                  <h3 style={styles.resultDetailHeading}>Observations:</h3>
                  <p style={styles.resultDetailText}>{result.image_observation || result.llm_explanation || "Analysis complete."}</p>
                </div>
              </div>
            )}

            {/* DISCLAIMER */}
            <div style={styles.disclaimerBlock}>
              <h3 style={styles.disclaimerTitle}>⚠️ Disclaimer</h3>
              <ul style={styles.disclaimerList}>
                <li>Experimental use only. Not a medical diagnosis.</li>
                <li>Results can be inaccurate; consult a professional.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// --- Styles & Keyframes ---
const keyframeStyles = `
  @keyframes spin { to { transform: rotate(360deg); } }
  @keyframes pulse-ring {
    0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.7); }
    70% { box-shadow: 0 0 0 8px rgba(99, 102, 241, 0); }
    100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
  }
`;

const styles = {
  page: { minHeight: "100vh", padding: "1.5rem 1rem", background: "radial-gradient(circle at top, #e0f2fe 0, #fdf2ff 40%, #fef9c3 100%)", display: "flex", justifyContent: "center" },
  shell: { width: "100%", maxWidth: "800px", display: "flex", flexDirection: "column", gap: "1.5rem" },
  hero: { textAlign: "center" },
  heroTag: { display: "inline-flex", padding: "0.3rem 0.8rem", borderRadius: "999px", background: "#4f46e5", color: "#fff", fontSize: "0.8rem", marginBottom: "0.5rem" },
  heroTitle: { fontSize: "1.8rem", margin: "0.5rem 0" },
  heroSubtitle: { color: "#4b5563", fontSize: "0.9rem" },
  stepIndicator: { display: "flex", justifyContent: "center" },
  stepContainer: { display: "flex", alignItems: "center", width: "100%", maxWidth: "500px" },
  stepItem: { display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 },
  stepCircle: { width: "32px", height: "32px", borderRadius: "50%", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold", fontSize: "0.8rem" },
  stepCircleActive: { background: "#6366f1", color: "#fff" },
  stepCirclePulsing: { animation: "pulse-ring 2s infinite" },
  stepLabel: { fontSize: "0.7rem", marginTop: "4px" },
  stepConnector: { flex: 1, height: "2px", background: "#e5e7eb", margin: "0 10px", position: "relative" },
  stepConnectorBar: { position: "absolute", height: "100%", background: "#6366f1", width: "0%", transition: "0.3s" },
  stepConnectorBarActive: { width: "100%" },
  mainCard: { background: "#fff", borderRadius: "20px", padding: "1.5rem", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" },
  dropzone: { border: "2px dashed #e5e7eb", padding: "2rem", borderRadius: "15px", textAlign: "center" },
  fileInput: { display: "none" },
  button: { padding: "0.6rem 1.2rem", borderRadius: "8px", border: "none", background: "#6366f1", color: "#fff", cursor: "pointer", fontWeight: "600" },
  buttonPrimary: { width: "100%", marginTop: "1rem" },
  buttonDisabled: { opacity: 0.5 },
  buttonGhost: { background: "#f3f4f6", color: "#374151" },
  spinner: { width: "14px", height: "14px", border: "2px solid #fff", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.6s linear infinite", display: "inline-block", marginRight: "8px" },
  previewCard: { marginTop: "1rem", border: "1px solid #bbf7d0", borderRadius: "10px", overflow: "hidden" },
  previewImage: { width: "100%", maxHeight: "300px", objectFit: "contain" },
  resultSection: { marginTop: "1.5rem", padding: "1rem", background: "#f8fafc", borderRadius: "12px" },
  resultIcon: { fontSize: "1.5rem" },
  resultTitle: { fontWeight: "bold" },
  resultDetail: { marginTop: "0.5rem" },
  disclaimerBlock: { marginTop: "1.5rem", borderTop: "1px solid #eee", paddingTop: "1rem", fontSize: "0.8rem" },
};

export default ImageDiagnosis;
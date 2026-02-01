// src/pages/SmartOTC.jsx

import React, { useState } from "react";
import { sendSymptomOTC } from "../api/apiClient"; // you'll add this helper

const SmartOTC = () => {
  const [symptoms, setSymptoms] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await sendSymptomOTC(symptoms.trim());
      setResult(data);
    } catch (err) {
      console.error(err);
      setError("Could not analyze symptoms. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "1rem 1.5rem" }}>
      <h1>Smart OTC Helper</h1>
      <p style={{ maxWidth: 600, fontSize: "0.9rem", color: "#555" }}>
        Enter your symptoms in your own words. The system will suggest possible
        common conditions, general OTC molecules, precautions and when you
        should see a doctor. This is not a diagnosis.
      </p>

      <form onSubmit={handleSubmit} style={{ maxWidth: 600, marginTop: "1rem" }}>
        <textarea
          style={{ width: "100%", minHeight: 80 }}
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          placeholder="Example: I have headache and mild fever since yesterday..."
        />
        <button
          type="submit"
          disabled={loading || !symptoms.trim()}
          style={{ marginTop: "0.5rem" }}
        >
          {loading ? "Analyzing..." : "Get Suggestions"}
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>}

      {result && (
        <div style={{ marginTop: "1.5rem", maxWidth: 800 }}>
          {result.matches.length === 0 && (
            <p>
              No clear match found in the OTC library. Please consult the campus
              doctor for personalized advice.
            </p>
          )}

          {result.matches.map((m) => (
            <div
              key={m.slug}
              style={{
                border: "1px solid #e5e7eb",
                padding: "1rem",
                borderRadius: "10px",
                marginBottom: "1rem",
              }}
            >
              <h3>{m.name}</h3>
              {m.llm_explanation && (
                <p style={{ whiteSpace: "pre-line", fontSize: "0.9rem" }}>
                  {m.llm_explanation}
                </p>
              )}

              <h4>Possible OTC molecules</h4>
              <ul>
                {m.recommended_otc_medicines.map((med, idx) => (
                  <li key={idx}>
                    <strong>{med.molecule}</strong> – {med.typical_note}{" "}
                    {med.age_limits && (
                      <span style={{ fontSize: "0.85rem", color: "#555" }}>
                        (Age: {med.age_limits})
                      </span>
                    )}
                  </li>
                ))}
              </ul>

              {m.precautions?.length > 0 && (
                <>
                  <h4>Self-care / precautions</h4>
                  <ul>
                    {m.precautions.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </>
              )}

              {m.when_to_see_doctor?.length > 0 && (
                <>
                  <h4>When to see a doctor</h4>
                  <ul>
                    {m.when_to_see_doctor.map((w, idx) => (
                      <li key={idx}>{w}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          ))}

          <p style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}>
            {result.disclaimer}
          </p>
        </div>
      )}
    </div>
  );
};

export default SmartOTC;

import axios from "axios";

/**
 * Backend base URL (Vite env variable)
 */
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

/**
 * Axios instance
 */
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

/* =========================
   REQUEST INTERCEPTOR
   Attach JWT token
========================= */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* =========================
   RESPONSE INTERCEPTOR
========================= */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        `API Error [${error.response.status}]`,
        error.response.data
      );

      if (error.response.status === 401) {
        console.warn("Unauthorized – clearing auth storage");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_user");
        localStorage.removeItem("auth_role");
      }
    } else {
      console.error("Network / server error", error.message);
    }

    return Promise.reject(error);
  }
);

/* =========================
   AUTH APIs
========================= */

export const loginStudent = async (data) => {
  const res = await apiClient.post("/api/auth/student-login", data);
  return res.data;
};

export const loginDoctor = async (data) => {
  const res = await apiClient.post("/api/auth/doctor-login", data);
  return res.data;
};

export const getMe = async () => {
  const res = await apiClient.get("/api/auth/me");
  return res.data;
};

/* =========================
   AI APIs
========================= */

/**
 * General AI chat
 */
export const sendAIMessage = async (message) => {
  const res = await apiClient.post("/api/ai/chat", { message });
  return res.data;
};

/**
 * Symptom → OTC + guidance
 */
export const sendSymptomOTC = async (symptoms) => {
  const res = await apiClient.post("/api/ai/symptom-otc", { symptoms });
  return res.data;
};

/**
 * 🔥 REQUIRED FOR AIChatContext.jsx
 * Alias for AI disease info
 */
export const getDiseaseInfo = async (text) => {
  const res = await apiClient.post("/api/ai/chat", {
    message: text,
  });
  return res.data;
};

/* =========================
   IMAGE DIAGNOSIS
========================= */

export const analyzeImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await apiClient.post("/api/image/diagnose", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

/* =========================
   NEARBY PLACES
========================= */

export const getNearbyPlaces = async (params = {}) => {
  const res = await apiClient.get("/api/places", { params });
  return res.data;
};

/* =========================
   DOCTOR / CONSULTATION
========================= */

export const getDoctors = async () => {
  const res = await apiClient.get("/api/doctor/doctors");
  return res.data;
};

export const startOrGetConsultation = async (doctorId) => {
  const res = await apiClient.post("/api/doctor/consultations", {
    doctor_id: doctorId,
  });
  return res.data;
};

export const getMyConsultations = async (status) => {
  const res = await apiClient.get("/api/doctor/consultations", {
    params: status ? { status } : {},
  });
  return res.data;
};

export const getConsultationMessages = async (consultationId) => {
  const res = await apiClient.get(
    `/api/doctor/consultations/${consultationId}/messages`
  );
  return res.data;
};

export const sendConsultationMessage = async (
  consultationId,
  content
) => {
  const res = await apiClient.post(
    `/api/doctor/consultations/${consultationId}/messages`,
    { content }
  );
  return res.data;
};

export const closeConsultation = async (consultationId) => {
  const res = await apiClient.patch(
    `/api/doctor/consultations/${consultationId}/close`
  );
  return res.data;
};

export default apiClient;

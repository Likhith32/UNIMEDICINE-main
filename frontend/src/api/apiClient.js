<<<<<<< HEAD
import axios from "axios";

/**
 * ======================================================
 * API BASE CONFIG
 * ======================================================
 */

// Backend base URL
=======
// src/api/apiClient.js

import axios from "axios";

// Backend base URL (Vite env variable)
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
<<<<<<< HEAD
  withCredentials: true, // important for CORS + cookies if ever used
});

/**
 * ======================================================
 * REQUEST INTERCEPTOR – Attach JWT
 * ======================================================
 */
=======
 // timeout: 10000,
});

>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
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

<<<<<<< HEAD
/**
 * ======================================================
 * RESPONSE INTERCEPTOR – Handle Errors
 * ======================================================
 */
=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error(
        `API Error [${error.response.status}]:`,
        error.response.data
      );
    } else if (error.request) {
<<<<<<< HEAD
      console.error("❌ No response received:", error.request);
    } else {
      console.error("❌ Request setup error:", error.message);
    }

    // Auto logout on auth failure
    if (error.response?.status === 401) {
=======
      console.error("No response received:", error.request);
    } else {
      console.error("Request setup error:", error.message);
    }

    if (error.response?.status === 401) {
      console.warn("Unauthorized: clearing token.");
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      localStorage.removeItem("auth_role");
    }

    return Promise.reject(error);
  }
);

<<<<<<< HEAD
/**
 * ======================================================
 * AUTH APIs
 * ======================================================
 */

export const loginStudent = async (data) => {
  const res = await apiClient.post("/api/auth/student-login", data);
  return res.data;
};

export const loginDoctor = async (data) => {
  const res = await apiClient.post("/api/auth/doctor-login", data);
=======
// AUTH ----------------------------------------------------------

export const loginStudent = async (studentData) => {
  const res = await apiClient.post("/api/auth/student-login", studentData);
  return res.data;
};

export const loginDoctor = async (doctorData) => {
  const res = await apiClient.post("/api/auth/doctor-login", doctorData);
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
  return res.data;
};

export const getMe = async () => {
  const res = await apiClient.get("/api/auth/me");
  return res.data;
};

<<<<<<< HEAD
/**
 * ======================================================
 * AI APIs
 * ======================================================
 */
=======
// AI CHAT ----------------------------------------------------------
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

export const sendAIMessage = async (message) => {
  const res = await apiClient.post("/api/ai/chat", { message });
  return res.data;
};

export const getDiseaseInfo = async (name) => {
  const res = await apiClient.get(
    `/api/ai/disease-info?name=${encodeURIComponent(name)}`
  );
  return res.data;
};

<<<<<<< HEAD
=======
// ✅ NEW: SMART OTC ----------------------------------------------------------

>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
export const sendSymptomOTC = async (symptoms) => {
  const res = await apiClient.post("/api/ai/symptom-otc", { symptoms });
  return res.data;
};

<<<<<<< HEAD
/**
 * ======================================================
 * IMAGE DIAGNOSIS
 * ======================================================
 */
=======
// IMAGE DIAGNOSIS ----------------------------------------------------------
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

export const analyzeImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const res = await apiClient.post("/api/image/diagnose", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
<<<<<<< HEAD

  return res.data;
};

/**
 * ======================================================
 * NEARBY PLACES
 * ======================================================
 */
=======
  return res.data;
};

// NEARBY PLACES ----------------------------------------------------------
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213

export const getNearbyPlaces = async (params = {}) => {
  const res = await apiClient.get("/api/places", { params });
  return res.data;
};

<<<<<<< HEAD
/**
 * ======================================================
 * DOCTOR CONNECT (🔥 MOST IMPORTANT)
 * ======================================================
 */

/**
 * ✅ LIST ALL DOCTORS
 * Backend: GET /api/doctor/doctors
 */
export const getDoctors = async () => {
  const res = await apiClient.get("/api/doctor/doctors");
  return res.data;
};

/**
 * ✅ STUDENT – Start or get consultation
 * Backend: POST /api/doctor/consultations
 */
=======
// DOCTOR CHAT / CONSULTATIONS ---------------------------------------------

// List all doctors (student side)
export const getDoctors = async () => {
  const res = await apiClient.get("/api/doctors");
  return res.data;
};

// Student/doctor – start or get consultation
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
export const startOrGetConsultation = async (doctorId) => {
  const res = await apiClient.post("/api/doctor/consultations", {
    doctor_id: doctorId,
  });
  return res.data;
};

<<<<<<< HEAD
/**
 * ✅ STUDENT / DOCTOR – List own consultations
 * Backend: GET /api/doctor/consultations
 */
=======
// Student or doctor – list their consultations
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
export const getMyConsultations = async (status) => {
  const res = await apiClient.get("/api/doctor/consultations", {
    params: status ? { status } : {},
  });
  return res.data;
};

<<<<<<< HEAD
/**
 * ✅ GET messages for a consultation
 * Backend: GET /api/doctor/consultations/:id/messages
 */
=======
// Student or doctor – get messages of a consultation
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
export const getConsultationMessages = async (consultationId) => {
  const res = await apiClient.get(
    `/api/doctor/consultations/${consultationId}/messages`
  );
  return res.data;
};

<<<<<<< HEAD
/**
 * ✅ SEND message in consultation
 * Backend: POST /api/doctor/consultations/:id/messages
 */
=======
// Student or doctor – send a message in a consultation
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
export const sendConsultationMessage = async (consultationId, content) => {
  const res = await apiClient.post(
    `/api/doctor/consultations/${consultationId}/messages`,
    { content }
  );
  return res.data;
};

<<<<<<< HEAD
/**
 * ✅ DOCTOR – Close consultation
 * Backend: PATCH /api/doctor/consultations/:id/close
 */
export const closeConsultation = async (consultationId) => {
  const res = await apiClient.patch(
    `/api/doctor/consultations/${consultationId}/close`
  );
  return res.data;
};

=======
>>>>>>> e91794198ec50c0185b8688c9c06d9102541e213
export default apiClient;

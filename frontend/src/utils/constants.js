// src/utils/constants.js

// Backend base URL – keep it in one place
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000";

// Student level options
export const STUDENT_LEVELS = ["UG", "PG"];

// Hostel options (used in LoginPage, NearbyPlaces, etc.)
export const HOSTELS = [
  "Boys Hostel 1",
  "Boys Hostel 2",
  "Girls Hostel 1",
  "Girls Hostel 2",
];

// Example branches for UG (you can add/remove as your college has)
export const BRANCHES = [
  "CSE",
  "ECE",
  "EEE",
  "MECH",
  "CIVIL",
  "IT",
  "AIML",
];

// PG departments (customize if needed)
export const PG_DEPARTMENTS = [
  "CSE",
  "Embedded Systems",
  "VLSI",
  "Power Systems",
  "MBA",
];

// Valid years for UG
export const UG_YEARS = [1, 2, 3, 4];

// Types of places for /api/places
export const PLACE_TYPES = {
  HOSPITAL: "hospital",
  MEDICAL_SHOP: "medical_shop",
};

// Simple regex for email validation (doctor login)
export const EMAIL_REGEX =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Max file size for image uploads (in MB)
export const MAX_IMAGE_SIZE_MB = 5;

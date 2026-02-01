// validators.js placeholder
// src/utils/validators.js

import {
  STUDENT_LEVELS,
  HOSTELS,
  UG_YEARS,
  EMAIL_REGEX,
  MAX_IMAGE_SIZE_MB,
} from "./constants";

// ---------------- STUDENT LOGIN VALIDATION ---------------- //

export function validateStudentLogin(formData) {
  const errors = [];

  const { name, level, branch, year, department, hostel } = formData || {};

  if (!name || !name.trim()) {
    errors.push("Name is required.");
  }

  if (!STUDENT_LEVELS.includes(level)) {
    errors.push("Level must be UG or PG.");
  }

  if (!HOSTELS.includes(hostel)) {
    errors.push("Please select a valid hostel.");
  }

  if (level === "UG") {
    if (!branch || !branch.trim()) {
      errors.push("Branch is required for UG students.");
    }
    const yrNum = Number(year);
    if (!UG_YEARS.includes(yrNum)) {
      errors.push("Year must be between 1 and 4 for UG.");
    }
  }

  if (level === "PG") {
    if (!department || !department.trim()) {
      errors.push("Department is required for PG students.");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ---------------- DOCTOR LOGIN VALIDATION ---------------- //

export function validateDoctorLogin(formData) {
  const errors = [];
  const { email, password } = formData || {};

  if (!email || !email.trim()) {
    errors.push("Email is required.");
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.push("Please enter a valid email address.");
  }

  if (!password || !password.trim()) {
    errors.push("Password is required.");
  } else if (password.length < 4) {
    errors.push("Password should be at least 4 characters.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ---------------- AI CHAT MESSAGE VALIDATION ---------------- //

export function validateAIMessage(message) {
  const errors = [];
  const text = (message || "").trim();

  if (!text) {
    errors.push("Please type your symptoms or question.");
  } else if (text.length < 5) {
    errors.push("Message is too short. Add a bit more detail.");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

// ---------------- IMAGE FILE VALIDATION ---------------- //

export function validateImageFile(file) {
  const errors = [];

  if (!file) {
    errors.push("Please select an image file.");
  } else {
    // Type check
    if (!file.type.startsWith("image/")) {
      errors.push("File must be an image (jpg, png, etc.).");
    }

    // Size check
    const maxBytes = MAX_IMAGE_SIZE_MB * 1024 * 1024;
    if (file.size > maxBytes) {
      errors.push(`Image must be smaller than ${MAX_IMAGE_SIZE_MB} MB.`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

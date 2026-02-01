// src/context/AIChatContext.jsx

import React, { createContext, useContext, useState } from "react";
import { useAuth } from "./AuthContext";
import {
  sendAIMessage,
  getDiseaseInfo as apiGetDiseaseInfo,
} from "../api/apiClient";

const AIChatContext = createContext(null);

export const AIChatProvider = ({ children }) => {
  const { isAuthenticated, role } = useAuth();

  const [chatMessages, setChatMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const appendMessage = (from, text, extra = {}) => {
    setChatMessages((prev) => [...prev, { from, text, ...extra }]);
  };

  const sendMessage = async (userText) => {
    const trimmed = userText?.trim();
    if (!trimmed) return;

    if (!isAuthenticated || role !== "student") {
      setError("You must be logged in as a student to use the AI assistant.");
      return;
    }

    setError(null);
    appendMessage("user", trimmed);
    setLoading(true);

    try {
      const data = await sendAIMessage(trimmed);

      const replyText =
        data?.reply || "I couldn't generate a response right now.";
      const otcBlock = data?.otc || null;

      appendMessage("ai", replyText, { otc: otcBlock });
    } catch (err) {
      console.error("AI chat error:", err);
      setError(
        err?.message ||
          "Something went wrong while talking to the AI assistant."
      );
      appendMessage(
        "ai",
        "Sorry, I couldn't respond properly right now. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setChatMessages([]);
    setError(null);
  };

  const fetchDiseaseInfo = async (diseaseName) => {
    const trimmed = diseaseName?.trim();
    if (!trimmed) return null;

    if (!isAuthenticated) {
      setError("You must be logged in to use this feature.");
      return null;
    }

    setError(null);
    setLoading(true);
    try {
      const data = await apiGetDiseaseInfo(trimmed);
      return data;
    } catch (err) {
      console.error("Disease info error:", err);
      setError(err?.message || "Could not fetch disease info.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AIChatContext.Provider
      value={{
        chatMessages,
        loading,
        error,
        sendMessage,
        clearChat,
        fetchDiseaseInfo,
      }}
    >
      {children}
    </AIChatContext.Provider>
  );
};

export const useAIChatContext = () => {
  const ctx = useContext(AIChatContext);
  if (!ctx) {
    throw new Error("useAIChatContext must be used inside <AIChatProvider>");
  }
  return ctx;
};

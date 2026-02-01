// src/hooks/useAIChat.js

import { useAIChatContext } from "../context/AIChatContext";

/**
 * useAIChat
 *
 * Thin wrapper around the global AIChatContext.
 * All the real logic + state (chatMessages, loading, error, sendMessage, etc.)
 * lives in src/context/AIChatContext.jsx
 */
export function useAIChat() {
  return useAIChatContext();
}

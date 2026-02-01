// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { UserProvider } from "./context/UserContext";
import { AIChatProvider } from "./context/AIChatContext"; // ⬅️ import
import "./styles/global.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <UserProvider>
        <AIChatProvider>        {/* ⬅️ wrap App here */}
          <App />
        </AIChatProvider>
      </UserProvider>
    </AuthProvider>
  </React.StrictMode>
);

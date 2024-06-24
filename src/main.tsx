import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.scss";
import { BrowserRouter } from "react-router-dom";
import { NotificationsProvider } from "./providers/NotificationProvider/index.tsx";
import { AuthProvider } from "./providers/AuthProvider/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotificationsProvider>
          <App />
        </NotificationsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

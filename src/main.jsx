import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalProvider } from "./components/GlobalContext/GlobalContext"; // FIXED IMPORT

import "./assets/css/main.css";

const root = document.getElementById("root");

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <GlobalProvider>  {/* FIXED USAGE */}
        <App />
      </GlobalProvider>
    </React.StrictMode>
  );
}

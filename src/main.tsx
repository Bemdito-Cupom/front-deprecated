import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { ThemeProvider } from "@material-tailwind/react";
import StoreProvider from "./storeProvider";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
  <StoreProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StoreProvider>
  </React.StrictMode>,
);

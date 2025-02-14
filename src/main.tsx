import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.js";
import { StateProvider } from "./context/StateContext.js";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StateProvider>
      <App />
    </StateProvider>
  </StrictMode>,
);

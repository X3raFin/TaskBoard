import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import BoardPage from "./Components/BoardPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BoardPage />
  </StrictMode>
);

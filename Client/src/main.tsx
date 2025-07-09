import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardsPage from "./Components/BoardsPage.tsx";
import BoardPage from "./Components/BoardPage.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path="/" element={<BoardsPage />} />
        <Route path="column/:BoardId" element={<BoardPage />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);

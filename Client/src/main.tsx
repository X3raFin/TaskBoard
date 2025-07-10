import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardsPage from "./Components/BoardsPage.tsx";
import BoardPage from "./Components/BoardPage.tsx";
import Nav from "./Components/Nav.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Nav />
      <Routes>
        <Route path="/" element={<BoardsPage />} />
        <Route path="column/:BoardId" element={<BoardPage />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);

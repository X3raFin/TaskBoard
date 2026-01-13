import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BoardPage from "./Components/BoardPage.tsx";
import Nav from "./Components/Nav.tsx";
import "./App.css";
import Dashboard from "./Components/Dashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="column/:BoardId" element={<BoardPage />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
);

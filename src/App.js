// src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "./components/NavBar"; // твоя Nav компонент
import ExcursionList from "./components/ExcursionList";
import Favorites from "./components/Favourites"; // страница с любими, ако имаш такава
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";
export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<ExcursionList />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

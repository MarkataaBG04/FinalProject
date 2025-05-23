import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./NavBar.css";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">MyApp</div>
      <ul className="navbar-links">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : undefined)}
            end>
            Начало
          </NavLink>
        </li>

        {!user ? (
          <>
            <li>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? "active" : undefined)}>
                Вход
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? "active" : undefined)}>
                Регистрация
              </NavLink>
            </li>
          </>
        ) : (
          <>
            <li>
              <NavLink
                to="/favorites"
                className={({ isActive }) => (isActive ? "active" : undefined)}>
                Любими
              </NavLink>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="logout-button"
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                  padding: 0,
                  fontSize: "1rem",
                }}>
                Изход
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

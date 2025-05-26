import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { favorites = [], removeFromFavorites } = useContext(AuthContext);

  if (!favorites.length) {
    return (
      <div className="excursion-container">
        <h2 className="excursion-heading">Любими екскурзии</h2>
        <p className="no-excursions">
          Все още нямаш добавени любими екскурзии.
        </p>
        <Link
          to="/"
          className="text-blue-600 hover:underline mt-4 inline-block">
          Върни се към каталога
        </Link>
      </div>
    );
  }

  return (
    <div className="excursion-container">
      <h2 className="excursion-heading">Любими екскурзии</h2>
      <div className="excursion-slider-container">
        {favorites.map((excursion) => (
          <div key={excursion.id} className="excursion-slide">
            <div className="excursion-image-wrapper">
              <img
                src={excursion.imageUrl}
                alt={excursion.title}
                className="excursion-image"
              />
              <button
                className="favorite-btn favorite-active"
                onClick={() => removeFromFavorites(excursion.id)}>
                ❤️
              </button>
            </div>
            <div className="excursion-details">
              <h3 className="excursion-title">{excursion.title}</h3>
              <p className="excursion-description">{excursion.description}</p>
              <p className="excursion-price">{excursion.price} лв.</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <Link
          to="/"
          className="text-blue-600 hover:underline"
          style={{
            fontSize: "1.1rem",
            fontWeight: "600",
            padding: "10px 20px",
            backgroundColor: "#e0e7ff",
            borderRadius: "6px",
            display: "inline-block",
            textDecoration: "none",
            color: "#2563eb",
            transition: "background-color 0.3s ease",
          }}>
          ⬅️ Върни се към каталога
        </Link>
      </div>
    </div>
  );
}

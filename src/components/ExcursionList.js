import React, { useState, useEffect, useContext } from "react";
import { fetchExcursions } from "../api/excursions";
import { AuthContext } from "../context/AuthContext";
import { useLocation } from "react-router-dom";

export default function ExcursionList() {
  const [excursions, setExcursions] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("Всички");
  const [currentIndex, setCurrentIndex] = useState(0);

  const { user, favorites, addToFavorites, removeFromFavorites } =
    useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    fetchExcursions().then(setExcursions);
  }, []);

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  const handleToggleFavorite = (excursion) => {
    const alreadyFavorite = (favorites || []).some(
      (fav) => fav.id === excursion.id
    );
    if (alreadyFavorite) {
      removeFromFavorites(excursion.id);
    } else {
      addToFavorites(excursion);
    }
  };

  const filteredExcursions =
    selectedCountry === "Всички"
      ? excursions
      : excursions.filter((e) => e.country === selectedCountry);

  const currentExcursion = filteredExcursions[currentIndex] || null;

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? filteredExcursions.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === filteredExcursions.length - 1 ? 0 : prev + 1
    );
  };

  const countries = ["Всички", ...new Set(excursions.map((e) => e.country))];

  return (
    <div className="excursion-slider-container">
      <h2 className="excursion-heading">Каталог с екскурзии</h2>

      <div className="excursion-filter">
        <label className="filter-label">Филтър по държава:</label>
        <select
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(e.target.value);
            setCurrentIndex(0);
          }}
          className="filter-select">
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {currentExcursion && (
        <div className="excursion-slide">
          <div className="excursion-image-wrapper">
            <img
              src={currentExcursion.imageUrl}
              alt={currentExcursion.title}
              className="excursion-image"
            />
            {user && (
              <button
                onClick={() => handleToggleFavorite(currentExcursion)}
                className={`favorite-btn ${
                  favorites.some((f) => f.id === currentExcursion.id)
                    ? "favorite-active"
                    : ""
                }`}
                title="Любима">
                {favorites.some((f) => f.id === currentExcursion.id)
                  ? "❤️"
                  : "🤍"}
              </button>
            )}
          </div>

          <div className="excursion-details">
            <h3 className="excursion-title">{currentExcursion.title}</h3>
            <p className="excursion-description">
              {currentExcursion.description}
            </p>
            <p className="excursion-price">{currentExcursion.price} лв.</p>
          </div>

          <div className="slider-buttons">
            <button onClick={handlePrev} className="slider-btn">
              ⬅️ Назад
            </button>
            <button onClick={handleNext} className="slider-btn">
              Напред ➡️
            </button>
          </div>
        </div>
      )}

      {filteredExcursions.length === 0 && (
        <p className="no-excursions">Няма екскурзии за тази държава.</p>
      )}
    </div>
  );
}

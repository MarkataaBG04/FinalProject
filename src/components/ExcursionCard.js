// src/components/ExcursionCard.js
import React from "react";
import { Link } from "react-router-dom";

export default function ExcursionCard({ excursion }) {
  return (
    <div className="excursion-card">
      <img src={excursion.imageUrl} alt={excursion.title} />
      <h3>{excursion.title}</h3>
      <p>{excursion.description}</p>
      <p>Цена: {excursion.price} лв.</p>
      <Link to={`/excursions/${excursion.id}`}>Виж повече</Link>
    </div>
  );
}

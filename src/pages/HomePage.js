// src/pages/HomePage.js
import React from "react";
import ExcursionList from "../components/ExcursionList";

export default function HomePage() {
  return (
    <div>
      <h1>Добре дошли в MyTrips</h1>
      <ExcursionList />
    </div>
  );
}

const BASE_URL = "http://localhost:5000/excursions";

export async function fetchExcursions() {
  const res = await fetch(BASE_URL);
  if (!res.ok) {
    throw new Error("Грешка при зареждане на екскурзиите");
  }
  return res.json();
}

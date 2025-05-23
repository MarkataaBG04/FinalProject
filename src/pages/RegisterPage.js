import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Проверка за съществуващо потребителско име
      const res = await fetch(
        `http://localhost:5000/users?username=${data.username}`
      );
      const existingUsers = await res.json();
      if (existingUsers.length > 0) {
        alert("Потребителското име вече съществува.");
        return;
      }

      // Проверка за съществуващ имейл
      const resEmail = await fetch(
        `http://localhost:5000/users?email=${data.email}`
      );
      const existingEmails = await resEmail.json();
      if (existingEmails.length > 0) {
        alert("Имейлът вече съществува.");
        return;
      }

      // Добавяне на нов потребител
      const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      });

      if (!response.ok) throw new Error("Грешка при регистрацията");

      const user = await response.json();

      // Логване на потребителя след регистрация
      login(user);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Възникна проблем при регистрацията");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "30px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
      }}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="username"
            style={{ display: "block", marginBottom: "6px" }}>
            Потребителско име
          </label>
          <input
            id="username"
            type="text"
            placeholder="Въведи потребителско име"
            {...register("username", {
              required: "Потребителското име е задължително",
              minLength: { value: 3, message: "Минимум 3 символа" },
            })}
            style={{
              width: "100%",
              padding: "8px",
              borderColor: errors.username ? "red" : "#ccc",
              borderRadius: "4px",
            }}
          />
          {errors.username && (
            <p style={{ color: "red", marginTop: "4px" }}>
              {errors.username.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", marginBottom: "6px" }}>
            Имейл
          </label>
          <input
            id="email"
            type="email"
            placeholder="Въведи имейл"
            {...register("email", {
              required: "Имейлът е задължителен",
              pattern: { value: /^\S+@\S+$/i, message: "Невалиден имейл" },
            })}
            style={{
              width: "100%",
              padding: "8px",
              borderColor: errors.email ? "red" : "#ccc",
              borderRadius: "4px",
            }}
          />
          {errors.email && (
            <p style={{ color: "red", marginTop: "4px" }}>
              {errors.email.message}
            </p>
          )}
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "6px" }}>
            Парола
          </label>
          <input
            id="password"
            type="password"
            placeholder="Въведи парола"
            {...register("password", {
              required: "Паролата е задължителна",
              minLength: { value: 6, message: "Минимум 6 символа" },
            })}
            style={{
              width: "100%",
              padding: "8px",
              borderColor: errors.password ? "red" : "#ccc",
              borderRadius: "4px",
            }}
          />
          {errors.password && (
            <p style={{ color: "red", marginTop: "4px" }}>
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}>
          Регистрирай се
        </button>
      </form>
    </div>
  );
}

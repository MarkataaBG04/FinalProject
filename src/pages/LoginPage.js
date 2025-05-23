import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Проверка в базата (json-server) за потребителя с username и password
      const res = await fetch(
        `http://localhost:5000/users?username=${data.username}&password=${data.password}`
      );
      const users = await res.json();

      if (users.length === 0) {
        alert("Грешно потребителско име или парола");
        return;
      }

      // Успешно влизане
      login(users[0]);
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Възникна проблем при влизането");
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
      <h2>Вход</h2>
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
          Влез
        </button>
      </form>
    </div>
  );
}

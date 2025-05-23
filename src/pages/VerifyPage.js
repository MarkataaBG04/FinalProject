import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function VerifyPage() {
  const { user, verifyAccount } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleVerify = () => {
    verifyAccount();
    alert("Акаунтът е потвърден!");
    navigate("/profile");
  };

  if (!user) {
    return <p>Трябва да влезете, за да потвърдите акаунта.</p>;
  }

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Потвърждаване на акаунт</h2>
      <p>
        Здравей, <b>{user.username}</b>! Моля, потвърди акаунта си.
      </p>
      <button onClick={handleVerify}>Потвърди акаунта</button>
    </div>
  );
}

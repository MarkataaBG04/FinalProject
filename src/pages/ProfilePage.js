import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProfilePage() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Профил</h2>
      <p>
        Добре дошъл, <b>{user.username}</b>!
      </p>
      <button onClick={logout}>Изход</button>
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome</h1>
      <button onClick={() => navigate("/login")}>LogIn</button>
      <br />
      <button onClick={() => navigate("/register")}>Register</button>
      <br />
      <button onClick={() => navigate("/users")}>Show Users</button>
    </div>
  );
}

export default Welcome;

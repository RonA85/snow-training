import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ArrowButton from "../components/ArrowButton";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const navigate = useNavigate();

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

  const handleCreation = async (e) => {
    e.preventDefault();
    setError("");

    if (!/^[א-ת]+$/.test(firstName)) {
      setError("First name can only contain Hebrew letters");
      return;
    }

    if (!/^[א-ת]+$/.test(lastName)) {
      setError("Last name can only contain Hebrew letters");
      return;
    }

    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(email)) {
      setError("Invalid email format");
      return;
    }

    if (password.length > 6) {
      setError("Password must be up to 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!dateOfBirth) {
      setError("Date of birth is required");
      return;
    }

    if (calculateAge(dateOfBirth) < 18) {
      setError("You must be at least 18 years old to register");
      return;
    }

    try {
      await axios.post("http://localhost:3000/register", {
        email,
        password,
        firstName,
        lastName,
        dateOfBirth,
      });
      navigate("/");
    } catch (error) {
      setError(error.response ? error.response.data : "Error creating account");
    }
  };

  const validateFirstName = (name) => {
    if (!name) {
      setFirstNameError("");
    } else if (!/^[א-ת]+$/.test(name)) {
      setFirstNameError("First name can only contain Hebrew letters");
    } else {
      setFirstNameError("");
    }
  };

  const validateLastName = (name) => {
    if (!name) {
      setLastNameError("");
    } else if (!/^[א-ת]+$/.test(name)) {
      setLastNameError("Last name can only contain Hebrew letters");
    } else {
      setLastNameError("");
    }
  };

  return (
    <div>
      <ArrowButton />
      <img
        src="https://icons.veryicon.com/png/128/miscellaneous/esgcc-basic-icon-library/register-14.png"
        alt="register"
      />
      <h2>Register Page</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleCreation}>
        <input
          placeholder="First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            validateFirstName(e.target.value);
          }}
          required
        />
        {firstNameError && <p style={{ color: "red" }}>{firstNameError}</p>}
        <br />
        <input
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            validateLastName(e.target.value);
          }}
          required
        />
        {lastNameError && <p style={{ color: "red" }}>{lastNameError}</p>}
        <br />
        <input
          placeholder="Date Of Birth"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="New Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="New Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <input
          placeholder="Verify New Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;

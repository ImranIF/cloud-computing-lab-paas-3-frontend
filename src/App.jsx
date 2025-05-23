import React, { useState } from "react";
import axios from "axios";

function App() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuth = async () => {
    const endpoint = isLoginMode ? "/login" : "/register";
    try {
      setLoading(true);
      const response = await axios.post(
        `https://cloud-computing-lab-paas-3.onrender.com${endpoint}`,
        {
          username,
          password,
        }
      );
      setMessage(response.data.message);
      setError("");
      if (isLoginMode) {
        setIsLoggedIn(true);
      }
    } catch (err) {
      setMessage("");
      setError(err.response?.data?.error || "Something went wrong");
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card p-4">
        <h2 className="mb-4 text-center">
          {isLoginMode ? "Login" : "Register"}
        </h2>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary w-100" onClick={handleAuth}>
          {loading ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : isLoginMode ? (
            "Login"
          ) : (
            "Register"
          )}
        </button>
        <div className="text-center mt-3">
          <button
            className="btn btn-link"
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setMessage("");
              setError("");
              setIsLoggedIn(false);
            }}
          >
            Switch to {isLoginMode ? "Register" : "Login"}
          </button>
        </div>
        {message && (
          <div className="alert alert-success mt-3" role="alert">
            {message}
          </div>
        )}
        {error && (
          <div className="alert alert-danger mt-3" role="alert">
            {error}
          </div>
        )}
      </div>
      {isLoggedIn && isLoginMode && (
        <div className="card mt-4 shadow">
          <div className="card-body text-center">
            <h4 className="card-title">Welcome!</h4>
            <p className="card-text">
              You are logged in as <strong>{username}</strong>.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

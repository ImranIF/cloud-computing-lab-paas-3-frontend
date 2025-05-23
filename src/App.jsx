import React, { useState } from "react";
import axios from "axios";

function App() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    } catch (err) {
      setMessage("");
      setError(err.response?.data?.error || "Something went wrong");
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
    </div>
  );
}

export default App;

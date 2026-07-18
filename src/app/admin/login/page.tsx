"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login for UI preview
    setTimeout(() => {
      setIsLoading(false);
      alert("Fungsi login sedang dalam tahap pengembangan (UI Preview).");
    }, 1000);
  };

  return (
    <div className="admin-layout">
      <div className="admin-login-card">
        <div className="admin-brand">
          Jetis<span className="admin-brand-dot">.</span>
        </div>
        <h1 className="admin-login-title">Masuk ke Panel Admin</h1>

        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label className="admin-label" htmlFor="email">Email / Username</label>
            <input
              type="text"
              id="email"
              className="admin-input"
              placeholder="Masukkan email atau username Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="admin-form-group">
            <label className="admin-label" htmlFor="password">Kata Sandi</label>
            <input
              type="password"
              id="password"
              className="admin-input"
              placeholder="Masukkan kata sandi"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="admin-submit-btn" 
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'not-allowed' : 'pointer' }}
          >
            {isLoading ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}

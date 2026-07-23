"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      // Refresh router to apply middleware redirects
      router.refresh();
    }
  };

  return (
    <div className="admin-layout">
      <div className="admin-login-card">
        <div className="admin-brand">
          Jetis<span className="admin-brand-dot">.</span>
        </div>
        <h1 className="admin-login-title">Masuk ke Panel Admin</h1>

        {error && (
          <div style={{ padding: "10px", background: "#fef2f2", color: "#dc2626", borderRadius: "6px", fontSize: "14px", marginBottom: "16px", border: "1px solid #f87171" }}>
            {error}
          </div>
        )}

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

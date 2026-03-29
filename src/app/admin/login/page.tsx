"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ArrowRight } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-bg-light flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-full border-2 border-primary-dark flex items-center justify-center mx-auto mb-5">
            <svg viewBox="0 0 40 40" className="w-8 h-8 text-primary-dark" fill="none">
              <path d="M8 32L20 8L32 32H28L20 16L12 32H8Z" fill="currentColor"/>
              <rect x="14" y="24" width="12" height="2" fill="currentColor"/>
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-primary-dark font-[var(--font-heading)] italic">
            Admin Login
          </h1>
          <p className="text-neutral-mid text-sm mt-2">
            AISB Internship Portal Administration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-neutral-border p-8 space-y-5">
          {error && (
            <div className="bg-accent-pink/10 border border-accent-pink/20 text-accent-pink text-sm rounded-2xl px-4 py-3 font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-full border-2 border-neutral-border text-primary-dark focus:outline-none focus:border-primary-dark transition-colors"
              placeholder="admin@aisb.hu"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-light mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-3 rounded-full border-2 border-neutral-border text-primary-dark focus:outline-none focus:border-primary-dark transition-colors"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-black justify-center disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-[10px] text-neutral-light text-center uppercase tracking-wider font-bold">
            Default: admin@aisb.hu / admin123
          </p>
        </form>
      </div>
    </div>
  );
}

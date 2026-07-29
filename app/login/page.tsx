"use client";

import { supabase } from "@/lib/supabase";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Logged In");
    router.push("/");
  }

  async function signup() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("✅ Account Created");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="glass p-8 rounded-3xl w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6">
          📚 BookWise Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-xl border mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-xl border mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          className="w-full bg-primary py-3 rounded-xl mb-3"
        >
          Login
        </button>

        <button
          onClick={signup}
          className="w-full border py-3 rounded-xl"
        >
          Create Account
        </button>

      </div>
    </div>
  );
}
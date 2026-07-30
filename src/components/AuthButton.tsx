"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AuthButton() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setUser(session?.user ?? null);
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  if (user) {
    return (
      <button
        onClick={logout}
        className="bg-red-500 text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-red-600 transition"
      >
        Logout
      </button>
    );
  }

  return (
    <>
      <Link
        href="/login"
        className="hidden sm:inline-flex text-sm font-medium px-4 py-2 text-foreground/70 hover:text-primary transition-colors"
      >
        Log In
      </Link>

      <Link
        href="/signup"
        className="bg-primary text-primary-foreground text-sm font-semibold px-5 py-2 rounded-full hover:shadow-glow-gold transition-all"
      >
        Sign Up
      </Link>
    </>
  );
}
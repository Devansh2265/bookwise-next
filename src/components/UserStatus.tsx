"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UserStatus() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setEmail(user?.email || "");
    }

    loadUser();
  }, []);

  return (
    <div className="text-sm text-white">
      {email ? (
        <p>✅ Logged in as: {email}</p>
      ) : (
        <p>❌ Not logged in</p>
      )}
    </div>
  );
}
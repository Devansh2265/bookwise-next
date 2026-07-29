"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function UserStatus() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setEmail(user?.email || "");
    }

    getUser();
  }, []);

  return (
    <div className="text-sm">
      {email ? (
        <p>✅ Logged in as: {email}</p>
      ) : (
        <p>❌ Not logged in</p>
      )}
    </div>
  );
}
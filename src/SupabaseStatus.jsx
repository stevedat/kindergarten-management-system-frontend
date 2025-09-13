import React, { useEffect, useState } from "react";
 // import { supabase } from "./supabaseClient";

export default function SupabaseStatus() {
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    async function checkConnection() {
      // const { error } = await supabase.from("teachers").select("id").limit(1);
      // if (error) setStatus("❌ Not Connected");
      // else setStatus("✅ Connected to Supabase");
    }
    checkConnection();
  }, []);

  return (
    <div style={{ position: "fixed", bottom: 10, right: 10, background: "#fff", border: "1px solid #ccc", borderRadius: 4, padding: 8, zIndex: 9999 }}>
      {/* Supabase Status: {status} */}
    </div>
  );
}

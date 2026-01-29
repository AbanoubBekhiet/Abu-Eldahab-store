"use client";
import { useState, useEffect } from "react";
import { supabase } from "../_libs/browser-client";

export function useSupabaseUser(initialUser = null) {
  const [user, setUser] = useState(initialUser);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => listener.subscription.unsubscribe();
  }, []); 

  return user;
}

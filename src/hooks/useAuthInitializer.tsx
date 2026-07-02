"use client";

import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase/firebase.config";
import { getUserData } from "@/lib/getUserData";
import { useAuthStore } from "@/lib/store/auth.store";

export default function AuthInitializer() {
  const setUser = useAuthStore((state) => state.setUser);
  const setRole = useAuthStore((state) => state.setRole);
  const setLoading = useAuthStore((state) => state.setLoading);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          setUser(firebaseUser);

          const userData = await getUserData(firebaseUser.uid);

          setRole(userData?.role ?? null);
        } else {
          clearAuth();
        }
      } catch (error) {
        console.error("Auth init error:", error);
        clearAuth();
      } finally {
        console.log("Setting loading false");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  });

  return null;
}

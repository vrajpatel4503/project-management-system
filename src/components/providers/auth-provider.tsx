"use client";

import { useEffect } from "react";
import { auth } from "@/components/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Current User:", user);
    });

    return unsubscribe;
  }, []);

  return <>{children}</>;
}

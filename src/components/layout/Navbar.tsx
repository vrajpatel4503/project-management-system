"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase.config";
import { capitalize } from "@/utils/format";
import { Search } from "lucide-react";

import { Bell, Moon, Sun, LogOut, User, Settings } from "lucide-react";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import { useAuthStore } from "@/lib/store/auth.store";

export default function Navbar() {
  const clearAuth = useAuthStore.getState().clearAuth;
  const { user, role, loading } = useAuthStore();
  const [profileOpen, setProfileOpen] = useState(false);
  const unreadNotifications = 5;

  const isAdmin = role === "admin";

  if (loading) {
    return null; // or skeleton UI
  }

  // const [isDark, setIsDark] = useState(false);

  // // 🔥 LOAD THEME ON FIRST LOAD
  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme");

  //   if (savedTheme === "dark") {
  //     setIsDark(true);
  //     document.documentElement.classList.add("dark");
  //   } else {
  //     setIsDark(false);
  //     document.documentElement.classList.remove("dark");
  //   }
  // }, []);

  // // 🔥 TOGGLE THEME
  // const toggleTheme = () => {
  //   const newTheme = !isDark;
  //   setIsDark(newTheme);

  //   if (newTheme) {
  //     document.documentElement.classList.add("dark");
  //     localStorage.setItem("theme", "dark");
  //   } else {
  //     document.documentElement.classList.remove("dark");
  //     localStorage.setItem("theme", "light");
  //   }
  // };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      clearAuth();
    } catch (error: unknown) {
      console.error(error);

      if (error instanceof FirebaseError) {
        toast.error(`Logout failed: ${error.code}`);
      } else {
        toast.error("Something went wrong during logout");
      }
    }
  };

  const getInitials = (email?: string | null) => {
    if (!email) return "U";
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <header className="sticky top-0 z-50 h-16 border-b bg-background backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-4 gap-4">
        {/* SEARCH */}
        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
          <div className="relative">
            <Search
              size={16}
              strokeWidth={1.5}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            />

            <input
              type="text"
              placeholder="Search..."
              className="w-full rounded-md border bg-muted/50 py-1.5 pl-10 pr-3 outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-2">
          {/* ROLE */}
          {role && (
            <div className="flex px-3 py-1 rounded-3xl items-center justify-center bg-primary text-primary-foreground text-sm font-semibold">
              {capitalize(role)}
            </div>
          )}
          {/* THEME BUTTON */}
          <button
            // onClick={toggleTheme}
            className="rounded-lg p-2 hover:bg-accent"
          >
            <Sun size={18} />
          </button>
          {/* NOTIFICATIONS */}
          <Link
            href="/notifications"
            className="relative rounded-lg p-2 hover:bg-accent"
          >
            <Bell size={18} />

            {unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                {unreadNotifications}
              </span>
            )}
          </Link>
          {/* PROFILE */}
          <div className="relative ">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-2 py-1 bg-accent rounded-3xl"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                {getInitials(user?.email)}
              </div>

              <span className="hidden md:block text-sm">
                {capitalize(role)}
              </span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 p-2 rounded-xl border bg-card shadow-lg">
                <div className="border-b px-2 py-2">
                  <p className="font-medium break-all">
                    {user?.email || "Not logged in"}
                  </p>
                </div>

                <div className="py-1">
                  <Link
                    href="/profile"
                    className="flex items-center gap-2 px-2 py-2 hover:bg-accent rounded-xl mb-1"
                  >
                    <User size={16} />
                    Profile
                  </Link>

                  <Link
                    href="/settings"
                    className="flex items-center gap-2 px-2 py-2 hover:bg-accent rounded-xl mb-1"
                  >
                    <Settings size={16} />
                    Settings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-2 py-2 text-left rounded-xl cursor-pointer bg-red-300 text-white hover:bg-destructive"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

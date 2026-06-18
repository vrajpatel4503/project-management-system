"use client";

import { useState } from "react";
import Link from "next/link";
import { signOut } from "firebase/auth";
import { auth } from "@/components/lib/firebase";
import { capitalize } from "@/components/lib/format";

import { Bell, Moon, Sun, LogOut, User, Settings } from "lucide-react";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, role } = useAuth();

  const [isDark, setIsDark] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const unreadNotifications = 5;

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
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
    <header className="sticky top-0 z-50 h-16 border-b bg-card backdrop-blur-sm">
      <div className="flex h-full items-center justify-between px-6">
        {/* Search */}
        <div className="hidden md:block w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-lg border px-3 py-2 bg-background outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* ROLE BADGE */}
          {role && (
            <div className="flex px-3 py-1 rounded-3xl items-center justify-center bg-primary text-primary-foreground text-sm font-semibold">
              {capitalize(role)}
            </div>
          )}

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="rounded-lg p-2 hover:bg-accent"
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Notifications */}
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
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 rounded-lg px-2 py-1 hover:bg-accent"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
                {getInitials(user?.email)}
              </div>

              <span className="hidden md:block text-sm">
                {capitalize(role)}
              </span>
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-card shadow-lg">
                {/* USER INFO */}
                <div className="border-b p-3">
                  <p className="font-medium">
                    {user?.email || "Not logged in"}
                  </p>
                </div>

                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-3 hover:bg-accent"
                >
                  <User size={16} />
                  Profile
                </Link>

                <Link
                  href="/settings"
                  className="flex items-center gap-2 px-4 py-3 hover:bg-accent"
                >
                  <Settings size={16} />
                  Settings
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-4 py-3 text-left bg-red-300 text-black hover:bg-red-500"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

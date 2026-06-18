"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; //usePathname is a hook from Next.js that lets you get the current URL path in the App Router.
import { SIDEBAR_LINK } from "@/data/sidebar-link";

import logo from "../../../public/Logo.png";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-col border-r border-sidebar-border bg-sidebar">
      {/* Logo */}
      <div className="h-16 px-5 flex items-center gap-3 border-b">
        <div className="flex flex-col items-center">
          <Link href="/dashboard">
            <Image
              src={logo}
              alt="SevenSquare Logo"
              className="h-8 w-auto"
              priority
            />
          </Link>

          <p className="text-xs text-muted-foreground mt-1">
            Project Management System
          </p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-3 scrollbar-thin">
        <ul className="space-y-1">
          {SIDEBAR_LINK.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all
                  ${
                    active
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent/50"
                  }`}
                >
                  <Icon size={18} className={active ? "text-primary" : ""} />

                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Upgrade Card */}
      <div className="m-3 rounded-xl border p-4 bg-accent">
        <h3 className="text-xs font-semibold">Upgrade Plan</h3>

        <p className="mt-1 text-xs text-muted-foreground">
          Unlock unlimited projects and advanced reports.
        </p>

        <button className="mt-3 w-full rounded-md bg-primary text-primary-foreground px-3 py-2 text-xs font-medium">
          Upgrade
        </button>
      </div>
    </aside>
  );
}

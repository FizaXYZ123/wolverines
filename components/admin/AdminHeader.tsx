"use client";

import { Menu, Bell, LogOut, ShieldCheck, User } from "lucide-react";
import { clearAdminSession, getAdminUser } from "@/app/lib/admin-api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onOpenMobileMenu: () => void;
}

export default function AdminHeader({
  title,
  subtitle,
  onOpenMobileMenu,
}: AdminHeaderProps) {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string; role?: string } | null>(null);

  useEffect(() => {
    setUser(getAdminUser());
  }, []);

  const handleLogout = () => {
    clearAdminSession();
    router.push("/admin/login");
  };

  return (
    <header className="sticky top-0 z-20 flex h-18 items-center justify-between border-b border-white/10 bg-[#0b0b0b]/80 backdrop-blur-xl px-4 sm:px-8">
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 -ml-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/5 lg:hidden transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div>
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2.5">
            {title}
          </h1>
          {subtitle && (
            <p className="hidden sm:block text-xs text-neutral-400 font-normal mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Role Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-[11px] font-semibold text-red-400 uppercase tracking-wider">
          <ShieldCheck className="h-3.5 w-3.5" />
          <span>{user?.role || "ADMIN"}</span>
        </div>

        {/* User profile dropdown/button */}
        <div className="flex items-center gap-2 pl-2 border-l border-white/10">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-[#D32F2F] to-[#7f1d1d] flex items-center justify-center font-bold text-sm text-white shadow-md shadow-red-950/30">
            {user?.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
          </div>
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-2 rounded-xl text-neutral-400 hover:text-[#D32F2F] hover:bg-red-950/20 transition-colors"
          >
            <LogOut className="h-4.5 w-4.5" />
          </button>
        </div>
      </div>
    </header>
  );
}

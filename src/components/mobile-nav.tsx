"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, PenTool, History, Settings } from "lucide-react";
import { UserButton, SignedIn } from "@clerk/nextjs";

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/generate", label: "Generate", icon: PenTool },
  { href: "/dashboard/history", label: "History", icon: History },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="md:hidden">
      <header className="bg-[#1a103c] px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          ContentAI
        </Link>
        <button onClick={() => setOpen(true)} className="text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {open && (
        <>
          <div className="fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />
          <div className="fixed inset-y-0 left-0 w-64 bg-[#1a103c] z-50 flex flex-col">
            <div className="p-6 flex items-center justify-between">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                ContentAI
              </span>
              <button onClick={() => setOpen(false)} className="text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex-1 px-4 space-y-2">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center space-x-3 px-4 py-3 min-h-[44px] rounded-lg transition ${
                    (href === "/dashboard" ? pathname === href : pathname.startsWith(href))
                      ? "bg-white/15 text-white border-l-2 border-purple-400"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center space-x-3 px-4 py-3">
                <SignedIn>
                  <UserButton
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-8 h-8",
                        userButtonBox: "flex-row-reverse",
                        userButtonOuterIdentifier: "text-white font-medium text-sm ml-2",
                      },
                    }}
                    showName
                  />
                </SignedIn>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

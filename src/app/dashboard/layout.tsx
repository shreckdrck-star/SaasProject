import Link from "next/link";
import {
  LayoutDashboard,
  PenTool,
  History,
  Settings,
} from "lucide-react";
import { UserButton, SignedIn } from "@clerk/nextjs";
import MobileNav from "@/components/mobile-nav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a103c] text-white hidden md:flex flex-col">
        <div className="p-6">
          <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            ContentAI
          </Link>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <Link 
            href="/dashboard" 
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition text-gray-300 hover:text-white"
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </Link>
          <Link 
            href="/dashboard/generate" 
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition text-gray-300 hover:text-white"
          >
            <PenTool className="w-5 h-5" />
            <span>Generate</span>
          </Link>
          <Link 
            href="/dashboard/history" 
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition text-gray-300 hover:text-white"
          >
            <History className="w-5 h-5" />
            <span>History</span>
          </Link>
          <Link 
            href="/dashboard/settings" 
            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-white/10 transition text-gray-300 hover:text-white"
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <div className="flex items-center space-x-3 px-4 py-3 mb-2">
            <SignedIn>
              <UserButton 
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-8 h-8",
                    userButtonBox: "flex-row-reverse",
                    userButtonOuterIdentifier: "text-white font-medium text-sm ml-2",
                  }
                }}
                showName
              />
            </SignedIn>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <MobileNav />
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

import Link from "next/link";
import { UserButton, SignedIn } from "@clerk/nextjs";
import MobileNav from "@/components/mobile-nav";
import SidebarNav from "@/components/sidebar-nav";

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
        
        <SidebarNav />

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
      <main className="flex-1 overflow-y-auto overflow-x-hidden min-w-0">
        <MobileNav />
        <div className="p-4 sm:p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

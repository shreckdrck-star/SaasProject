import Link from "next/link";
import { ArrowRight, Check, Zap, Globe, MessageSquare } from "lucide-react";
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { DAILY_GENERATION_LIMIT } from "@/lib/constants";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a103c] via-[#2d1b69] to-[#0f0728] text-white">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          ContentAI
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="#features" className="hover:text-purple-300 transition">Features</a>
          <a href="#pricing" className="hover:text-purple-300 transition">Pricing</a>
        </div>
        <div className="flex space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-4 py-2 hover:text-purple-300 transition">
                Login
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition">
                Get Started
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard" className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition">
              Go to Dashboard
            </Link>
          </SignedIn>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
          Generate Perfect Content for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            Your Business in Seconds
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Stop staring at a blank screen. Use AI to create engaging Instagram posts, 
          website copy, and ad campaigns instantly.
        </p>
        <Link 
          href="/dashboard/generate" 
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-lg font-semibold hover:opacity-90 transition transform hover:scale-105"
        >
          Start Generating Free
          <ArrowRight className="ml-2 w-5 h-5" />
        </Link>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Everything You Need to Scale
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              id: "instagram",
              icon: <MessageSquare className="w-8 h-8 text-purple-400" />,
              title: "Instagram Posts",
              description: "Generate viral captions and hashtags tailored to your brand voice."
            },
            {
              id: "website",
              icon: <Globe className="w-8 h-8 text-pink-400" />,
              title: "Website Copy",
              description: "Create landing page copy that converts visitors into customers."
            },
            {
              id: "ads",
              icon: <Zap className="w-8 h-8 text-blue-400" />,
              title: "Ad Campaigns",
              description: "Write high-converting Facebook and Google ad copy in seconds."
            }
          ].map((feature) => (
            <div key={feature.id} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition backdrop-blur-sm">
              <div className="mb-4 p-3 bg-white/5 rounded-lg inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-6 py-20">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Simple Pricing for Everyone
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Plan */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-semibold mb-2">Free</h3>
            <div className="text-3xl font-bold mb-6">$0<span className="text-lg text-gray-400 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 text-gray-300">
              <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-3" /> {DAILY_GENERATION_LIMIT} generations/day</li>
              <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-3" /> Basic templates</li>
              <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-3" /> Standard support</li>
            </ul>
            <Link href="/dashboard" className="block w-full py-3 rounded-lg border border-white/20 text-center hover:bg-white/5 transition">
              Get Started
            </Link>
          </div>

          {/* Pro Plan */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-purple-900/50 to-purple-900/20 border border-purple-500 relative transform md:-translate-y-4">
            <div className="absolute top-0 right-0 bg-purple-500 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">POPULAR</div>
            <h3 className="text-xl font-semibold mb-2">Pro</h3>
            <div className="text-3xl font-bold mb-6">$19<span className="text-lg text-gray-400 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 text-gray-300">
              <li className="flex items-center"><Check className="w-5 h-5 text-purple-400 mr-3" /> Unlimited generations</li>
              <li className="flex items-center"><Check className="w-5 h-5 text-purple-400 mr-3" /> Advanced templates</li>
              <li className="flex items-center"><Check className="w-5 h-5 text-purple-400 mr-3" /> Priority support</li>
            </ul>
            <Link href="/dashboard" className="block w-full py-3 rounded-lg bg-purple-600 text-center hover:bg-purple-700 transition">
              Upgrade to Pro
            </Link>
          </div>

          {/* Business Plan */}
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10">
            <h3 className="text-xl font-semibold mb-2">Business</h3>
            <div className="text-3xl font-bold mb-6">$49<span className="text-lg text-gray-400 font-normal">/mo</span></div>
            <ul className="space-y-4 mb-8 text-gray-300">
              <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-3" /> Everything in Pro</li>
              <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-3" /> Team collaboration</li>
              <li className="flex items-center"><Check className="w-5 h-5 text-green-400 mr-3" /> API access</li>
            </ul>
            <Link href="/dashboard" className="block w-full py-3 rounded-lg border border-white/20 text-center hover:bg-white/5 transition">
              Contact Sales
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-10 border-t border-white/10 text-center text-gray-400">
        <p>&copy; 2025 ContentAI. All rights reserved.</p>
      </footer>
    </div>
  );
}

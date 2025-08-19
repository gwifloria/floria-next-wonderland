"use client";
import Link from "next/link";
import { routes } from "./router";

const PageHeader = () => {
  const routesKeys = Object.keys(routes);
  return (
    <nav
      className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur border-b border-mint-100/40 shadow-sm px-4 py-2 flex items-center justify-between rounded-b-2xl animate-navbarDrop"
      role="navigation"
      style={{ minHeight: "56px" }}
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl font-extrabold text-mint-500 tracking-tight mr-6 select-none drop-shadow-sm">
          <Link
            href="/"
            className="hover:text-rose-400 transition-colors duration-200"
          >
            🍸 Wonderland
          </Link>
        </span>
        <div className="navigation-bar flex gap-2 sm:gap-4 md:gap-8">
          {routesKeys.map((route) => (
            <Link
              href={route}
              key={route}
              className="px-3 py-1 rounded-full text-mint-800 text-sm md:text-lg font-mono font-semibold hover:bg-mint-100 hover:text-rose-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-mint-200"
            >
              {routes[route as keyof typeof routes] || "🌟"}
              {route.charAt(0).toUpperCase() + route.slice(1)}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2"></div>
      <style>{`
        @keyframes navbarDrop {
          0% { opacity: 0; transform: translateY(-24px) scale(0.98); }
          100% { opacity: 1; transform: none; }
        }
        .animate-navbarDrop { animation: navbarDrop 0.7s cubic-bezier(.4,1.6,.6,1); }
      `}</style>
    </nav>
  );
};
export default PageHeader;

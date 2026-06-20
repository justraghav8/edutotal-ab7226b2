import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark((d) => !d)}
      aria-label="Toggle theme"
      className={`
        relative h-8 w-16 rounded-full border-2 border-[#62AD4E] transition-colors duration-300 ease-in-out
        ${dark ? "bg-[#1a2e16]" : "bg-[#e8f5e4]"}
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#62AD4E] focus-visible:ring-offset-2
      `}
    >
      <span
        className={`
          absolute top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#62AD4E]
          shadow-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${dark ? "left-[calc(100%-1.75rem)]" : "left-0.5"}
        `}
      >
        {dark ? (
          <Moon className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
        ) : (
          <Sun className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
        )}
      </span>
    </button>
  );
}

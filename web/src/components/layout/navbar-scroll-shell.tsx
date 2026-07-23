"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import { cn } from "@/lib/utils";

type NavbarScrollContextValue = {
  scrolled: boolean;
};

const NavbarScrollContext = createContext<NavbarScrollContextValue>({
  scrolled: false,
});

export function useNavbarScroll() {
  return useContext(NavbarScrollContext);
}

type NavbarScrollShellProps = {
  children: ReactNode;
};

export function NavbarScrollShell({ children }: NavbarScrollShellProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavbarScrollContext.Provider value={{ scrolled }}>
      <header
        className={cn(
          "fixed top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ease-out",
          scrolled
            ? "border-b border-border/80 bg-background/95 shadow-sm backdrop-blur-sm"
            : "border-b border-transparent bg-foreground/55 backdrop-blur-sm",
        )}
      >
        {children}
      </header>
    </NavbarScrollContext.Provider>
  );
}

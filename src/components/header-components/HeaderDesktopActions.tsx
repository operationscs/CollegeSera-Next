import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeaderThemeToggle } from "./HeaderThemeToggle";

export function HeaderDesktopActions() {
  return (
    <div className="hidden shrink-0 items-center gap-2 xl:flex">
      <HeaderThemeToggle />
      <Button
        asChild
        size="sm"
        className="h-9 shrink-0 gap-2 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:from-orange-600 hover:to-red-600 hover:shadow-md"
      >
        <a
          href="https://chat.collegesera.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle className="h-4 w-4" />
          Ask Sera
        </a>
      </Button>
    </div>
  );
}

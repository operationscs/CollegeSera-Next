import { HeaderThemeToggle } from "./HeaderThemeToggle";

interface MobileHeaderActionsProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function MobileHeaderActions({
  isOpen,
  onToggle,
}: MobileHeaderActionsProps) {
  return (
    <div className="right-side-container ml-auto flex shrink-0 items-center gap-2 xl:hidden">
      <HeaderThemeToggle />
      <button
        type="button"
        onClick={onToggle}
        className="p-2 text-slate-700 dark:text-slate-200"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 7h16M4 12h16M4 17h10"}
          />
        </svg>
      </button>
    </div>
  );
}

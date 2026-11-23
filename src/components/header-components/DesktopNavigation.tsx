import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { menuContent } from "./menu-content";
import type { HeaderNavItem } from "@/types/navigation";

interface DesktopNavigationProps {
  items: HeaderNavItem[];
  openMenu: string;
  onOpenMenuChange: (value: string) => void;
  pathname: string | null;
  onNavigate: (path: string) => void;
  onMenuContentClick: () => void;
}

export function DesktopNavigation({
  items,
  openMenu,
  onOpenMenuChange,
  pathname,
  onNavigate,
  onMenuContentClick,
}: DesktopNavigationProps) {
  return (
    <nav
      className="relative z-[60] hidden min-w-0 flex-1 items-center justify-center xl:flex"
      aria-label="Main navigation"
    >
      <NavigationMenu
        value={openMenu}
        onValueChange={onOpenMenuChange}
        className="min-w-0 flex-1 justify-center"
      >
        <NavigationMenuList>
          {items.map((item) => {
            const isActive = Boolean(pathname?.startsWith(item.path));
            return (
              <NavigationMenuItem key={item.key} value={item.key}>
                <NavigationMenuTrigger
                  asChild
                  className={`group h-9 gap-1 rounded-full px-2 text-[15px] font-semibold transition-colors duration-200 xl:px-2.5 ${
                    isActive
                      ? "bg-orange-50 text-orange-700 dark:bg-orange-950/60 dark:text-orange-300"
                      : "text-slate-700 hover:bg-slate-50 hover:text-orange-700 data-[state=open]:bg-orange-50 data-[state=open]:text-orange-700 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-orange-300 dark:data-[state=open]:bg-orange-950/60 dark:data-[state=open]:text-orange-300"
                  }`}
                >
                  <Link
                    href={item.path}
                    onClick={(event) => {
                      if (
                        event.button !== 0 ||
                        event.metaKey ||
                        event.ctrlKey ||
                        event.shiftKey ||
                        event.altKey
                      ) {
                        return;
                      }

                      event.preventDefault();
                      onNavigate(item.path);
                    }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {item.label}
                    <ChevronDown className="h-3 w-3 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent className="max-h-[calc(100vh-7rem)] w-[min(920px,calc(100vw-2rem))] overflow-y-auto p-3 sm:p-4">
                  <div onClick={onMenuContentClick}>
                    {menuContent[item.key]}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

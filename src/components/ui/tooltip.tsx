"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/utils";

interface TooltipProviderProps {
  children: React.ReactNode;
  delayDuration?: number;
}

const TooltipDelayContext = React.createContext<number>(150);

const TooltipProvider: React.FC<TooltipProviderProps> = ({
  children,
  delayDuration = 150,
}) => {
  return (
    <TooltipDelayContext.Provider value={delayDuration}>
      {children}
    </TooltipDelayContext.Provider>
  );
};

interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  tooltipId: string;
  delayDuration: number;
}

const TooltipContext = React.createContext<TooltipContextValue | null>(null);

function useTooltipContext() {
  const ctx = React.useContext(TooltipContext);
  if (!ctx) {
    throw new Error("Tooltip components must be used within a <Tooltip>");
  }
  return ctx;
}

interface TooltipProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  delayDuration?: number;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  delayDuration,
}) => {
  const providerDelay = React.useContext(TooltipDelayContext);
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const tooltipId = React.useId();

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(next);
      }
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange]
  );

  return (
    <TooltipContext.Provider
      value={{
        open,
        setOpen,
        tooltipId,
        delayDuration: delayDuration ?? providerDelay,
      }}
    >
      <div className="relative inline-flex w-full sm:w-auto">{children}</div>
    </TooltipContext.Provider>
  );
};

interface TooltipTriggerProps extends React.HTMLAttributes<HTMLElement> {
  asChild?: boolean;
}

const TooltipTrigger = React.forwardRef<HTMLElement, TooltipTriggerProps>(
  ({ asChild = false, onMouseEnter, onMouseLeave, onFocus, onBlur, ...props }, ref) => {
    const { open, setOpen, tooltipId, delayDuration } = useTooltipContext();
    const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };

    React.useEffect(() => clearTimer, []);

    const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
      clearTimer();
      timerRef.current = setTimeout(() => setOpen(true), delayDuration);
      onMouseEnter?.(e);
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
      clearTimer();
      setOpen(false);
      onMouseLeave?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLElement>) => {
      clearTimer();
      setOpen(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLElement>) => {
      clearTimer();
      setOpen(false);
      onBlur?.(e);
    };

    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref as React.Ref<HTMLButtonElement>}
        aria-describedby={open ? tooltipId : undefined}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);
TooltipTrigger.displayName = "TooltipTrigger";

interface TooltipContentProps extends React.HTMLAttributes<HTMLDivElement> {
  side?: "top" | "right" | "bottom" | "left";
  sideOffset?: number;
}

const TooltipContent = React.forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ className, side = "top", children, ...props }, ref) => {
    const { open, tooltipId } = useTooltipContext();

    if (!open) return null;

    const positionClasses: Record<NonNullable<TooltipContentProps["side"]>, string> = {
      top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
      bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
      right: "left-full top-1/2 -translate-y-1/2 ml-2.5",
      left: "right-full top-1/2 -translate-y-1/2 mr-2.5",
    };

    return (
      <div
        ref={ref}
        id={tooltipId}
        role="tooltip"
        className={cn(
          "pointer-events-none absolute z-50 whitespace-nowrap rounded-lg border border-slate-200 bg-slate-900 px-3 py-1.5 font-jakarta text-xs font-medium text-white shadow-md animate-in fade-in-0 zoom-in-95 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100",
          positionClasses[side],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
TooltipContent.displayName = "TooltipContent";

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };

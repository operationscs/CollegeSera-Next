import { MessageCircle, PhoneCall } from "lucide-react";

export function HeaderUtilityBar() {
  return (
    <div className="hidden border-b border-indigo-100 bg-indigo-50/80 dark:border-slate-800 dark:bg-slate-900 xl:block">
      <div className="container mx-auto flex h-8 max-w-screen-2xl items-center justify-between px-4 text-[11px] font-medium text-slate-700 dark:text-slate-300">
        <div className="flex items-center gap-4">
          <a
            href="tel:+916374715327"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-orange-700 dark:hover:text-orange-400"
          >
            <PhoneCall className="h-3 w-3 text-orange-600" />
            Helpline: +91 63747 15327
          </a>
          <a
            href="https://wa.me/916374715327"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-green-700 dark:hover:text-green-400"
          >
            <MessageCircle className="h-3 w-3 text-green-600" />
            WhatsApp Support
          </a>
          <span className="rounded-full bg-orange-100 px-2.5 py-0.5 font-semibold text-orange-800 dark:bg-orange-950 dark:text-orange-300">
            Admissions Open
          </span>
        </div>
      </div>
    </div>
  );
}

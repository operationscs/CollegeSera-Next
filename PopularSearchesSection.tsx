import Link from "next/link";
import { POPULAR_SEARCH_LINKS } from "@/features/colleges/data/listingConstants";

export function PopularSearchesSection() {
    return (
        <section className="mt-12 p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
                Popular Searches &amp; Top Colleges
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                {POPULAR_SEARCH_LINKS.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-slate-600 hover:text-orange-600 hover:underline transition-colors flex items-center gap-1.5"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                        {link.label}
                    </Link>
                ))}
            </div>
        </section>
    );
}

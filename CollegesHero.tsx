import Link from "next/link";

export interface CollegesHeroProps {
    categoryPath: string;
    categoryName: string;
    displayHeroTitle: string;
    searchQuery: string;
    institutionType?: string;
}

export function CollegesHero({
    categoryPath,
    categoryName,
    displayHeroTitle,
    searchQuery,
    institutionType,
}: CollegesHeroProps) {
    return (
        <div className="pt-32 pb-16 bg-slate-900 relative overflow-hidden">
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-orange-500/20 blur-[100px] opacity-60 mix-blend-screen" />
                <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/20 blur-[100px] opacity-60 mix-blend-screen" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 mix-blend-overlay"></div>
            </div>

            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="max-w-3xl">
                        <div className="text-sm text-slate-400 mb-3 flex items-center gap-2 flex-wrap">
                            <Link href="/" className="hover:text-orange-400 transition-colors">
                                Home
                            </Link>
                            <span className="text-slate-600">/</span>
                            <Link href={categoryPath} className="hover:text-orange-400 transition-colors">
                                {categoryName}
                            </Link>
                            <span className="text-slate-600">/</span>
                            <span className="font-medium text-slate-300">
                                {displayHeroTitle || "Colleges"}
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                            {displayHeroTitle ? (
                                displayHeroTitle
                            ) : searchQuery ? (
                                <span className="capitalize">{searchQuery}</span>
                            ) : (
                                <>
                                    Explore{" "}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                                        Top Colleges
                                    </span>
                                </>
                            )}
                        </h1>
                        <p className="text-base md:text-lg text-slate-300">
                            Discover top-rated {institutionType ? `${institutionType} ` : ""}institutions,
                            compare fees and placements, and find the perfect match for your future.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

import Image from "next/image";
import Link from "next/link";

interface HeaderBrandProps {
  onNavigate: () => void;
}

export function HeaderBrand({ onNavigate }: HeaderBrandProps) {
  return (
    <div className="college-logo-name-container left-side-container shrink-0">
      <Link
        href="/"
        className="flex shrink-0 items-center gap-2"
        onClick={onNavigate}
        aria-label="CollegeSera home"
      >
        <Image
          src="/College%20Sera%20Logomark%20Colour.png"
          alt=""
          width={1500}
          height={1500}
          priority
          className="h-10 w-10 rounded-lg bg-white object-contain p-0.5 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700"
        />
        <span className="whitespace-nowrap text-lg font-bold tracking-tight text-[#065893] dark:text-white">
          College<span className="text-[#ff861c]">Sera</span>
        </span>
      </Link>
    </div>
  );
}

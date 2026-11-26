import React from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import type { FooterContactColumnContent, FooterContactType } from "@/types/layout";
import { FooterSectionHeading } from "./FooterSectionHeading";

const ContactIcon: React.FC<{ type: FooterContactType; isLink?: boolean }> = ({
  type,
  isLink = false,
}) => {
  const baseClass = `shrink-0 text-[#ff861c] ${
    isLink ? "transition-colors group-hover:text-[#ff861c]" : "mt-0.5"
  }`;

  if (type === "phone") {
    return <Phone className={baseClass} size={15} />;
  }

  if (type === "email") {
    return <Mail className={baseClass} size={15} />;
  }

  return <MapPin className={baseClass} size={15} />;
};

export interface FooterContactColumnProps {
  content: FooterContactColumnContent;
}

export const FooterContactColumn: React.FC<FooterContactColumnProps> = ({
  content,
}) => {
  return (
    <div className="font-jakarta">
      <FooterSectionHeading title={content.title} />
      <ul className="space-y-3 font-jakarta !text-xs">
        {content.items.map((item) => (
          <li key={item.id}>
            {item.href ? (
              <a
                href={item.href}
                className="group flex items-center gap-2.5 font-jakarta !text-xs font-medium leading-snug text-[#64748B] transition-colors duration-200 hover:text-[#ff861c] dark:text-slate-400 dark:hover:text-[#ff861c]"
              >
                <ContactIcon type={item.type} isLink />
                <span className="font-jakarta !text-xs leading-snug">
                  {item.label}
                </span>
              </a>
            ) : (
              <div className="flex items-start gap-2.5">
                <ContactIcon type={item.type} />
                <span className="font-jakarta !text-xs font-medium leading-snug text-[#64748B] dark:text-slate-400">
                  {item.label}
                </span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterContactColumn;

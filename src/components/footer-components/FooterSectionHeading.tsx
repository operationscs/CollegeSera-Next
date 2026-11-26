import React from "react";

export interface FooterSectionHeadingProps {
  title: string;
}

export const FooterSectionHeading: React.FC<FooterSectionHeadingProps> = ({
  title,
}) => {
  return (
    <h4 className="mb-4 flex items-center gap-2 whitespace-nowrap font-jakarta !text-sm font-bold text-[#0F1F3D] dark:text-white">
      {title}
      <span className="inline-block h-0.5 w-6 shrink-0 rounded-full bg-[#ff861c]" />
    </h4>
  );
};

export default FooterSectionHeading;

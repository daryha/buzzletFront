import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
  className?: string;
  href?: string;
  onClick?: () => void;
  icon: React.ReactNode;
  label: string;
  classLabel?: string;
}

export const MenuItem: React.FC<Props> = ({
  className,
  icon,
  href,
  label,
  classLabel,
  onClick,
}) => {
  if (!href) {
    href = "/";
  }

  return (
    <Link href={href}>
      <div
        onClick={onClick}
        className={cn(
          className,
          "p-2 rounded-lg hover:bg-gray/30 cursor-pointer flex items-center gap-2"
        )}
      >
        {icon}
        <span className={classLabel}>{label}</span>
      </div>
    </Link>
  );
};

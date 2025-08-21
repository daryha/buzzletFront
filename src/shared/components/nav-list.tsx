"use client";

import React from "react";
import { MenuItem } from "../ui/menu-item";
import { Clock, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
}

export const NavList: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn(className, "w-[220px]")}>
      <div className="flex flex-col gap-2">
        <MenuItem icon={<Flame size={22} strokeWidth={1.5} />} label="Популярное" />
        <MenuItem
          icon={<Clock size={22} strokeWidth={1.5} />}
          label="Свежее
"
        />
      </div>
    </div>
  );
};

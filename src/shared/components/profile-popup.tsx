import { cn } from "@/lib/utils";
import React from "react";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

interface Props {
  className?: string;
  onClose: () => void;
}

export const ProfilePopup: React.FC<Props> = ({ className, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogOut = () => {
    dispatch(logout());
    onClose();
  };
  return (
    <div
      className={cn(className, "bg-primary w-[200px] p-[16px] rounded-2xl flex flex-col gap-2 ")}
    >
      <div className="p-2 rounded-lg hover:bg-gray/30 cursor-pointer flex items-center gap-2">
        <User size={22} strokeWidth={1.5} />
        <span>Профиль</span>
      </div>
      <Link href={"/settings"}>
        <div className="p-2 rounded-lg hover:bg-gray/30 cursor-pointer flex items-center gap-2">
          <Settings size={22} strokeWidth={1.5} />
          <span>Настройки</span>
        </div>
      </Link>
      <div
        className="p-2 rounded-lg hover:bg-gray/30 cursor-pointer flex items-center gap-2 "
        onClick={handleLogOut}
      >
        <LogOut size={22} strokeWidth={1.5} className="text-red-400" />
        <span className="text-red-400">Выйти</span>
      </div>
    </div>
  );
};

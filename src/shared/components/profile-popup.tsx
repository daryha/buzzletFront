import { cn } from "@/lib/utils";
import React from "react";
import { LogOut, Settings, User } from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { MenuItem } from "../ui/menu-item";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/hooks/useRedux";
import { resetAllLikes, revertOptimisticLike } from "@/redux/slices/postSlice";

interface Props {
  className?: string;
}

export const ProfilePopup: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleLogOut = () => {
    dispatch(logout());
    dispatch(resetAllLikes());
  };

  return (
    <div className={cn(className, "bg-primary w-[200px] p-[16px] rounded-2xl flex flex-col gap-2")}>
      <MenuItem
        icon={<User size={22} strokeWidth={1.5} />}
        label="Профиль"
        onClick={() => console.log("Открыть профиль")}
      />

      <MenuItem
        icon={<Settings size={22} strokeWidth={1.5} />}
        label="Настройки"
        href="/settings"
      />

      <MenuItem
        icon={<LogOut size={22} strokeWidth={1.5} className="text-red-400" />}
        label="Выйти"
        onClick={handleLogOut}
        classLabel="text-red-400"
      />
    </div>
  );
};

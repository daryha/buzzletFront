"use client";

import React, { useState } from "react";
import { Container } from "./container";
import { Button } from "../ui/Button";
import { ChevronDown, Pen } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchAuthMe } from "@/redux/slices/authSlice";
import { ProfilePopup } from "./profile-popup";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  React.useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(fetchAuthMe());
    }
  }, [dispatch]);

  React.useEffect(() => {
    setIsProfilePopupOpen(false);
  }, [user?.id]);

  return (
    <header className="h-15 bg-[#26282B] mb-4 ">
      <Container>
        <div className="flex justify-between  items-center">
          <Link href={"/"}>
            <div className="h-[60px] flex items-center pl-2.5">
              <h1 className="text-3xl font-bold">Buzzlet</h1>
            </div>
          </Link>

          <div className="flex gap-3 h-[60px] items-center">
            <div>
              <Button variant="primary" size="small" className="flex gap-2 items-center shadow-sm">
                <Pen size={20} />
                Написать
              </Button>
            </div>
            {user ? (
              <Popover open={isProfilePopupOpen} onOpenChange={setIsProfilePopupOpen}>
                <PopoverTrigger asChild>
                  <button
                    className="flex items-center gap-2 cursor-pointer group focus:outline-none"
                    aria-label="Открыть меню профиля"
                  >
                    <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 group-hover:opacity-50 transition">
                      <img
                        src={user.avatar}
                        alt={`Аватар ${user.name || "пользователя"}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <ChevronDown className="text-white" size={20} />
                  </button>
                </PopoverTrigger>

                <PopoverContent
                  side="bottom"
                  align="end"
                  sideOffset={25}
                  className="p-0 focus:outline-none focus:ring-0 border-0 w-[200px]"
                >
                  <ProfilePopup />
                </PopoverContent>
              </Popover>
            ) : (
              <Link href={"/auth"}>
                <Button variant="secondary" size="small" className="rounded-3xl">
                  Войти
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

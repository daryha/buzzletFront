"use client";

import React from "react";
import { Container } from "./container";
import { Button } from "../ui/Button";
import { ChevronDown, Pen } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchAuthMe } from "@/redux/slices/authSlice";
import { ProfilePopup } from "./profile-popup";

export const Header: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const [popup, setPopup] = React.useState<boolean>(false);
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const popupRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      dispatch(fetchAuthMe());
    }
  }, [dispatch]);

  const togglePopup = () => setPopup((prev) => !prev);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!triggerRef.current?.contains(target) && !popupRef.current?.contains(target)) {
        setPopup(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [popup]);

  return (
    <header className="h-20 p-4 bg-[#26282B] mb-14">
      <Container>
        <div className=" flex justify-between items-center">
          <Link href={"/"}>
            <h1 className="text-3xl font-bold">Buzzlet</h1>
          </Link>

          <div className="flex gap-3">
            <Button variant="primary" className="flex gap-2 items-center">
              <Pen />
              Написать
            </Button>

            {user ? (
              <div className="flex items-center gap-2 cursor-pointer  group " onClick={togglePopup}>
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 group-hover:opacity-50 transition">
                  <img src={user.avatar} alt="avatar" className="w-full h-full object-cover" />
                </div>
                <ChevronDown className="text-white" size={20} />
              </div>
            ) : (
              <Link href={"/auth"}>
                <Button variant="secondary" className="rounded-3xl">
                  Войти
                </Button>
              </Link>
            )}

            {popup && (
              <div ref={popupRef} className="top-22 absolute">
                <ProfilePopup onClose={() => setPopup(false)} />
              </div>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
};

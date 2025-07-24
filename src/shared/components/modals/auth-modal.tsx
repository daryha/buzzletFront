"use client";

import React from "react";

import { LoginForm } from "../forms/login-form";
import { useRouter } from "next/navigation";

interface Props {
  className?: string;
}

export const AuthModal: React.FC<Props> = ({ className }) => {
  const router = useRouter();

  return (
    <div className={className}>
      <div className="flex flex-col items-center p-20 gap-3 rounded-lg">
        <h2 className="text-white text-3xl font-bold mb-5">Вход в аккаунт</h2>
        <LoginForm
          onClose={() => {
            router.back();
          }}
        />
      </div>
    </div>
  );
};

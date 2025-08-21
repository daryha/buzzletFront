"use client";

import React, { useState } from "react";

import { LoginForm } from "../forms/login-form";
import { useRouter } from "next/navigation";
import { RegisterForm } from "../forms/register-form";
import { fa } from "zod/locales";

interface Props {
  className?: string;
}

export const AuthModal: React.FC<Props> = ({ className }) => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={className}>
      <div className="flex flex-col items-center p-20 gap-3 rounded-lg">
        <h2 className="text-white text-3xl font-bold mb-5">
          {isLogin ? "Вход в аккаунт" : "Регистрация"}
        </h2>
        <div className="w-full transition-all duration-300">
          {isLogin ? (
            <LoginForm onClose={() => router.back()} />
          ) : (
            <RegisterForm onClose={() => router.back()} />
          )}
        </div>  

        <div>
          {isLogin ? (
            <>
              Нет аккаунта?{" "}
              <button
                className="text-secondary cursor-pointer hover:underline"
                onClick={() => setIsLogin(false)}
              >
                Зарегистрироваться
              </button>
            </>
          ) : (
            <>
              Уже есть аккаунт?{" "}
              <button
                className="text-secondary cursor-pointer hover:underline"
                onClick={() => setIsLogin(true)}
              >
                Войти
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

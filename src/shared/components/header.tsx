"use client"

// Header.tsx
import React from "react";
import { Container } from "./container";
import { Button } from "../ui/Button";
import { Pen } from "lucide-react";

export const Header: React.FC = () => {
  return (
    <header className="h-20 p-4 bg-[#26282B] mb-14">
      <Container>
        <div className=" flex justify-between items-center">
          <h1 className="text-3xl font-bold">Buzzlet</h1>

          <div className="flex gap-5">
            <Button variant="primary" className="flex gap-2 items-center">
              <Pen />
              Написать
            </Button>
            <Button variant="secondary" className="rounded-3xl">
              Войти
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
};

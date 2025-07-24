"use client";

import { AuthModal } from "@/shared/components/modals/auth-modal";
import { useRouter } from "next/navigation";

export default function AuthModalRoute() {
  const router = useRouter();

  return <AuthModal />;
}

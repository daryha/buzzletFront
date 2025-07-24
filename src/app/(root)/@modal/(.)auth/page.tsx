"use client";

import { Modal } from "@/shared/components/modal";
import { AuthModal } from "@/shared/components/modals/auth-modal";
import { useRouter } from "next/navigation";

export default function AuthModalRoute() {
  const router = useRouter();

  return (
    <Modal isOpen={true} onClose={() => router.back()}>
      <AuthModal />
    </Modal>
  );
}

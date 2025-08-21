import { useRouter } from "next/navigation";

export const useAuthGuard = () => {
  const router = useRouter();

  const protectAction = (
    action: () => void | Promise<void>,
    options?: {
      redirectTo?: string;
      message?: string;
    }
  ) => {
    const { redirectTo = "/auth", message = "Необходимо войти в систему" } = options || {};

    if (!localStorage.getItem("accessToken")) {
      router.push(redirectTo);
      return;
    }

    return action();
  };

  return { protectAction };
};

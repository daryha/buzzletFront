import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "@/validation/authSchema";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { fetchAuthMe, fetchLogin } from "@/redux/slices/authSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { resetAllLikes } from "@/redux/slices/postSlice";
import { ErrorPayload } from "./register-form";

interface Props {
  className?: string;
  onClose: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ className, onClose }) => {
  const dispatch = useAppDispatch();
  const { status, user } = useAppSelector((s) => s.auth);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "daryha56@gmail.com", password: "553253c6S@!" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const loginResult = await dispatch(
        fetchLogin({ email: data.email, password: data.password })
      );

      if (fetchLogin.fulfilled.match(loginResult)) {
        dispatch(fetchAuthMe());
        resetAllLikes();
        onClose();
      } else if (fetchLogin.rejected.match(loginResult)) {
        const errorPayload = loginResult.payload as any;
        const errorMessage = errorPayload?.message;

        if (errorPayload?.statusCode === 404) {
          form.setError("email", { type: "server", message: errorMessage });
        }
      }
    } catch (err: unknown) {
      alert(`Не удалось войти ошибка - ${err} `);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        className={`${className} w-[300px] flex flex-col gap-4 mb-5`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input name="email" placeholder="Почта" className="px-4 py-6" />
        <Input name="password" placeholder="Пароль" type="password" className="px-4 py-6" />

        <Button type="submit" variant="secondary" disabled={isSubmitting} className="w-[300px]">
          {status === "loading" ? <p>Вход...</p> : <p>Войти</p>}
        </Button>
      </form>
    </FormProvider>
  );
};

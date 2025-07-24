import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormValues, loginSchema } from "@/validation/authSchema";
import { Input } from "@/shared/ui/Input";
import { Button } from "@/shared/ui/Button";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchAuthMe, fetchLogin } from "@/redux/slices/authSlice";

interface Props {
  className?: string;
  onClose: VoidFunction;
}

export const LoginForm: React.FC<Props> = ({ className, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, user } = useSelector((s: RootState) => s.auth);
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const onSubmit = async (data: LoginFormValues) => {
    try {
      await dispatch(fetchLogin({ email: data.email, password: data.password }));
      dispatch(fetchAuthMe());

      onClose();
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
        <Input name="password" placeholder="Пароль" className="px-4 py-6" />

        <Button type="submit" variant="secondary" disabled={isSubmitting} className="w-[300px]">
          {status === "loading" ? <p>Вход...</p> : <p>Войти</p>}
        </Button>
      </form>
    </FormProvider>
  );
};

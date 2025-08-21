import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { fetchAuthMe, fetchRegister } from "@/redux/slices/authSlice";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { RegisterFormValues, registerSchema } from "@/validation/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

interface Props {
  className?: string;
  onClose: () => void;
}

export type RegisterRequest = {
  email: string;
  name: string;
  password: string;
};

export type ErrorPayload = {
  error: string;
  message: string;
  statusCode: number;
};

export const RegisterForm: React.FC<Props> = ({ className, onClose }) => {
  const dispatch = useAppDispatch();
  const [serverError, setServerError] = React.useState<string | null>(null);

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "553253c6S@!",
      passwordConfirm: "553253c6S@!",
    },
  });

  const onSubmit = async (data: RegisterFormValues) => {
    try {
      const registerResult = await dispatch(fetchRegister(data));

      if (fetchRegister.fulfilled.match(registerResult)) {
        await dispatch(fetchAuthMe());
        onClose();
      } else if (fetchRegister.rejected.match(registerResult)) {
        const errorPayload = registerResult.payload as ErrorPayload;
        const errorMessage = errorPayload?.message || "Произошла ошибка при регистрации";

        if (errorPayload?.statusCode === 409) {
          form.setError("email", { type: "server", message: errorMessage });
        } else {
          setServerError(errorMessage);
        }
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      setServerError(error.message || "Произошла ошибка при регистрации");
    }
  };

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  return (
    <div className={className}>
      <FormProvider {...form}>
        <form
          className={`${className} w-[300px] flex flex-col gap-4 mb-5`}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input name="email" placeholder="Почта" type="email" className="px-4 py-6" />
          <Input name="name" placeholder="Имя" type="text" className="px-4 py-6"></Input>
          <Input name="password" placeholder="Пароль" type="password" className="px-4 py-6" />
          <Input
            name="passwordConfirm"
            placeholder="Повторите пароль"
            type="password"
            className="px-4 py-6"
          />

          <Button type="submit" variant="secondary" disabled={isSubmitting}>
            {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};

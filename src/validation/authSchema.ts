import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Некорректный email" }),
  password: z
    .string()
    .min(6, "Пароль не может быть меньше 6 символов")
    .regex(/[A-Z]/, "Пароль должен содержать хотя бы одну заглавную букву")
    .regex(
      /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]`~]/,
      "Пароль должен содержать хотя бы один специальный символ"
    )
    .nonempty("Пароль не может быть пустым"),
});

export const registerSchema = loginSchema
  .extend({
    name: z
      .string()
      .nonempty("Имя не может быть пустым")
      .min(2, "Слишком короткое имя пользователя")
      .max(12, "Слишком длинное имя пользователя"),
    passwordConfirm: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Пароли не совпадают",
    path: ["passwordConfirm"],
  });

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;

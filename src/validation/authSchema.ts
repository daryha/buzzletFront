import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Некорректный email" }),
  password: z
    .string()
    .min(6, "Пароль не может быть меньше 6 символов")
    .nonempty("Пароль не может быть пустым"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

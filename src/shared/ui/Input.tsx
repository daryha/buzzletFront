import * as React from "react";
import { cn } from "@/lib/utils";
import { useFormContext, FieldValues, Path } from "react-hook-form";

interface InputProps<T extends FieldValues> extends React.ComponentProps<"input"> {
  name: Path<T>;
}

function Input<T extends FieldValues>({ name, className, type, ...props }: InputProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name]?.message as string | undefined;

  return (
    <div className="flex flex-col gap-1">
      <input
        {...register(name)}
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground  bg-gray/10  placeholder:text-muted-foreground placeholder:text-lg selection:bg-secondary selection:text-primary dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-lg   px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-2 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring  focus-visible:ring-ring/50 ring-secondary focus-visible:ring-[3px]   ",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className
        )}
        {...props}
      />
      {error && <span className="text-red-500 text-xs font-medium mt-2 ">{error}</span>}
    </div>
  );
}

export { Input };

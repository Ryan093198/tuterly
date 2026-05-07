"use client";

import { useFormStatus } from "react-dom";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

export default function SubmitButton({
  children,
  pendingLabel,
  variant = "primary",
  size = "lg",
  className = "",
  ...rest
}) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      disabled={pending}
      className={className}
      {...rest}
    >
      {pending && <Spinner />}
      {pending ? pendingLabel || "Working…" : children}
    </Button>
  );
}

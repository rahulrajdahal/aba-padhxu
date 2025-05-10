"use client";

import { Button, Input } from "@/components";
import { routes } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { forgotPassword } from "../actions";

export default function Page() {
  const router = useRouter();

  const handleForgotPassword = async (
    prevState: unknown,
    formData: FormData
  ) => {
    const state = await forgotPassword(prevState, formData);

    if (state.type === "success") {
      toast.success(state.message);
      return router.push(routes.login);
    }

    if (state.type === "error") {
      toast.error(state.message);
    }

    return state;
  };

  const [state, formAction, pending] = useActionState(
    handleForgotPassword,
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-6 pb-8">
      <strong>Forgot Password?</strong>
      <p>Instructions to recover your account will be sent to your email.</p>
      <Input
        label="Email"
        error={state?.errors?.email}
        inputProps={{
          type: "email",
          name: "email",
          required: true,
          placeholder: "rajesh@hamal.com",
        }}
      />
      <Button type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? "Sending Email..." : "Send Email"}
      </Button>
    </form>
  );
}

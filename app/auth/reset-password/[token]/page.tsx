"use client";

import { Button, Input } from "@/components";
import { routes } from "@/utils/routes";
import { useParams, useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { resetPassword } from "../../actions";

export default function Page() {
  const { token } = useParams();

  const router = useRouter();

  const handleResetPassword = async (
    prevState: unknown,
    formData: FormData
  ) => {
    formData.append("token", token as string);

    const state = await resetPassword(prevState, formData);

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
    handleResetPassword,
    null
  );

  return (
    <form action={formAction} className="flex flex-col gap-6 ">
      <strong>Reset Password</strong>

      <Input
        label="Password"
        error={state?.errors?.password}
        inputProps={{ type: "password", name: "password", required: true }}
      />
      <Input
        label="Confirm Password"
        error={state?.errors?.confirmPassword}
        inputProps={{
          type: "password",
          name: "confirmPassword",
          required: true,
        }}
      />
      <Button type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? "Resetting Password..." : "Reset Password"}
      </Button>
    </form>
  );
}

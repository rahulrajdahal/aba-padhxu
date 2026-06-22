"use client";

import { Button } from "@/components";
import PasswordInput from "@/components/Input/Password/PasswordInput";
import { routes } from "@/utils/routes";
import { useParams, useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { resetPassword } from "../../actions";
import Headings from "../../components/Headings";

export default function Page() {
  const { token } = useParams();

  const router = useRouter();

  const handleResetPassword = async (
    prevState: unknown,
    formData: FormData,
  ) => {
    formData.append("token", token as string);

    const state = await resetPassword(prevState, formData);

    if (state.type === "success") {
      toast.success("Password reset successful! Login to continue.");
      return router.push(routes.login);
    }

    if (state.type === "error") {
      toast.error(state.message);
      return router.push(routes.forgotPassword);
    }

    return state;
  };

  const [state, formAction, pending] = useActionState(
    handleResetPassword,
    null,
  );

  return (
    <>
      <Headings
        heading="Reset Password"
        body="Enter your new password to reset your password"
      />
      <form action={formAction} className="flex flex-col gap-6">
        <PasswordInput
          name="password"
          label="Password"
          required
          errors={state?.errors?.password}
        />
        <PasswordInput
          name="confirmPassword"
          label="Confirm Password"
          required
          errors={state?.errors?.password}
        />
        <Button type="submit" disabled={pending} aria-disabled={pending}>
          {pending ? "Resetting Password..." : "Reset Password"}
        </Button>
      </form>
    </>
  );
}

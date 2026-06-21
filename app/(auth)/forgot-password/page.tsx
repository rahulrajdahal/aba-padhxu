"use client";

import { Button, Input } from "@/components";
import { routes } from "@/utils/routes";
import { Mail } from "@meistericons/react";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { forgotPassword } from "../actions";
import Headings from "../components/Headings";

export default function Page() {
  const router = useRouter();

  const handleForgotPassword = async (
    prevState: unknown,
    formData: FormData,
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
    null,
  );

  return (
    <>
      <Headings
        heading="Forgot Password"
        body="Enter your email to receive instructions on how to reset your password"
      />
      <form action={formAction} className="flex flex-col gap-6 pb-8">
        <Input
          label="Email"
          type="email"
          name="email"
          iconLeft={<Mail size={20} />}
          placeholder="rajesh@hamal.com"
          required
          errors={state?.errors?.email}
        />
        <Button type="submit" disabled={pending} aria-disabled={pending}>
          {pending ? "Sending Email..." : "Send Email"}
        </Button>
      </form>
    </>
  );
}

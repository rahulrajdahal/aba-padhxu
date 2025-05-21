"use client";

import { Button, Form, Input } from "@/components";
import { routes } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { login } from "../actions";

export default function Page() {
  const router = useRouter();

  const handleLogin = async (prevState: unknown, formData: FormData) => {
    const state = await login(prevState, formData);

    if (state.type === "success") {
      toast.success(state.message);
      return router.push(routes.dashboard);
    }

    if (state.type === "error") {
      toast.error(state.message);
    }

    return state;
  };

  const [state, formAction, pending] = useActionState(handleLogin, null);

  return (
    <Form action={formAction} className="gap-6" title="Login">
      <Input
        label="Email"
        error={state?.errors?.email}
        inputProps={{ type: "email", name: "email", required: true }}
      />
      <Input
        forgot
        label="Password"
        error={state?.errors?.password}
        inputProps={{ type: "password", name: "password", required: true }}
      />
      <Button type="submit" disabled={pending} aria-disabled={pending}>
        {pending ? "Logging in..." : "Login"}
      </Button>
      <span className="flex items-center gap-1">
        Don&apos;t have an account?
        <Button variant="text" linkProps={{ href: routes.signup }}>
          Signup Instead.
        </Button>
      </span>
    </Form>
  );
}

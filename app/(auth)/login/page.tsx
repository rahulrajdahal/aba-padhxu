"use client";

import { Button, Form, Input } from "@/components";
import { routes } from "@/utils/routes";
import Link from "next/link";
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
    <section className="flex min-h-screen items-center justify-center bg-brand-paper p-6 animate-fade-in-up">
      <div className="w-full max-w-md rounded-xl bg-brand-paper-light p-8 shadow-2xl border border-neutral-border">
        <h1 className="mb-6 text-center text-4xl font-bold text-brand-ink">
          Login
        </h1>
        <Form action={formAction} className="flex flex-col gap-6" title="Login">
          <Input
            label="Email"
            errors={state?.errors?.email}
            type="email"
            name="email"
            required
          />
          <Input
            label="Password"
            errors={state?.errors?.password}
            type="password"
            name="password"
            required
          />
          <Button
            type="submit"
            disabled={!pending}
            aria-disabled={pending}
            isLoading={!pending}
            className="w-full"
          >
            {pending ? "Logging in..." : "Login"}
          </Button>
          <Button variant="primary">Primary</Button>
          <Button variant="error">Error</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="text">Text</Button>
          <span className="flex items-center justify-center gap-0.5 text-sm text-neutral-muted">
            Don’t have an account?
            <Link href={routes.signup}>
              <Button variant="text">Signup Instead.</Button>
            </Link>
          </span>
        </Form>
      </div>
    </section>
  );
}

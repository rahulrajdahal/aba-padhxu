"use client";

import { Button, Form, Input } from "@/components";
import { routes } from "@/utils/routes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import toast from "react-hot-toast";
import { signup } from "../actions";

export default function Page() {
  const router = useRouter();

  const [preview, setPreview] = useState("");

  const handleSignup = async (prevState: unknown, formData: FormData) => {
    const state = await signup(prevState, formData);

    if (state.type === "success") {
      toast.success(state.message);
      return router.push(routes.login);
    }

    if (state.type === "error") {
      toast.error(state.message);
    }

    return state;
  };

  const [state, formAction, pending] = useActionState(handleSignup, null);

  return (
    <section className="flex min-h-screen items-center justify-center bg-brand-paper p-6 animate-fade-in-up">
      <div className="w-full max-w-md rounded-xl bg-brand-paper-light p-8 shadow-2xl border border-neutral-border">
        <h1 className="mb-6 text-center text-4xl font-bold text-brand-ink">
          Sign Up
        </h1>
        <Form
          action={formAction}
          className="flex flex-col gap-6"
          title="Sign up"
        >
          <div className="flex items-center gap-4">
            <Input
              label="First Name"
              errors={state?.errors?.name}
              name="firstName"
              required
              placeholder="Rajesh"
            />
            <Input
              label="Last Name"
              errors={state?.errors?.name}
              name="lastName"
              required
              placeholder="Hamal"
            />
          </div>
          <Input
            label="Email"
            errors={state?.errors?.email}
            name="email"
            type="email"
            required
            placeholder="rajesh@hamal.com"
          />
          <Input
            label="Password"
            errors={state?.errors?.password}
            name="password"
            type="password"
            required
          />
          <Input
            label="Confirm Password"
            errors={state?.errors?.password}
            name="confirmPassword"
            type="password"
            required
          />
          <Button
            type="submit"
            disabled={pending}
            aria-disabled={pending}
            className="w-full"
          >
            {pending ? "Signing up..." : "Signup"}
          </Button>
          <span className="flex items-center justify-center gap-2 text-sm text-neutral-muted">
            Already have an account?
            <Link href={routes.login} className="underline">
              <Button variant="text">Login Instead.</Button>
            </Link>
          </span>
        </Form>
      </div>
    </section>
  );
}

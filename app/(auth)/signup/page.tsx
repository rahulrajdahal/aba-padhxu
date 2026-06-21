"use client";

import { Button, Input } from "@/components";
import PasswordInput from "@/components/Input/Password/PasswordInput";
import { routes } from "@/utils/routes";
import { Mail } from "@meistericons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useState } from "react";
import toast from "react-hot-toast";
import { signup } from "../actions";
import Headings from "../components/Headings";

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
    <>
      <Headings body="Create your account and get started" heading="Sign Up" />
      <form action={formAction} className="flex flex-col gap-6">
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
          iconLeft={<Mail size={20} />}
          errors={state?.errors?.email}
          name="email"
          type="email"
          required
          placeholder="rajesh@hamal.com"
        />
        <PasswordInput
          label="Password"
          errors={state?.errors?.password}
          name="password"
          required
        />
        <PasswordInput
          label="Confirm Password"
          errors={state?.errors?.confirmPassword}
          name="confirmPassword"
          required
        />

        <div className="flex items-end gap-2.5 pt-1 text-slate-500 select-none">
          <input
            type="checkbox"
            id="terms"
            required
            className="mt-1 h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0 transition-colors"
          />
          <label htmlFor="terms" className="text-xs leading-normal">
            I agree to the{" "}
            <Link
              href="#terms"
              className="text-info font-medium hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="#privacy"
              className="text-info font-medium hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </label>
        </div>

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
          <Link href={routes.login}>
            <Button variant="text">Login Instead.</Button>
          </Link>
        </span>
      </form>
    </>
  );
}

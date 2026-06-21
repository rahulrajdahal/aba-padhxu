"use client";

import { Button, Input } from "@/components";
import PasswordInput from "@/components/Input/Password/PasswordInput";
import { routes } from "@/utils/routes";
import { User } from "@meistericons/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { login } from "../actions";
import Headings from "../components/Headings";

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
    <>
      <Headings
        heading="Login"
        body="Login in and start selling and buying books from your own bookstore"
      />
      <form action={formAction} className="flex flex-col gap-6">
        <Input
          label="Email"
          iconLeft={<User size={20} />}
          errors={state?.errors?.email}
          type="email"
          name="email"
          required
        />
        <PasswordInput
          label="Password"
          forgot
          errors={state?.errors?.password}
          name="password"
          required
        />
        <Button type="submit" isLoading={pending} className="w-full">
          {pending ? "Logging in..." : "Login"}
        </Button>

        <span className="flex items-center justify-center gap-0.5 text-sm text-neutral-muted">
          New to Aba Padhxu?
          <Link href={routes.signup}>
            <Button variant="text">Create an Account.</Button>
          </Link>
        </span>
      </form>
    </>
  );
}

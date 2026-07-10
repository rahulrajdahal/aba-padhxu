"use client";

import { Button, Input, Switch } from "@/components";
import PasswordInput from "@/components/Input/Password/PasswordInput";
import { routes } from "@/utils/routes";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { addUserWithProfile } from "../actions";

export default function page() {
  const handleAddUser = async (prevState: unknown, formData: FormData) => {
    const state = await addUserWithProfile(prevState, formData);

    if (state.type === "error") {
      toast.error(state.message);
    }

    if (state.type === "success") {
      toast.success(state.message);
      redirect(`${routes.dashboard}${routes.users}`);
    }

    return state;
  };

  const [state, formAction, isPending] = useActionState(
    handleAddUser,
    undefined,
  );

  return (
    <form action={formAction} className="flex flex-col gap-8">
      <div className="flex items-center gap-8">
        <Input
          name="firstName"
          required
          label="First Name"
          type="text"
          errors={state?.errors?.firstName}
        />
        <Input
          name="lastName"
          required
          label="Last Name"
          type="text"
          errors={state?.errors?.lastName}
        />
      </div>

      <div className="flex items-center gap-8">
        <Input
          name="email"
          required
          label="Email"
          type="email"
          errors={state?.errors?.email}
        />
        <Input
          name="phoneNumber"
          label="Phone Number"
          type="text"
          errors={state?.errors?.phoneNumber}
        />
      </div>

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
        errors={state?.errors?.confirmPassword}
      />

      <div className="flex items-center gap-8">
        <Switch label="Seller?" name="isSeller" defaultChecked={false} />
        <Switch label="Admin?" name="isAdmin" defaultChecked={false} />
      </div>

      <Button isLoading={isPending} type="submit">
        {isPending ? "Adding..." : "Add User"}
      </Button>
    </form>
  );
}
